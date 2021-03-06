import styled from "styled-components";

const ListStyles = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ListItemStyles = styled.li`
  position: relative;
  padding-left: 2rem;

  &::after {
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
    content: "";
    height: 2px;
    width: 8px;
    background: var(--aqua);
  }
`;

const OrderListStyles = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
  padding-left: 0;
`;

const OrderListItemStyles = styled.li`
  box-shadow: var(--bs);
  list-style: none;
  padding: 2rem;
  border: 1px solid var(--offWhite);
  h2 {
    border-bottom: 2px solid var(--green);
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  .images {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    margin-top: 1rem;
    img {
      height: 200px;
      object-fit: cover;
      width: 100%;
    }
  }
  .order-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    display: grid;
    grid-gap: 1rem;
    text-align: center;
    & > * {
      margin: 0;
      background: rgba(0, 0, 0, 0.03);
      padding: 1rem 0;
    }
    strong {
      display: block;
      margin-bottom: 1rem;
    }
  }
`;

export { ListStyles, ListItemStyles, OrderListStyles, OrderListItemStyles };
