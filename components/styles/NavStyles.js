import styled from "styled-components";

const NavStyles = styled.ul`
  height: 100%;
  display: flex;
  align-items: stretch;
  margin: 0;
  padding: 0;
  justify-self: end;
  font-size: 2rem;

  a,
  button {
    padding: 1rem 2rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1.6rem;
    background: none;
    color: ${(props) => (props.home ? "var(--offWhite)" : "var(--black)")};
    border: 0;
    cursor: pointer;

    &:before {
      content: "";
      width: 2px;
      background: var(--lightGray);
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }

    &:after {
      height: 2px;
      background: var(--green);
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 3rem;
    }

    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
      &:after {
        width: calc(100% - 30px);
      }
    }

    @media (max-width: 980px) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;

      &:hover,
      &:focus {
        &::after {
          width: calc(100% - 10px);
        }
      }
    }
  }

  a:not(:last-of-type) {
    display: none;

    @media (min-width: 980px) {
      display: inline-flex;
    }
  }

  a:last-of-type:not(.storeDesktop) {
    display: inline-flex;
    margin-right: 1rem;
    text-align: center;
  }

  .cartButton {
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      left: 21px;

      @media (min-width: 768px) {
        left: 31px;
      }
    }

    span {
      transition: transform 0.3s ease-in-out;
    }

    &:hover {
      span {
        animation: bounce 0.3s ease;
        color: var(--white);
      }

      &::after {
        width: 2.4rem;
      }
    }
  }

  .storeDesktop {
    display: none;

    @media (min-width: 768px) {
      display: inline-flex;
    }
  }

  .storeMobile {
    color: var(--green);

    @media (min-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 1300px) {
    border-top: 1px solid var(--lightGray);
    width: 100%;
    justify-content: flex-end;
    font-size: 1.5rem;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }
  }
`;

const NavDropDownStyles = styled.div`
  position: relative;
  overflow-y: visible;

  .navDropDownButton {
    height: 100%;

    &:focus {
      &::after {
        width: calc(100% - 10px);
      }
    }

    @media (min-width: 768px) {
      &:focus {
        &::after {
          width: calc(100% - 30px);
        }
      }
    }
  }

  .navDropDownList {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--green);
    list-style-type: none;
    padding: 1rem;
    box-shadow: var(--bs);

    li {
      a,
      button {
        min-width: 80px;
        padding: 0;
        text-transform: capitalize;
        font-size: 1.5rem;
        color: var(--white);

        &::after {
          background: var(--navy);
        }
      }
    }
  }
`;

export { NavStyles, NavDropDownStyles };
