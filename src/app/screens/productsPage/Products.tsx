import React, { act, ChangeEvent, useEffect, useState } from "react";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import {
  Container,
  Stack,
  Box,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Margin, Rowing } from "@mui/icons-material";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import {
  ProductCollection,
  ProductSize,
} from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { count } from "console";

/* REDUX SLICE & SELECTOR*/

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
}); // key/command - and this is dispatch

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch()); // bu yerda
  const { products } = useSelector(productsRetriever); // 41qatordagi products bilan bir hil
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.FLOWERS,
    search: "",
  });

  // productsSearch - object
  // setProductSearch - productSearch ni ozgartira oladigan method
  const [searchText, setSearchText] = useState<string>("");

  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data)) // setProducts is dispatch
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS */

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack
            className="avatar-big-box"
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
          >
            <div className="avatar-title">GreenLife </div>

            <div className="search-container">
              <input
                type="search"
                className="single-search-input"
                name="singleResearch"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  console.log(e.key);
                }}
              />
              <Button
                className="single-button-search"
                variant="contained"
                onClick={searchProductHandler}
              >
                <SearchIcon />
                Search
                {/* Replaced endIcon with a more integrated design */}
              </Button>
            </div>
          </Stack>
          <Stack className="dishes-filter-section" sx={{ display: "flex" }}>
            <Stack className="product-category" sx={{ marginRight: "10px" }}>
              <div className="category-main">
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection ===
                    ProductCollection.FLOWERS
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.FLOWERS)
                  }
                  sx={{ fontSize: "13px" }}
                >
                  FLOWERS
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.PLANTS
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.PLANTS)
                  }
                  sx={{ fontSize: "13px" }}
                >
                  PLANTS
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection ===
                    ProductCollection.ACCESSORIES
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.ACCESSORIES)
                  }
                  sx={{ fontSize: "13px", minWidth: "100px" }}
                >
                  Accessories
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.SEEDS
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SEEDS)
                  }
                  sx={{ fontSize: "13px" }}
                >
                  SEEDS
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                  sx={{ fontSize: "13px" }}
                >
                  Other
                </Button>
              </div>
            </Stack>
            <Stack className="dishes-filter-box">
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("createdAt")}
                sx={{ fontSize: "13px" }}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("productPrice")}
                sx={{ fontSize: "13px" }}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("productViews")}
                sx={{ fontSize: "13px" }}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack
            className="list-category-section"
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "41px",
              justifyContent: "flex-start",
              width: "100%",
              height: "auto",
            }}
          >
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.SEEDS
                      ? product.productVolume + " KGs"
                      : product.productSize + " size";
                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale"> {sizeVolume} </div>
                        <Button
                          className="shop-btn"
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-price">
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>Products are not available</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="awards">
        <Container>
          <Stack className="awards-title">
            <Box className="awards-title-text">Our Achievements</Box>
          </Stack>
          <Stack className="awards-contents">
            <Box className="award-box">
              <img src="img/award1.png" alt="Award 1" />
              <Box className="award-text">
                <p>Best Innovation Award 2023</p>
              </Box>
            </Box>

            <Box className="award-box">
              <img src="img/award2.jpg" alt="Award 2" />
              <Box className="award-text">
                <p>Top Customer Service 2022</p>
              </Box>
            </Box>

            <Box className="award-box">
              <img src="img/award3.png" alt="Award 3" />
              <Box className="award-text">
                <p>Best Product Design 2021</p>
              </Box>
            </Box>
          </Stack>
        </Container>
      </div>

      <div className="address">
        <Container>
          <Stack
            className="address-area"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box className="address-title">Our Address</Box>
            <iframe
              className="map-frame"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.279488067767!2d127.13298197622382!3d35.8421497725358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357023379e824939%3A0xd35dd0a46a73b0f0!2s1549-18%20Geumam-dong%2C%20Deokjin-gu%2C%20Jeonju%2C%20Jeollabuk-do!5e0!3m2!1sen!2skr!4v1720974938245!5m2!1sen!2skr"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
