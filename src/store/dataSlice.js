import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  botId: "",
  botToken: "",
  activeKey: "home",
  customButton: {
    format: "",
    list: [
      // {
      //   name: "",
      //   link: ''
      // }
    ],
  },
  customButtonTemp: {
    format: "",
    list: [],
  },
  keyboardButton: {
    isEmpty: true,
    format: "",
    list: [],
  },
  adDetail: {
    isEmpty: true,
    mode: "",
    imgUrl: null,
    content: "",
    duration: "",
    time: "",
  },
  welcomeDetail: {
    isEmpty: true,
    imgUrl: null,
    content: "",
    subscribe: "",
  },
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    //increment: (state) => state + 1,
    //decrement: (state) => state - 1,
    setBotId: (state, action) => {
      state.botId = action.payload;
    },
    setBotToken: (state, action) => {
      state.botToken = action.payload;
    },
    setCustomButton: (state, action) => {
      state.customButton = action.payload;
    },
    setCustomButtonTemp: (state, action) => {
      state.customButtonTemp = action.payload;
    },
    setKeyboardButton: (state, action) => {
      state.keyboardButton = action.payload;
    },
    setAdDetail: (state, action) => {
      state.adDetail = action.payload;
    },
    setWelcomeDetail: (state, action) => {
      state.welcomeDetail = action.payload;
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    // deleteKeyWord: (state, action) => {
    //   state.keyWords.splice(action.payload, 1);
    // },
    // addKeyWords: (state, action) => {
    //   state.keyWords.push(action.payload);
    // },
  },
});

export const {
  setBotId,
  setBotToken,
  setActiveKey,
  setCustomButton,
  setCustomButtonTemp,
  setKeyboardButton,
  setAdDetail,
  setWelcomeDetail,
} = dataSlice.actions;
