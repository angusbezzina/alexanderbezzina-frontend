import { useRouter } from 'next/router';
import styled from 'styled-components';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

const ProductPageStyles = styled.div`
  margin: var(--headerOffset) 0;
  text-align: center;
`;

export default function OrderPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);

  return (
    <ProductPageStyles>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </ProductPageStyles>
  );
}
