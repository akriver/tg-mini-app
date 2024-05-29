import { useState, useEffect } from "react";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { Button } from "@telegram-apps/telegram-ui";
import { Input, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setCustomButtonTemp } from "../../store/dataSlice";

/**
 * @returns {JSX.Element}
 */
export function CustomButtonInputPage() {
  const [name, setName] = useState("按钮");
  const [link, setLink] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter);
  const location = useLocation();
  let index = location.search.split("=")[1];

  return (
    <div>
      <div style={{ padding: "20px 10px 0 10px" }}>
        <div style={{ padding: "10px" }}>请输入按钮名称</div>
        <div style={{ padding: "10px" }}>
          <div
            style={{
              background: "#fff",
              width: "98%",
              padding: "2px",
              borderRadius: "20px",
            }}
          >
            <Input
              placeholder="按钮名称"
              style={{ margin: "10px" }}
              value={name}
              onChange={(val) => {
                setName(val);
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ padding: "0 10px 0 10px" }}>
        <div style={{ padding: "10px" }}>请输入跳转链接</div>
        <div style={{ padding: "10px" }}>
          <div
            style={{
              background: "#fff",
              width: "98%",
              padding: "2px",
              borderRadius: "20px",
            }}
          >
            <Input
              placeholder="跳转链接"
              style={{ margin: "10px" }}
              value={link}
              onChange={(val) => {
                setLink(val);
              }}
            />
          </div>
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
          if (link == null) {
            Toast.show({ content: "请输入跳转链接", position: "center" });
            return;
          }
          const newData = structuredClone(counter.customButtonTemp);
          newData.list[index].text = name;
          newData.list[index].url = link;
          dispatch(setCustomButtonTemp(newData));
          navigate(-1);
        }}
      >
        保存
      </Button>
    </div>
  );
}
