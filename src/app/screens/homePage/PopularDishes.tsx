import React, { useEffect } from "react";

import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AOS from "aos";
import "aos/dist/aos.css";
import YardIcon from "@mui/icons-material/Yard";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/* REDUX SLICE & SELECTOR*/
// setPopularDishes reduceri orqali setPopularDishes kommandasini hosil qilyabmiz
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function PopularDishes() {
  useEffect(() => {
    AOS.init({ duration: 1400 }); // You can adjust the animation duration or other options
  }, []);
  const { popularDishes } = useSelector(popularDishesRetriever);

  const history = useHistory();

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack data-aos="flip-up" className="popular-section">
          <Box className="category-title">
            <YardIcon /> Our popular flowers <YardIcon />
          </Box>
          <Stack className="cards-frame">
            {popularDishes.map((product: Product) => {
              const imagePath = `${serverApi}/${product.productImages[0]}`;
              return (
                <CssVarsProvider key={product._id}>
                  <Card
                    className="card"
                    onClick={() => chooseDishHandler(product._id)}
                  >
                    <CardCover>
                      <img src={imagePath} alt="" />
                    </CardCover>
                    <CardCover className="card-cover" />
                    <CardContent sx={{ justifyContent: "flex-end" }}>
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          level="h2"
                          fontSize="lg"
                          textColor="#fff"
                          mb={1}
                          textTransform={"capitalize"}
                        >
                          {product.productName}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "md",
                            color: "neutral.300",
                            alignItems: "center",
                            display: "flex,",
                          }}
                        >
                          {product.productViews}
                          <VisibilityIcon sx={{ fontSize: 25, ml: "5px" }} />
                        </Typography>
                      </Stack>
                    </CardContent>
                    <CardOverflow
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                        height: "60px",
                      }}
                    >
                      <Typography
                        startDecorator={<DescriptionOutlinedIcon />}
                        textColor={"neutral.300"}
                        textTransform={"capitalize"}
                      >
                        {product.productDesc}
                      </Typography>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
