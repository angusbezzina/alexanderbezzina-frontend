import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faUser,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import CartCount from "./CartCount";
import SignOut from "./SignOut";
import { NavStyles, NavDropDownStyles } from "./styles/NavStyles";

import { useUser } from "./User";
import { useCart } from "./cartState";
import { useSearch } from "./searchState";

export default function Nav({ active, isHome }) {
  const router = useRouter();
  const user = useUser();
  const { openCart } = useCart();
  const { toggleSearch } = useSearch();
  const [accountOptionsOpen, setAccountOptionsOpen] = useState(false);
  const changePath = (path) => {
    setAccountOptionsOpen(false);
    router.push(path);
  };

  if (isHome) {
    return (
      <NavStyles active={active} home>
        <Link href="#research" replace>
          Research
        </Link>
        <Link href="#education-and-skills" replace>
          Education
        </Link>
        <Link href="#photography" replace>
          Photography
        </Link>
        <Link href="#contact" replace>
          Contact
        </Link>
          <Link href={user ? '/products' : '/signin'} replace>
            <a>
              <span className="storeDesktop">Store</span>
              <span className="storeMobile">
                <FontAwesomeIcon icon={faStore} />
              </span>
            </a>
          </Link>

      </NavStyles>
    );
  }

  return (
    <NavStyles active={active}>
      <button type="button" title="Search" onClick={toggleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      {user && (
        <>
          <NavDropDownStyles>
            <button
              className="navDropDownButton"
              title="Account"
              type="button"
              onClick={() => setAccountOptionsOpen(!accountOptionsOpen)}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            {accountOptionsOpen && (
              <ul className="navDropDownList">
                <li>
                  <button type="button" onClick={() => changePath("/account")}>
                    Account
                  </button>
                </li>
                <li>
                  <SignOut setAccountOptionsOpen={setAccountOptionsOpen} />
                </li>
              </ul>
            )}
          </NavDropDownStyles>
          <button className="cartButton" type="button" onClick={openCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <CartCount
              count={user?.cart.reduce(
                (tally, cartItem) =>
                  tally + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
        </>
      )}
      {!user && (
        <NavDropDownStyles>
          <button
            className="navDropDownButton"
            title="Account"
            type="button"
            onClick={() => setAccountOptionsOpen(!accountOptionsOpen)}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
          {accountOptionsOpen && (
            <ul className="navDropDownList">
              <li>
                <button type="button" onClick={() => changePath("/signin")}>
                  Sign In
                </button>
              </li>
              <li>
                <button type="button" onClick={() => changePath("/signup")}>
                  Sign Up
                </button>
              </li>
            </ul>
          )}
        </NavDropDownStyles>
      )}
    </NavStyles>
  );
}
