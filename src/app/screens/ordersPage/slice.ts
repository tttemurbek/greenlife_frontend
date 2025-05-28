import { createSlice } from "@reduxjs/toolkit";
import { HomePageState, OrdersPageState } from "../../../lib/types/screen";
import { Home } from "@mui/icons-material";

const initialState: OrdersPageState = {
  pausedOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPausedOrders: (state, action) => {
      // setPopularDishes reduceri iske tusken waqitta ogan state hame action beriledi
      // state bul joqaridagi initialState
      // action bolsa, index.ts den keletugin(slice) data boladi
      // actionnin.payload qisminda keledi
      state.pausedOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

export const { setPausedOrders, setProcessOrders, setFinishedOrders } =
  ordersPageSlice.actions;

const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;
