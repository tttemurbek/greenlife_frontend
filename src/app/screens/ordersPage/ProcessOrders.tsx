import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { useGlobals } from "../../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

/* REDUX SLICE & SELECTOR*/
// setPopularDishes reduceri orqali setPopularDishes kommandasini hosil qilyabmiz
const pausedProcessRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(pausedProcessRetriever);
  let [count, setCount] = useState<number>(1);

  /**HANDLERS  */

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      // payment process

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err);
    }
  };

  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => {
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
                      <img
                        src={imagePath}
                        className="order-item-img"
                        alt={product.productName}
                      />
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
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                  className="order-summary-item order-summary-button"
                >
                  <Button
                    value={order._id}
                    variant="contained"
                    color="secondary"
                    className="verify-button"
                    onClick={finishOrderHandler}
                    sx={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    VERIFY TO FULFIL
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!processOrders ||
          (processOrders.length === 0 && (
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
