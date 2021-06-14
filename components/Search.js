import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import { useRouter } from 'next/dist/client/router';

import { SearchStyles, DropDownStyles, DropDownItemStyles } from './styles/DropDownStyles';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getItemProps,
    getComboboxProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      console.log('Selected item changed!');
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an item",
            id: "search",
            className: loading ? "loading" : "",
          })}
        />
      </div>
      <DropDownStyles {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItemStyles
              key={item.id}
              highlighted={index === highlightedIndex}
              {...getItemProps({
                item,
                index,
              })}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItemStyles>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItemStyles>Sorry, no items found for {inputValue}</DropDownItemStyles>
        )}
      </DropDownStyles>
    </SearchStyles>
  );
}
