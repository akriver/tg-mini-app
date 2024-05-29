import { Link } from "@/components/Link/Link.jsx";
import { useState, useEffect } from "react";
import { Toast } from "antd-mobile";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { Cell, List } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";

/**
 * @returns {JSX.Element}
 */
export function FreeServicePage() {
  const navigate = useNavigate();

  const nav = (path) => {
    if (localStorage.getItem("botToken")) {
      navigate(path);
    } else {
      Toast.show({ content: "请先保存机器人token" });
    }
  };

  useEffect(() => {
    if (document?.documentElement || document?.body) {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  }, []);

  return (
    <>
      <List style={{ margin: "0 30px" }}>
        <div
          style={{ fontSize: "17px", textAlign: "center", marginTop: "20px" }}
        >
          免费功能
        </div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <Cell onClick={() => nav("/welcome-set?from=menu")}>欢迎语</Cell>
          <Cell onClick={() => nav("/advert-list?mode=single")}>
            间隔单广告
          </Cell>
          <Cell onClick={() => nav("/advert-list?mode=multi")}>定时多广告</Cell>
          <Cell onClick={() => nav("/keyword-list")}>关键词</Cell>
          <Cell>禁言</Cell>
          <Cell>踢人</Cell>
          <Cell>更名</Cell>
          <Cell>记账</Cell>
          <Cell>广播消息</Cell>
          <Cell>币价查询</Cell>
          <Cell>查询地址u/ton</Cell>
        </div>
      </List>
    </>
  );
}
