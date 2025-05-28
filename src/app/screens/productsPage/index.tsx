import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { log } from "console";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css";
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd, onRemove } = props;
  const products = useRouteMatch();
  console.log("products:", products);

  return (
    <div className="products-page">
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} onRemove={onRemove} />
        </Route>
        <Route path={`${products.path}`}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
}
