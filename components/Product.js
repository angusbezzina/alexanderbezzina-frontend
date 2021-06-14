import Link from "next/link";

import ItemStyles from "./styles/ItemStyles";
import TitleStyles from "./styles/TitleStyles";
import PriceTagStyles from "./styles/PriceTagStyles";
import formatMoney from "../lib/formatMoney";
import AddToCart from "./AddToCart";

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <TitleStyles>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyles>
      <PriceTagStyles>{formatMoney(product.price)}</PriceTagStyles>
      <p>{product.tagline}</p>
      <div className="buttonList">
        <AddToCart id={product.id} />
      </div>
    </ItemStyles>
  );
}
