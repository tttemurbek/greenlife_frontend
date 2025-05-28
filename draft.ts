/*
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
                    <Box key={item._id} className="order-item">
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
*/
