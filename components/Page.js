import React from 'react';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import { ModalProvider } from './Modal';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    --black: #0b0c10;
    --grey: #c0c0c0;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --gray: var(--lightGrey);
    --offWhite: #ededed;
    --white: #ffffff;
    --green: #45A29E;
    --aqua: #66fcf1;
    --navy: #1f2833;
    --primaryColor: var(--aqua);
    --secondaryColor: var(--black);
    --shadow: rgba(0, 0, 0, 0.2);
    --transparent: rgba(0, 0, 0, 0);
    --headerHeight: 70px;
    --headerOffset: 100px;
    --maxWidth: 1000px;
    --bs: 0 12px 24px rgba(0, 0, 0, 0.09);
    box-sizing: border-box;
    font-size: 10px;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 100%;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const InnerStyles = styled.div`
  min-height: 100vh;
  width: calc(100% - 4rem);
  display: grid;
  place-items: center;
  margin: auto;
  padding: 0;

  @media (min-width: 768px) {
    width: 100%;
    max-width: var(--maxWidth);
  }
`;

export default function Page({ children }) {
  const router = useRouter();
  const { pathname } = router;

  const [headerActive, setHeaderActive] = React.useState(false);

  React.useEffect(() => {
    const checkHeaderStatus = () => {
      if (window.pageYOffset > 100) {
        setHeaderActive(true);
      } else {
        setHeaderActive(false);
      }
    };

    window.addEventListener('scroll', debounce(checkHeaderStatus, 1));

    return () => {
      window.removeEventListener('scroll', checkHeaderStatus);
    };
  }, []);
  return (
    <div>
      <ModalProvider>
        <GlobalStyles />
        <Header active={headerActive} page={pathname} />
        <InnerStyles>{children}</InnerStyles>
      </ModalProvider>
    </div>
  );
}
