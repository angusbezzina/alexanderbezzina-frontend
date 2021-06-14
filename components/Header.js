import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import Cart from "./Cart";
import Nav from "./Nav";
import Search from "./Search";
import { useSearch } from "./searchState";

const Logo = styled.h1`
  position: relative;
  display: inline-block;
  margin-left: 2rem;
  font-size: 2rem;
  background: var(--green);
  transform: skew(-7deg);
  z-index: 2;

  a {
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    color: white;
  }
`;

const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--headerHeight);
  z-index: 10;
  background-color: ${(props) =>
    props.isHome && props.active
      ? "var(--navy)"
      : props.isHome && !props.active
      ? "none"
      : "var(--white)"};
  transition: background-color 0.3s ease-in-out;

  .bar {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-space-between;
    box-shadow: ${(props) =>
      props.page !== "/" ? "0 0 10px 3px rgba(0, 0, 0, 0.2)" : "none"};
      z-index: 1;

    @media (min-width: 768px) {
      align-items: center;
    }
  }
`;

const SearchBarStyles = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  ${(props) => props.open && `transform: translateX(0);`};
  z-index: 0;
`;

export default function Header({ active, page }) {
  const { searchOpen } = useSearch();
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <HeaderStyles active={active} isHome={isHome} page={page}>
      <div className="bar">
        <Logo>
          <Link href="/">Alex Bezzina</Link>
        </Logo>
        <Nav active={active} isHome={isHome} />
      </div>
      {!isHome && (
        <>
          <SearchBarStyles open={searchOpen}>
            <Search />
          </SearchBarStyles>
          <Cart />
        </>
      )}
    </HeaderStyles>
  );
}
