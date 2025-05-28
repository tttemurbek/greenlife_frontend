import React, { useEffect } from "react";

import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Button, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { Visibility } from "@mui/icons-material";
import { DescriptionOutlined } from "@mui/icons-material";
import Divider from "../../components/divider";
import CardOverflow from "@mui/joy/CardOverflow";
import FiberNewIcon from "@mui/icons-material/FiberNew";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes, retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import AOS from "aos";
import "aos/dist/aos.css";
import { useHistory } from "react-router-dom";

/* REDUX SLICE & SELECTOR*/
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  useEffect(() => {
    AOS.init({ duration: 1400 }); // You can adjust the animation duration or other options
  }, []);
  const { newDishes } = useSelector(newDishesRetriever);

  const history = useHistory();

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  console.log("newDishes:", newDishes);
  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack data-aos="flip-up" className={"main"}>
          <Box className={"category-title"}>
            <FiberNewIcon /> New added products <FiberNewIcon />
          </Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.SEEDS
                      ? product.productVolume + " 1 KGs"
                      : product.productSize + " size";
                  return (
                    <CssVarsProvider key={product._id}>
                      <Card
                        className={"card"}
                        onClick={() => chooseDishHandler(product._id)}
                      >
                        <CardOverflow>
                          <div className="product-sale">{sizeVolume}</div>
                          <AspectRatio ratio="1">
                            <img src={imagePath} alt="" />
                          </AspectRatio>
                        </CardOverflow>

                        <CardOverflow
                          variant="soft"
                          className=" product-detail"
                        >
                          <Stack className="info">
                            <Stack flexDirection={"row"}>
                              <Typography className={"title"}>
                                {product.productName}
                              </Typography>
                              <Divider width="2" height="24" bg="#d9d9d9" />
                              <Typography className={"price"}>
                                ${product.productPrice}
                              </Typography>
                            </Stack>
                            <Stack>
                              <Typography className={"views"}>
                                {product.productViews
                                  ? product.productViews
                                  : "0"}

                                <Visibility
                                  sx={{ fontSize: 20, marginLeft: "5px" }}
                                />
                              </Typography>
                            </Stack>
                          </Stack>
                        </CardOverflow>
                      </Card>
                    </CssVarsProvider>
                  );
                })
              ) : (
                <Box className="no-data">New Products are not available</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
      ;
    </div>
  );
}
