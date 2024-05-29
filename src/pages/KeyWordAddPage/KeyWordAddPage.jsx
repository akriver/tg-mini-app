import { useState } from "react";
import { Link } from "@/components/Link/Link.jsx";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { Button } from "@telegram-apps/telegram-ui";
import { Switch, Selector, Input, Toast, TextArea } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { addKeyWordApi } from "@/api/api";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ImageUploadSection } from "@/components/ImageUpload/ImageUploadSection";

export function BaseInput(props) {
  const {
    title,
    value,
    setValue,
    placeholder = "请输入",
    size = "normal",
    special = false,
  } = props;
  return (
    <>
      <div style={{ padding: special ? "0 10px 0 10px" : "10px 10px 0 10px" }}>
        <div style={{ padding: "10px" }}>{title}</div>
        <div style={{ padding: "0 10px" }}>
          <div
            style={{
              background: "#fff",
              width: "98%",
              padding: "2px",
              borderRadius: "20px",
            }}
          >
            <Input
              placeholder={placeholder}
              style={{ margin: size === "normal" ? "8px" : "5px" }}
              value={value}
              onChange={(val) => {
                setValue(val);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function BaseComponent(props) {
  return (
    <>
      <div style={{ padding: "10px 10px 0 10px" }}>
        <div style={{ padding: "10px" }}>{props.title}</div>
        <div style={{ padding: "0 10px" }}>
          <div
            style={{
              padding: "2px",
            }}
          >
            {props.component}
          </div>
        </div>
      </div>
    </>
  );
}

function ButtonGroup(props) {
  const { group, setGroup } = props;

  return (
    <>
      {group.map((item, index) => (
        <div key={index}>
          <BaseInput
            title="按钮名称"
            value={group[index].text}
            setValue={(val) => {
              let _group = [...group];
              _group[index].text = val;
              setGroup(_group);
            }}
            size="small"
          />
          <BaseInput
            title="跳转链接"
            value={group[index].url}
            setValue={(val) => {
              let _group = [...group];
              _group[index].url = val;
              setGroup(_group);
            }}
            size="small"
          />
        </div>
      ))}
    </>
  );
}

/**
 * @returns {JSX.Element}
 */
export function KeyWordAddPage() {
  const [keyWord, setKeyWord] = useState("");
  const [isSwitch, setIsSwitch] = useState(false);
  const [switchType, setSwitchType] = useState(0);
  const [reply, setReply] = useState("");
  const [group, setGroup] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <ImageUploadSection imgUrl={imgUrl} setImgUrl={setImgUrl} />
      <BaseInput
        title="添加关键词"
        value={keyWord}
        setValue={setKeyWord}
        placeholder="关键词"
        special
      />
      <BaseComponent
        title="是否开关关键词"
        component={
          <Switch
            checked={isSwitch}
            onChange={(val) => {
              setIsSwitch(val);
            }}
          />
        }
      />
      {isSwitch && (
        <BaseComponent
          title="关键词类型"
          component={
            <Selector
              options={[
                {
                  label: "开",
                  value: 0,
                },
                {
                  label: "关",
                  value: 1,
                },
              ]}
              defaultValue={[0]}
              onChange={(arr) => setSwitchType(arr[0])}
            />
          }
        />
      )}
      {/* <BaseInput
        title="添加回复内容"
        value={reply}
        setValue={setReply}
        placeholder="回复内容"
      /> */}
      <div
        style={{
          margin: "10px 20px 10px 20px",
          borderRadius: "10px",
          background: "#fff",
          padding: "10px",
        }}
      >
        <TextArea
          placeholder="回复内容"
          autoSize={{ minRows: 3, maxRows: 10 }}
          value={reply}
          onChange={(val) => {
            setReply(val);
          }}
        />
      </div>
      <div style={{ padding: "0 10px 60px 10px" }}>
        <div style={{ padding: "10px" }}>添加底部按钮</div>
        <ButtonGroup group={group} setGroup={setGroup} />
        <IoIosAddCircleOutline
          style={{ fontSize: "30px", padding: "10px" }}
          onClick={() => {
            let _group = [...group];
            _group.push({ text: "", url: "" });
            setGroup(_group);
          }}
        />
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
          addKeyWordApi(
            {
              bot_id: localStorage.getItem("botId"),
              bot_token: localStorage.getItem("botToken"),
              content: JSON.stringify({
                text: reply,
                //text_links: [],
                inline_keyboard: [group],
                medias_path: imgUrl ? [imgUrl] : [],
              }),
              filter_users: "",
              is_switch: isSwitch ? 1 : 0,
              key_words: keyWord,
              status: 0,
              switch_type: switchType,
            },
            () => {
              Toast.show({ content: "保存成功", position: "center" });
              navigate(-1);
            }
          );
        }}
      >
        保存
      </Button>
    </>
  );
}
