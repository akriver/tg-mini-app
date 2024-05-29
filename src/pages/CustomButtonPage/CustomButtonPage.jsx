import "@telegram-apps/telegram-ui/dist/styles.css";
import { useState, useEffect } from "react";
import { Button, Cell } from "@telegram-apps/telegram-ui";
import { Selector, Input } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCustomButton, setCustomButtonTemp } from "../../store/dataSlice";
import { on } from "@tma.js/sdk-react";

export const options = [
  {
    label: "1*1",
    value: "1*1",
  },
  {
    label: "1*2",
    value: "1*2",
  },
  {
    label: "1*3",
    value: "1*3",
  },
  {
    label: "2*1",
    value: "2*1",
  },
  {
    label: "2*2",
    value: "2*2",
  },
  {
    label: "2*3",
    value: "2*3",
  },
  {
    label: "3*1",
    value: "3*1",
  },
  {
    label: "3*2",
    value: "3*2",
  },
  {
    label: "3*3",
    value: "3*3",
  },
];

/**
 * @returns {JSX.Element}
 */
export function CustomButtonPage() {
  const [count, setCount] = useState(0);
  const [cols, setCols] = useState(0);
  const [customButtonData, setCustomButtonData] = useState({
    format: "",
    list: [],
  });
  //const [buttonIndex, setButtonIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter);
  //dispatch(setCustomButton(customButtonData));
  //let cols = counter.customButton.format.split("*")[1];

  //清除暂存数据
  const clear = () => {
    dispatch(
      setCustomButtonTemp({
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
    setCustomButtonData(counter.customButtonTemp);
    return () => removeListener()
  }, []);

  return (
    <>
      <div>
        <div style={{ margin: "10px" }}>请勾选按钮格式</div>
        <div style={{ paddingLeft: "10px" }}>
          <Selector
            options={options}
            value={customButtonData.format}
            onChange={(arr) => {
              let result = arr[0].split("*");
              let num = parseInt(result[0]) * parseInt(result[1]);
              const buttonData = { format: arr[0], list: [] };
              for (let i = 0; i < num; i++) {
                let obj = { text: "按钮", url: "" };
                buttonData.list.push(obj);
              }
              setCount(num);
              setCols(result[1]);
              setCustomButtonData(buttonData);
              dispatch(setCustomButtonTemp(buttonData));
            }}
          />
        </div>
        <div style={{ marginTop: "30px" }}>
          {customButtonData.list.map((item, index) => (
            <Button
              key={index}
              style={{
                width: cols === "1" ? "90%" : cols === "2" ? "45%" : "30%",
                margin: "5px",
              }}
              onClick={() => {
                navigate("/custom-button-input?index=" + index);
              }}
            >
              {customButtonData.list[index].text}
            </Button>
          ))}
        </div>
        {customButtonData.format && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            以上是{customButtonData.format}的格式
          </div>
        )}
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
            clear();
            navigate(-1);
            dispatch(setCustomButton(customButtonData));
          }}
        >
          确定
        </Button>
      </div>
    </>
  );
}
