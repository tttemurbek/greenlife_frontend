import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";

/* REDUX SLICE & SELECTOR*/
// setPopularDishes reduceri orqali setPopularDishes kommandasini hosil qilyabmiz
const pausedFinishedRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(pausedFinishedRetriever);

  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-card">
              <Box className="order-items-wrapper">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                      key={item._id}
                      className="left-side-order-item"
                    >
                      <Box className="left-side-order-item-img">
                        <img
                          src={imagePath}
                          className="order-item-img"
                          alt={product.productName}
                        />
                      </Box>
                      <Box className="order-item-info">
                        <p className="order-item-name">{product.productName}</p>
                        <Box className="order-item-price-wrapper">
                          <p className="order-item-price">${item.itemPrice}</p>
                          <Box className="order-item-controls">
                            <img
                              src="/icons/close.svg"
                              alt="decrease"
                              className="control-icon"
                            />
                            <p className="order-item-quantity">
                              {item.itemQuantity}
                            </p>
                            <img
                              src="/icons/pause.svg"
                              alt="increase"
                              className="control-icon"
                            />
                          </Box>
                          <p className="order-item-total">
                            ${item.itemQuantity * item.itemPrice}
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} />
                  <p>Delivery Cost</p>
                  <p>${order.orderDelivery}</p>
                  <img src="/icons/pause.svg" style={{ marginLeft: "20px" }} />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
