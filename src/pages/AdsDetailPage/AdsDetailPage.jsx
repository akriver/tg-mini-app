import "@telegram-apps/telegram-ui/dist/styles.css";
import { Button } from "@telegram-apps/telegram-ui";
import { Link } from "@/components/Link/Link.jsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextArea, Selector, Picker, Toast } from "antd-mobile";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdDetail, setCustomButton } from "../../store/dataSlice";
import { createAdApi } from "@/api/api";
import { ImageUploadSection } from "@/components/ImageUpload/ImageUploadSection";
import { on } from "@tma.js/sdk";

const options = [
  {
    label: "1分钟",
    value: "1m",
  },
  {
    label: "10分钟",
    value: "10m",
  },
  {
    label: "30分钟",
    value: "30m",
  },
  {
    label: "1小时",
    value: "1h",
  },
  {
    label: "3小时",
    value: "3h",
  },
  {
    label: "6小时",
    value: "6h",
  },
  {
    label: "12小时",
    value: "12h",
  },
  {
    label: "24小时",
    value: "24h",
  },
];

let basicColumns = [[], []];

function initTimeData() {
  basicColumns = [
    new Array(24).fill(0).map((_, i) => ({
      label: i < 10 ? `0${i}` : `${i}`,
      value: i < 10 ? `0${i}` : `${i}`,
    })),
    new Array(60).fill(0).map((_, i) => ({
      label: i < 10 ? `0${i}` : `${i}`,
      value: i < 10 ? `0${i}` : `${i}`,
    })),
  ];
}

export function to2DArray(arr, cols) {
  let columns = parseInt(cols);
  let rows = Math.ceil(arr.length / columns);
  let result = [];
  for (let i = 0; i < rows; i++) {
    result.push(arr.slice(i * columns, i * columns + columns));
  }
  return result;
}

/**
 * @returns {JSX.Element}
 */
export function AdsDetailPage() {
  const [mode, setMode] = useState("single");
  //const [time, setTime] = useState(false);
  //const [duration, setDuration] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adDetailData, setAdDetailData] = useState({
    mode: "",
    imgUrl: null,
    content: "",
    duration: "",
    time: "",
  });

  const counter = useSelector((state) => state.counter);
  let cols = counter.customButton.format.split("*")[1];
  let _mode = location.search.split("=")[1];

  //清除暂存数据
  const clear = () => {
    dispatch(
      setAdDetail({
        mode: "",
        imgUrl: null,
        content: "",
        duration: "",
        time: "",
      })
    );
    dispatch(
      setCustomButton({
        format: "",
        list: [],
      })
    );
  };

  useEffect(() => {
    const removeListener = on("back_button_pressed", () => {
      clear();
      console.log("back_button_pressed");
    });
    if (_mode === "multi") initTimeData();
    setMode(_mode);
    setAdDetailData(counter.adDetail);
    return () => removeListener();
  }, []);

  return (
    <div style={{ paddingBottom: "100px" }}>
      <div>
        <ImageUploadSection
          imgUrl={adDetailData.imgUrl}
          setImgUrl={(url) => setAdDetailData({ ...adDetailData, imgUrl: url })}
        />
      </div>
      <div
        style={{
          margin: "10px 20px 10px 20px",
          borderRadius: "10px",
          background: "#fff",
          padding: "10px",
        }}
      >
        <TextArea
          placeholder="请输入广告内容"
          autoSize={{ minRows: 3, maxRows: 10 }}
          value={adDetailData.content}
          onChange={(val) => {
            setAdDetailData({ ...adDetailData, content: val });
          }}
        />
      </div>
      <div
        style={{
          margin: "10px 20px 10px 20px",
          borderRadius: "10px",
          background: "#fff",
          padding: "10px",
        }}
      >
        <Button
          mode="outlined"
          size="s"
          onClick={() => {
            dispatch(setAdDetail(adDetailData));
            navigate("/custom-button");
          }}
        >
          自定义按钮
        </Button>
        <div>
          {counter.customButton.list.map((item, index) => (
            <Button
              style={{
                width: cols === "1" ? "90%" : cols === "2" ? "45%" : "30%",
                margin: "5px",
              }}
              key={index}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </div>
      <div
        style={{
          margin: "10px 20px 10px 20px",
          borderRadius: "10px",
          background: "#fff",
          padding: "10px",
        }}
      >
        {mode === "single" && (
          <>
            <div style={{ marginBottom: "10px", fontSize: "16px" }}>
              时间间隔
            </div>
            <Selector
              options={options}
              value={adDetailData.duration}
              onChange={(arr) =>
                setAdDetailData({ ...adDetailData, duration: arr[0] })
              }
            />
          </>
        )}
        {mode === "multi" && (
          <>
            <div style={{ marginBottom: "10px", fontSize: "16px" }}>
              定时发送
            </div>
            <div style={{ marginTop: "10px", fontSize: "16px" }}>
              <Button
                size="s"
                style={{ marginRight: "10px" }}
                onClick={async () => {
                  const time = await Picker.prompt({
                    columns: basicColumns,
                  });
                  setAdDetailData({
                    ...adDetailData,
                    time: `${time[0]}:${time[1]}`,
                  });
                }}
              >
                选择时间
              </Button>
              {adDetailData.time}
            </div>
          </>
        )}
      </div>
      <Button
        mode="filled"
        size="l"
        style={{
          position: "fixed",
          width: "100%",
          left: "0",
          bottom: "0",
          borderRadius: "0",
        }}
        onClick={() => {
          // fetch("https://47.76.43.63:8000/twa-bot/ads/create", {
          //   method: "post",
          //   headers: {
          //     user_id: initData.user.id,
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     bot_id: 7199443538,
          //     bot_token: "7199443538:AAFwD-atEoyFK8mIdU1U0-0yvo8WecJWP88",
          //     content:
          //       '{"text":"测试广告，点击此处跳转","text_links":[{"key":"点击此处","value":"https://t.me/huzhanChinese"}],"inline_keyboard":[[{"text":"测试按钮1","url":"https://t.me/huzhanChinese"},{"text":"测试按钮2","url":"https://t.me/huzhanChinese"}] ]}',
          //     exec_time: "17:06",
          //     exec_duration: "1d",
          //     exec_type: 1,
          //   }),
          // });
          let format = counter.customButton.format;
          let list = counter.customButton.list;
          let colNum = format.split("*")[1];
          let keyBoardButton = to2DArray(list, colNum);
          console.log("keyboard", keyBoardButton);

          createAdApi(
            {
              bot_id: localStorage.getItem("botId"),
              bot_token: localStorage.getItem("botToken"),
              content: JSON.stringify({
                text: adDetailData.content,
                //text_links: [],
                inline_keyboard: keyBoardButton,
                medias_path: adDetailData.imgUrl ? [adDetailData.imgUrl] : [],
              }),
              exec_time: adDetailData.time,
              exec_duration: adDetailData.duration,
              exec_type: mode === "single" ? 2 : 1,
            },
            () => {
              //清除暂存数据
              clear();
              Toast.show({ content: "保存成功", position: "center" });
              navigate(-1);
            }
          );
        }}
      >
        保存
      </Button>
    </div>
  );
}
