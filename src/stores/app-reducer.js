import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  no_of_questions: "",
  category: "",
  difficulty: "",
  categories: [],
  questions: [],
};

export default createSlice({
  name: "app-reducer",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
    setQuestions: (state, action) => {
      return {
        ...state,
        questions: action.payload,
      };
    },
    setValues: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    reset: () => {
      return {
        ...initialState,
      };
    },
  },
});
