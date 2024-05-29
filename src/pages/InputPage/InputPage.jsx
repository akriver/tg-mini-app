import { useState, useEffect } from "react";
import { Link } from "@/components/Link/Link.jsx";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { Button } from "@telegram-apps/telegram-ui";
import { Input, Toast } from "antd-mobile";
import { useInitData } from "@tma.js/sdk-react";
//import { setBotId, setBotToken } from "../../store/dataSlice";
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBotApi } from "@/api/api";

/**
 * @returns {JSX.Element}
 */
export function InputPage() {
  const [token, setToken] = useState("");
  const initData = useInitData();
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  useEffect(() => {
    const _token = localStorage.getItem("botToken");
    if (_token) {
      setToken(_token);
    }
  }, []);

  return (
    <div>
      <div style={{ padding: "10px", paddingTop: "20px" }}>
        <div
          style={{
            background: "#fff",
            width: "98%",
            padding: "2px",
            borderRadius: "20px",
          }}
        >
          <Input
            placeholder="请输入机器人token"
            style={{ margin: "10px", width: "90%" }}
            value={token}
            onChange={(token) => {
              setToken(token);
            }}
          />
        </div>
        <div style={{ color: "#555", marginTop: "10px", padding: "2px 10px" }}>
          <div>请输入机器人token</div>
          <div>
            如果没有机器人请到
            <Link
              to="https://t.me/BotFather"
              style={{ color: "rgb(80,158,231)" }}
            >
              {" "}
              @botfather{" "}
            </Link>
            创建
          </div>
        </div>
      </div>
      <Button
        mode="filled"
        size="l"
        style={{
          position: "absolute",
          width: "100%",
          left: "0",
          bottom: "0",
          borderRadius: "0",
        }}
        onClick={() => {
          const botId = token.split(":")[0];
          createBotApi(
            {
              bot_token: token,
              bot_id: botId,
              user: {
                user_id: initData.user.id,
                first_name: initData.user.firstName,
                last_name: initData.user.lastName,
                username: initData.user.username,
              },
            },
            () => {
              localStorage.setItem("botId", botId);
              localStorage.setItem("botToken", token);
              localStorage.setItem("botName", initData.user.firstName);
              localStorage.setItem("botAccount", `@${initData.user.username}`);
              Toast.show({ content: "保存成功", position: "center" });
              navigate(-1);
              //dispatch(setBotToken(token));
              //dispatch(setBotId(botId));
            }
          );
        }}
      >
        确定
      </Button>
    </div>
  );
}
