import React, { useState } from "react";
import { Container, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { CartItem } from "../../../lib/types/search";

/* REDUX SLICE & SELECTOR*/
// setPopularDishes reduceri orqali setPopularDishes kommandasini hosil qilyabmiz
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();
  let [count, setCount] = useState<number>(1);
  // const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  /**HANDLERS */

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete the order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err);
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      // payment process

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Do you want to proceed with payment?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err);
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-card">
              <Box className="order-items-wrapper">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="left-side-order-item">
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

              <Box className="order-summary">
                <Box className="order-summary-item">
                  <p>Product Price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                </Box>
                <Box className="order-summary-item">
                  <p>Delivery Cost</p>
                  <p>${order.orderDelivery}</p>
                </Box>
                <Box className="order-summary-item total">
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <Box className="order-actions">
                  <Button
                    value={order._id}
                    variant="outlined"
                    color="secondary"
                    className="cancel-button"
                    onClick={deleteOrderHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    value={order._id}
                    variant="contained"
                    className="pay-button"
                    onClick={processOrderHandler}
                  >
                    Payment
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!pausedOrders ||
          (pausedOrders.length === 0 && (
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
