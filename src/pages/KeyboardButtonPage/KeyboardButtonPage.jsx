import "@telegram-apps/telegram-ui/dist/styles.css";
import { useState, useEffect } from "react";
import { Button } from "@telegram-apps/telegram-ui";
import { Selector, Toast, Dialog } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setKeyboardButton } from "../../store/dataSlice";
import { to2DArray } from "../AdsDetailPage/AdsDetailPage";
import { createKeyboardButton, updateKeyboardButton } from "@/api/api";
import { getKeyboardApi } from "@/api/api";
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
  {
    label: "4*2",
    value: "4*2",
  },
  {
    label: "5*2",
    value: "5*2",
  },
];

/**
 * @returns {JSX.Element}
 */
export function KeyboardButtonPage() {
  //const [count, setCount] = useState(0);
  const [cols, setCols] = useState(0);
  const [keyboardButtonData, setkeyboardButtonData] = useState({
    format: "",
    list: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  //清除暂存数据
  const clear = () => {
    dispatch(
      setKeyboardButton({
        isEmpty: true,
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
    if (counter.keyboardButton.isEmpty) {
      //首次进页面
      getKeyboardApi((res) => {
        //content: "{\"keyboard\":[[{\"text\":\"按钮\",\"content\":{}},{\"text\":\"按钮\",\"content\":{}}]]}"
        if (res.data.length > 0) {
          const data = res.data[0];
          const _content = JSON.parse(data.content);
          const keyboardData = _content.keyboard;
          const row = keyboardData.length;
          const col = keyboardData[0].length;
          const format = `${row}*${col}`;
          const list = keyboardData.flat();
          dispatch(setKeyboardButton({ ...keyboardButtonData, format, list }));
          setCols(col);
          setkeyboardButtonData({ format, list });
        }
      });
    } else {
      //从按钮编辑页面返回
      const col = counter.keyboardButton.format.split("*")[1];
      setCols(parseInt(col));
      setkeyboardButtonData(counter.keyboardButton);
    }
    return () => removeListener();
  }, []);

  return (
    <>
      <div>
        <div style={{ margin: "10px" }}>请勾选按钮格式</div>
        <div style={{ paddingLeft: "10px" }}>
          <Selector
            options={options}
            value={keyboardButtonData.format}
            onChange={async (arr) => {
              let result = true;
              if (
                counter.keyboardButton.list.some((item) => item.text != "按钮")
              ) {
                result = await Dialog.confirm({
                  content: "确定改变格式? 已设置的按钮会被清空",
                });
              }
              if (result) {
                let result = arr[0].split("*");
                let num = parseInt(result[0]) * parseInt(result[1]);
                const buttonData = { format: arr[0], list: [] };
                for (let i = 0; i < num; i++) {
                  let obj = { text: "按钮", content: {} };
                  buttonData.list.push(obj);
                }
                setCols(parseInt(result[1]));
                setkeyboardButtonData(buttonData);
                dispatch(setKeyboardButton(buttonData));
              }
            }}
          />
        </div>
        <div style={{ marginTop: "30px" }}>
          {keyboardButtonData.list.map((item, index) => (
            <Button
              key={index}
              style={{
                width:
                  cols === 1
                    ? "90%"
                    : cols === 2
                    ? "45%"
                    : cols === 3
                    ? "30%"
                    : cols === 4
                    ? "22%"
                    : "17%",
                margin: "5px",
              }}
              onClick={() => {
                dispatch(
                  setKeyboardButton({ ...keyboardButtonData, isEmpty: false })
                );
                navigate("/keyboard-button-input?index=" + index);
              }}
            >
              {keyboardButtonData.list[index].text}
            </Button>
          ))}
        </div>
        {keyboardButtonData.format && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            以上是{keyboardButtonData.format}的格式
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
            let format = counter.keyboardButton.format;
            let list = counter.keyboardButton.list;
            let colNum = format.split("*")[1];
            let keyboardButton = to2DArray(list, colNum);

            if (localStorage.getItem("keyboardData")) {
              // console.log({
              //   bot_id: localStorage.getItem("botId"),
              //   bot_token: localStorage.getItem("botToken"),
              //   content: {
              //     keyboard: keyboardButton,
              //   },
              // });
              updateKeyboardButton(
                {
                  bot_id: localStorage.getItem("botId"),
                  bot_token: localStorage.getItem("botToken"),
                  content: JSON.stringify({
                    keyboard: keyboardButton,
                  }),
                },
                () => {
                  Toast.show({ content: "已保存" });
                  clear();
                  navigate(-1);
                }
              );
            } else {
              createKeyboardButton(
                {
                  bot_id: localStorage.getItem("botId"),
                  bot_token: localStorage.getItem("botToken"),
                  content: JSON.stringify({
                    keyboard: keyboardButton,
                  }),
                },
                () => {
                  Toast.show({ content: "已保存" });
                  clear();
                  localStorage.setItem("keyboardData", "set");
                  navigate(-1);
                }
              );
            }
          }}
        >
          确定
        </Button>
      </div>
    </>
  );
}
