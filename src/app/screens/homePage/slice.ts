import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";
import { Home } from "@mui/icons-material";

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      // setPopularDishes reduceri iske tusken waqitta ogan state hame action beriledi
      // state bul joqaridagi initialState
      // action bolsa, index.ts den keletugin(slice) data boladi
      // actionnin.payload qisminda keledi
      state.popularDishes = action.payload;
    },
    setNewDishes: (state, action) => {
      // setNewDishes reduceri
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      // setTopUsers reduceri
      state.topUsers = action.payload;
    },
  },
});

export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
