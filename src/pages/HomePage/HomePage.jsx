import { useState, useEffect } from "react";
import { Link } from "@/components/Link/Link.jsx";
import { routes } from "@/navigation/routes.jsx";
import { useInitData } from "@tma.js/sdk-react";
import { Cell, List, Avatar } from "@telegram-apps/telegram-ui";
import "./HomePage.css";
import "@telegram-apps/telegram-ui/dist/styles.css";
import TopImage from "./topBg.jpg";
import DefaultAvatarImage from "./defaultAvatar.jpg";
import {
  RightOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { RiRobot2Fill } from "react-icons/ri";
import { PiSquaresFourDuotone } from "react-icons/pi";
import { getBots, getWelcomeInfo, getKeyboardApi, getUserApi } from "@/api/api";
import { Image, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";

/**
 * @returns {JSX.Element}
 */
export function HomePage() {
  const [name, setName] = useState();
  const [account, setAccount] = useState();
  const navigate = useNavigate();
  const initData = useInitData();

  const nav = (path) => {
    if (localStorage.getItem("botToken")) {
      navigate(path);
    } else {
      Toast.show({ content: "请先保存机器人token" });
    }
  };

  // return (
  //   <>
  //     <h1>Home Page</h1>
  //     <p>
  //       This page is a home page in this boilerplate. You can use the links below to visit other
  //       pages with their own functionality.
  //     </p>
  //     <ul className="index-page__links">
  //       {routes.map(({ path, title, icon }) => title && (
  //         <li className="index-page__link-item" key={path}>
  //           <Link className="index-page__link" to={path}>
  //             {icon && (
  //               <i className="index-page__link-icon">
  //                 {icon}
  //               </i>
  //             )}
  //             {title}
  //           </Link>
  //         </li>
  //       ))}
  //     </ul>
  //   </>
  // );

  useEffect(() => {
    getUserApi((res) => {
      const user = res.data;
      if (
        user.username &&
        (!localStorage.getItem("botName") ||
          !localStorage.getItem("botAccount"))
      ) {
        localStorage.setItem("botName", user.first_name);
        localStorage.setItem("botAccount", `@${user.username}`);
        setName(user.first_name);
        setAccount(`@${user.username}`);
      }
    });

    getBots();
    getWelcomeInfo();
    getKeyboardApi();

    setName(localStorage.getItem("botName") ?? "互站机器人");
    setAccount(localStorage.getItem("botAccount") ?? "@huzhanbot");
  }, []);

  return (
    <div>
      <div style={{ position: "relative" }}>
        {/* <img src={TopImage} style={{ width: "100%" }} /> */}
        <Image src={TopImage} width="100%" height={145} fit="cover" />
        {/* <Button mode="filled" size="s" style={{position: 'absolute', right: '20px', top: '20px', height: '25px' }}>
          修改
        </Button> */}
        <Avatar
          size={90}
          src={DefaultAvatarImage}
          style={{
            position: "absolute",
            left: "30px",
            bottom: "-40px",
            border: "2px solid #fff",
          }}
        />
        <div style={{ position: "absolute", left: "150px", bottom: "10px" }}>
          {account ?? "@huzhanbot"}
        </div>
        <div
          style={{
            position: "absolute",
            left: "140px",
            bottom: "-35px",
            fontSize: "26px",
            textShadow: "2px 2px 2px rgba(0,0,0,0.2)",
          }}
        >
          {name ?? "互站机器人"}
        </div>
      </div>
      <List style={{ margin: "60px 30px 0 30px" }}>
        <Link to="/input-page">
          <Cell
            before={
              <RiRobot2Fill style={{ fontSize: "30px", color: "#66CDAA" }} />
            }
            after={
              <>
                {localStorage.getItem("botToken") == null ? (
                  <span style={{ color: "#FF6347", fontSize: "16px" }}>
                    未注册
                  </span>
                ) : (
                  <span style={{ color: "#32CD32", fontSize: "16px" }}>
                    已注册
                  </span>
                )}
                <RightOutlined style={{ color: "#ccc" }} />
              </>
            }
            style={{ borderRadius: "10px", background: "#fff" }}
          >
            输入机器token
          </Cell>
        </Link>
        <div style={{ fontSize: "15px", color: "#666", marginTop: "10px" }}>
          <div>请输入机器人token</div>
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
        <Cell
          before={
            <PiSquaresFourDuotone
              style={{ fontSize: "30px", color: "#87CEEB" }}
            />
          }
          after={
            <>
              <RightOutlined style={{ color: "#ccc" }} />
            </>
          }
          style={{ borderRadius: "10px", background: "#fff" }}
          onClick={() => nav("/keyboard-button")}
        >
          配置键盘按钮
        </Cell>
        <div
          style={{ fontSize: "17px", textAlign: "center", marginTop: "20px" }}
        >
          机器人教程
        </div>
        <div
          style={{
            marginTop: "10px",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <Cell>怎样创建机器人</Cell>
          <Cell>怎样拿到token</Cell>
          <Cell>怎样修改名字头像描述图片</Cell>
        </div>
        <div style={{ paddingBottom: "5px" }}>
          <Link to="https://t.me/huzhan666">
            <div
              style={{
                fontSize: "15px",
                color: "rgb(80,158,231)",
                textAlign: "center",
                marginTop: "40px",
              }}
            >
              互站技术支持
            </div>
          </Link>
          {/* <div style={{ position: "relative" }}>
            <SettingOutlined
              style={{
                fontSize: "30px",
                color: "#000",
                position: "absolute",
                left: "25px",
                top: "0",
              }}
            />
            <Link to="/free-service">
              <UnorderedListOutlined
                style={{
                  fontSize: "30px",
                  color: "#000",
                  position: "absolute",
                  right: "25px",
                  top: "0",
                }}
              />
            </Link>
          </div> */}
        </div>
      </List>
    </div>
  );
}
