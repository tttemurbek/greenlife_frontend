import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";
import ProductsPage from ".";

const selectProductsPage = (state: AppRootState) => state.productsPage; // state bu eng katta store

export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.restaurant
);

export const retrieveChosenproduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.chosenProduct
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products
);
