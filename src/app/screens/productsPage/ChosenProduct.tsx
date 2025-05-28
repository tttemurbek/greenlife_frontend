import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@mui/material/Button";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import StarIcon from "@mui/icons-material/Star";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InfoIcon from "@mui/icons-material/Info";

import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setChosenProduct, setRestaurant } from "./slice";
import { createSelector } from "reselect";
import { Product } from "../../../lib/types/product";
import { retrieveChosenproduct, retrieveRestaurant } from "./selector";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { Messages, serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

/* REDUX SLICE & SELECTOR*/
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

const chosenProductRetriever = createSelector(
  retrieveChosenproduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);

const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({
    restaurant,
  })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd, onRemove } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  let [count, setCount] = useState<number>(1);
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory<any>();

  const proceedOrderHandler = async (input: CartItem[]) => {
    try {
      if (!authMember) {
        history.push("/");
        throw new Error(Messages.error2);
      }

      const order = new OrderService();
      const result = await order.createOrder(input);

      if (result) {
        setOrderBuilder(new Date());
        history.push("/orders");
      }
    } catch (err) {
      console.log("Error, chosenProduct order", err);
      sweetErrorHandling(err).then();
    }
  };

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>
        {" "}
        Product Detail <InfoIcon />
      </Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img className="slider-image" src={imagePath} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"chosen-product-name"}>
            <strong>{chosenProduct.productName}</strong>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="chosen-product-price"
            >
              <span className="chosen-product-price-number">
                $ {chosenProduct.productPrice}
              </span>
              <div
                className="chosen-product-big-review"
                style={{
                  display: "inline-block",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                  }}
                >
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>

                <p
                  style={{
                    display: "inline-block",
                  }}
                  className="chosen-product-reviews"
                >
                  {chosenProduct.productViews > 0
                    ? chosenProduct.productViews
                    : `0`}{" "}
                  customer reviews
                </p>
              </div>
            </div>
          </Box>
          <span>
            --------------------------------------------------------------------------------------------------------
          </span>
          <Box className={"chosen-product-buy"}>
            <p className="chosen-product-desc">Short Description:</p>
            <span className="chosen-product-desc-full">
              {chosenProduct.productDesc?.slice(0, 240)}...
            </span>
          </Box>
          <Box className={"chosen-product-icons"}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (count === 1) {
                  return false;
                }
                setCount((prevCount) => prevCount - 1); // Correct way to decrement
              }}
            >
              <RemoveIcon className="remove-icon" />
            </span>
            <span>{count}</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setCount((prevCount) => prevCount + 1)} // Correct way to increment
            >
              <AddIcon className="add-icon" />
            </span>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#46A358",
                color: "#fff",
                borderRadius: "46px",
                fontFamily: "Cera Pro",
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "normal",
                marginLeft: "20px",
                textTransform: "capitalize",
              }}
              className="chosen-product-buy-now"
              onClick={() =>
                proceedOrderHandler([
                  {
                    _id: chosenProduct._id,
                    quantity: count,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  },
                ])
              }
            >
              Buy now
            </Button>

            <Button
              variant="contained"
              style={{
                backgroundColor: "#fff",
                color: "#46A358",
                borderRadius: "46px",
                fontFamily: "Cera Pro",
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "normal",
                marginLeft: "20px",
                textTransform: "capitalize",
              }}
              className="chosen-product-buy-now"
              onClick={(e) => {
                onAdd({
                  _id: chosenProduct._id,
                  quantity: count,
                  name: chosenProduct.productName,
                  price: chosenProduct.productPrice,
                  image: chosenProduct.productImages[0],
                });
                e.stopPropagation();
              }}
            >
              Add to cart
            </Button>
          </Box>

          <Box className={"chosen-p-bottom"}>
            <p className="chosen-p-series">
              Product series: {chosenProduct._id.replace(/\D/g, "")}
            </p>
            <p className="chosen-p-category">
              Category: {chosenProduct.productCollection}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "33px",
              }}
              className="chosen-p-social-media"
            >
              <span className="chosen-p-share">Share this products:</span>
              <FacebookIcon style={{ marginRight: "15px", fontSize: "24px" }} />
              <InstagramIcon
                style={{ marginRight: "15px", fontSize: "24px" }}
              />
              <XIcon style={{ marginRight: "15px", fontSize: "24px" }} />
              <LinkedInIcon style={{ marginRight: "15px", fontSize: "24px" }} />
              <YouTubeIcon style={{ marginRight: "15px", fontSize: "24px" }} />
            </div>
          </Box>
        </Stack>
      </Container>
      <Stack>
        <Stack className="">
          <Box className={"chosen-p-full-desc"}>
            <p>Product Full Description</p>
            <span>{chosenProduct.productDesc}</span>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
