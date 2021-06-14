import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";

import { useUser } from "../components/User";
import TitleStyles from "../components/styles/TitleStyles";
import ErrorMessage from "../components/ErrorMessage";
import { IncognitoButtonStyles } from "../components/styles/ButtonStyles";
import {
  OrderListStyles,
  OrderListItemStyles,
} from "../components/styles/ListStyles";
import {
  AccountStyles,
  AccountInnerStyles,
} from "../components/styles/AccountStyles";
import formatMoney from "../lib/formatMoney";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function AccountPage() {
  const user = useUser();
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { allOrders } = data;

  function countItemsInAnOrder(order) {
    return order.items.reduce((tally, item) => tally + item.quantity, 0);
  }

  return (
    <div>
      <Head>
        <title>Your Account</title>
      </Head>
      <AccountStyles>
        <AccountInnerStyles>
          <TitleStyles size="large">{user.name}'s Account</TitleStyles>
          <TitleStyles background="navy">Orders:</TitleStyles>
          <h4>
            You have {allOrders.length} order
            {allOrders.length === 1 ? "" : "s"}!
          </h4>
          <OrderListStyles>
            {allOrders.map((order, index) => (
              <OrderListItemStyles key={index}>
                <Link href={`/order/${order.id}`}>
                  <a>
                    <div className="order-meta">
                      <p>
                        {countItemsInAnOrder(order)} Item
                        {order.items.length === 1 ? "" : "s"}
                      </p>
                      <p>
                        {order.items.length} Product
                        {order.items.length === 1 ? "" : "s"}
                      </p>
                      <p>{formatMoney(order.total)}</p>
                    </div>
                    <div className="images">
                      {order.items.map((item) => (
                        <img
                          key={item.id}
                          src={item.photo?.image?.publicUrlTransformed}
                          alt={item.name}
                        />
                      ))}
                    </div>
                  </a>
                </Link>
              </OrderListItemStyles>
            ))}
          </OrderListStyles>
          <Link passHref href="/products">
            <IncognitoButtonStyles className="goBackButton">
              ⬅ Back to store
            </IncognitoButtonStyles>
          </Link>
        </AccountInnerStyles>
      </AccountStyles>
    </div>
  );
}
