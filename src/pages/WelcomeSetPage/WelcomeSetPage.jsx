import "@telegram-apps/telegram-ui/dist/styles.css";
import { Button } from "@telegram-apps/telegram-ui";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextArea, Toast } from "antd-mobile";
import { ImageUploadSection } from "@/components/ImageUpload/ImageUploadSection";
import { useDispatch } from "react-redux";
import { setWelcomeDetail, setCustomButton } from "../../store/dataSlice";
import { useNavigate } from "react-router-dom";
import { to2DArray } from "../AdsDetailPage/AdsDetailPage";
import { on } from "@tma.js/sdk";
import {
  createWelcomeApi,
  updateWelcomeApi,
  deleteWelcomeApi,
  getWelcomeInfo,
} from "@/api/api";

/**
 * @returns {JSX.Element}
 */
export function WelcomeSetPage() {
  const [showSub, setShowSub] = useState(false);
  const counter = useSelector((state) => state.counter);
  let cols = counter.customButton.format.split("*")[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [welcomeData, setWelcomeData] = useState({
    imgUrl: null,
    content: "",
    subscribe: "",
  });

  //清除暂存数据
  const clear = () => {
    dispatch(
      setWelcomeDetail({
        isEmpty: true,
        imgUrl: null,
        content: "",
        subscribe: "",
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
    if (counter.welcomeDetail.isEmpty) {
      getWelcomeInfo((res) => {
        if (res.data.length > 0) {
          const data = res.data[0];
          const content = JSON.parse(data.content);
          const text = content.text;
          const url = content.medias_path[0];
          setWelcomeData({ ...welcomeData, content: text, imgUrl: url });
        }
      });
    } else {
      setWelcomeData(counter.welcomeDetail);
    }
    return () => removeListener()
  }, []);

  return (
    <div style={{ paddingBottom: "100px" }}>
      <div>
        <ImageUploadSection
          imgUrl={welcomeData.imgUrl}
          setImgUrl={(url) => setWelcomeData({ ...welcomeData, imgUrl: url })}
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
        {/* <textarea
          placeholder="请输入欢迎语内容"
          style={{ width: "95%", border: "none", height: "50px" }}
        /> */}
        <TextArea
          placeholder="请输入欢迎语内容"
          autoSize={{ minRows: 3, maxRows: 10 }}
          value={welcomeData.content}
          onChange={(val) => {
            setWelcomeData({ ...welcomeData, content: val });
          }}
        />
        <span style={{ fontSize: "16px" }}>
          变量: 用户名点击
          <span
            style={{ color: "#40a7e3" }}
            onClick={() => {
              setWelcomeData({
                ...welcomeData,
                content: welcomeData.content + "{用户名}",
              });
            }}
          >
            &#123;用户名&#125;
          </span>{" "}
          群名点击
          <span
            style={{ color: "#40a7e3" }}
            onClick={() => {
              setWelcomeData({
                ...welcomeData,
                content: welcomeData.content + "{群名}",
              });
            }}
          >
            &#123;群名&#125;
          </span>
        </span>
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
          style={{ display: "block" }}
          onClick={() => {
            dispatch(setWelcomeDetail({ ...welcomeData, isEmpty: false }));
            navigate("/custom-button");
          }}
        >
          自定义按钮
        </Button>
        <div style={{ marginTop: "5px" }}>
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
        <Button
          mode="outlined"
          size="s"
          style={{ display: "block", marginTop: "10px" }}
          onClick={() => setShowSub(true)}
        >
          订阅按钮
        </Button>
        {showSub && (
          <div style={{ marginTop: "5px" }}>
            <Button style={{ margin: "5px" }}>点击验证</Button>
            <Button style={{ margin: "5px" }}>订阅频道</Button>
          </div>
        )}
        <div
          onClick={() => {
            deleteWelcomeApi({ bot_id: localStorage.getItem("botId") });
          }}
          style={{ display: "none" }}
        >
          删除数据
        </div>
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
          let format = counter.customButton.format;
          let list = counter.customButton.list;
          let colNum = format.split("*")[1];
          let keyBoardButton = to2DArray(list, colNum);

          if (localStorage.getItem("welcomeData")) {
            updateWelcomeApi(
              {
                bot_id: localStorage.getItem("botId"),
                bot_token: localStorage.getItem("botToken"),
                content: JSON.stringify({
                  text: welcomeData.content,
                  text_links: [],
                  inline_keyboard: keyBoardButton,
                  medias_path: welcomeData.imgUrl ? [welcomeData.imgUrl] : [],
                }),
                status: 0,
              },
              () => {
                clear();
                //dispatch(setWelcomeDetail(welcomeData));
                Toast.show({ content: "已保存" });
                navigate(-1);
              }
            );
          } else {
            createWelcomeApi(
              {
                bot_id: localStorage.getItem("botId"),
                bot_token: localStorage.getItem("botToken"),
                content: JSON.stringify({
                  text: welcomeData.content,
                  text_links: [],
                  inline_keyboard: keyBoardButton,
                  medias_path: welcomeData.imgUrl ? [welcomeData.imgUrl] : [],
                }),
                status: 0,
              },
              () => {
                clear();
                //dispatch(setWelcomeDetail(welcomeData));
                Toast.show({ content: "已保存" });
                localStorage.setItem("welcomeData", "set");
                navigate(-1);
              }
            );
          }
        }}
      >
        保存
      </Button>
    </div>
  );
}
