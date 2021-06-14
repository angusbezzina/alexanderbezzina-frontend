import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";

import styled from "styled-components";

import AddToCart from "./AddToCart";
import DisplayError from "./ErrorMessage";
import TitleStyles from "./styles/TitleStyles";
import PriceTagStyles from "./styles/PriceTagStyles";
import { FeatureButtonStyles } from "./styles/ButtonStyles";
import { IncognitoButtonStyles } from "./styles/ButtonStyles";

import formatMoney from "../lib/formatMoney";

const ProductStyles = styled.div`
  padding: var(--headerOffset) 2rem;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;

  img {
    width: 100%;
    object-fit: contain;
  }

  .goBackButton {
    display: inline-block;
    margin-bottom: 1rem;
  }

  .singleProductContainer {
    position: relative;
  }

  .details {
    margin-top: 2rem;

    p:first-of-type {
      margin-top: 0;
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <DisplayError error={error} />;
  }
  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Alexander Bezzina Photography | {Product.name}</title>
      </Head>
      <Link passHref href="/products">
        <IncognitoButtonStyles className="goBackButton">
          ⬅ View all Products
        </IncognitoButtonStyles>
      </Link>
      <div className="singleProductContainer">
        <img
          src={Product.photo.image.publicUrlTransformed}
          alt={Product.name}
        />
        <div className="details">
          <TitleStyles background="navy" size="large">{Product.name}</TitleStyles>
          <p>{Product.description}</p>
        </div>
        <PriceTagStyles background="navy">{formatMoney(Product.price)}</PriceTagStyles>
        <FeatureButtonStyles>
          <AddToCart id={Product.id} />
        </FeatureButtonStyles>
      </div>
    </ProductStyles>
  );
}
