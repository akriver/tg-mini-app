import { retrieveLaunchParams } from "@tma.js/sdk";
import { Toast } from "antd-mobile";

const host =
  import.meta.env.MODE === "development"
    ? "https://47.76.43.63:8000"
    : "https://twa-bot.dcdc8.cn:8888";

const { initData } = retrieveLaunchParams();
console.log("Mode", import.meta.env.MODE);
console.log("init", initData);

function post(url, param, callback) {
  fetch(`${host}${url}`, {
    method: "post",
    headers: {
      user_id: initData.user.id,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.code === 0) {
        callback && callback(json);
      } else {
        Toast.show({ content: json.msg, position: "center" });
      }
    })
    .catch((err) => {
      Toast.show({ content: "网络错误", position: "center" });
    });
}

export function setAdStatus(param) {
  post("/twa-bot/ads/set-status", param);
}

export function deleteAdApi(param) {
  post("/twa-bot/ads/delete", param);
}

export function createBotApi(param, callback) {
  post("/twa-bot/bots/create", param, callback);
}

export function addKeyWordApi(param, callback) {
  post("/twa-bot/keywords/create", param, callback);
}

export function deleteKeyWordApi(param) {
  post("/twa-bot/keywords/delete", param);
}

export function getKeyWordsListApi(param, callback) {
  post("/twa-bot/keywords/list", param, callback);
}

export function getAdsListApi(param, callback) {
  post("/twa-bot/ads/list", param, callback);
}

export function createAdApi(param, callback) {
  post("/twa-bot/ads/create", param, callback);
}

export function createWelcomeApi(param, callback) {
  post("/twa-bot/welcome/create", param, callback);
}

export function updateWelcomeApi(param, callback) {
  post("/twa-bot/welcome/update", param, callback);
}

export function deleteWelcomeApi(param) {
  post("/twa-bot/welcome/delete", param);
}

export function createKeyboardButton(param, callback) {
  post("/twa-bot/keyboards/create", param, callback);
}

export function updateKeyboardButton(param, callback) {
  post("/twa-bot/keyboards/update", param, callback);
}

export function getBots(callback) {
  fetch(`${host}/twa-bot/bots/get-bots`, {
    headers: {
      user_id: initData.user.id,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      callback && callback(json);
    });
}

export function getUserApi(callback) {
  fetch(`${host}/twa-bot/users/get`, {
    headers: {
      user_id: initData.user.id,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      callback && callback(json);
    });
}

export function getWelcomeInfo(callback) {
  fetch(`${host}/twa-bot/welcome/list`, {
    method: "POST",
    headers: {
      user_id: initData.user.id,
    },
    body: JSON.stringify({
      bot_id: localStorage.getItem("botId"),
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      callback && callback(json);
    });
}

export function getKeyboardApi(callback) {
  fetch(`${host}/twa-bot/keyboards/list`, {
    method: "POST",
    headers: {
      user_id: initData.user.id,
    },
    body: JSON.stringify({
      bot_id: localStorage.getItem("botId"),
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      callback && callback(json);
    });
}

export function uploadApi(formData, callback) {
  fetch(`${host}/twa-bot/file/upload`, {
    headers: {
      user_id: initData.user.id,
    },
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((json) => {
      callback(json);
    })
    .catch((err) => {
      Toast.show({ content: "网络错误", position: "center" });
    });
}
