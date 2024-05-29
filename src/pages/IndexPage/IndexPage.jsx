import { useState, useEffect } from "react";
import { Toast, TabBar } from "antd-mobile";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { HomePage } from "@/pages/HomePage/HomePage";
import { FreeServicePage } from "@/pages/FreeServicePage/FreeServicePage.jsx";
import { SettingOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { setActiveKey } from "@/store/dataSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const tabs = [
  {
    key: "home",
    title: "首页",
    icon: <SettingOutlined />,
  },
  {
    key: "menu",
    title: "功能",
    icon: <UnorderedListOutlined />,
  },
];

/**
 * @returns {JSX.Element}
 */
export function IndexPage() {
  const [activeKeyData, setActiveKeyData] = useState("home");
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  useEffect(() => {
    setActiveKeyData(counter.activeKey);
  }, []);

  return (
    <>
      <div style={{ height: "calc(100vh - 95px)", overflow: "auto" }}>
        {activeKeyData === "home" && <HomePage />}
        {activeKeyData === "menu" && <FreeServicePage />}
      </div>
      <div
        style={{
          background: "#fff",
          width: "100%",
          borderTop: "solid 1px #eee",
        }}
      >
        <TabBar
          activeKey={activeKeyData}
          onChange={(key) => {
            dispatch(setActiveKey(key));
            setActiveKeyData(key);
          }}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} />
          ))}
        </TabBar>
      </div>
    </>
  );
}
