import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import PersonalGroupSlice from "./PersonalGroupSlice";

const Store = configureStore({
  reducer: {
    auth: AuthSlice,
    PersonalGroups: PersonalGroupSlice,
  },
});

export default Store;
