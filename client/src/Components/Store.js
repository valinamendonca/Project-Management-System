import { configureStore } from "@reduxjs/toolkit";

// Define the initial state of the store
const initialState = {
  user: null,
};

// Define the reducer function to update the store state
function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// Create the Redux store
const Store = configureStore({
  reducer,
});

export default Store;
