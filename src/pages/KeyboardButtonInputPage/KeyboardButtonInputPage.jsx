import { useState, useEffect } from "react";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { Button } from "@telegram-apps/telegram-ui";
import { Input, Toast, TextArea, DotLoading } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setKeyboardButton } from "../../store/dataSlice";
import { BaseInput, BaseComponent } from "../KeyWordAddPage/KeyWordAddPage";
import { Image } from "antd-mobile";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FileInput } from "@/components/FileInput/FileInput";
import { uploadApi } from "@/api/api";

/**
 * @returns {JSX.Element}
 */
export function KeyboardButtonInputPage() {
  const [name, setName] = useState("按钮");
  const [mediaUrl, setMediaUrl] = useState(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter);
  const location = useLocation();
  let index = location.search.split("=")[1];

  useEffect(() => {
    const name = counter.keyboardButton.list[index].text;
    const content = counter.keyboardButton.list[index].content;
    const reply = content.text;
    let mediaUrl = null;
    if (content.medias_path && content.medias_path.length > 0) {
      mediaUrl = content.medias_path[0];
    }
    if (name) setName(name);
    if (reply) setReply(reply);
    if (mediaUrl) setMediaUrl(mediaUrl);
  }, []);

  return (
    <div style={{ paddingBottom: "50px" }}>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <DotLoading style={{ fontSize: "24px" }} />
        </div>
      )}
      {mediaUrl && (
        <div style={{ position: "relative" }}>
          {mediaUrl.indexOf(".mp4") > -1 ? (
            <div style={{ textAlign: "center" }}>
              <video
                src={mediaUrl}
                autoPlay={true}
                controls
                style={{
                  maxHeight: "300px",
                  maxWidth: '100%',
                  objectFit: "cover",
                }}
              />
            </div>
          ) : mediaUrl.indexOf(".mp3") > -1 ? (
            <div style={{ textAlign: "center" }}>
              <audio src={mediaUrl} controls width="100%" />
            </div>
          ) : (
            <Image src={mediaUrl} width="100%" height={200} fit="cover" />
          )}
          <RiDeleteBin5Fill
            style={{
              position: "absolute",
              right: "10px",
              bottom: "10px",
              fontSize: "25px",
              color: "#fff",
            }}
            onClick={() => setMediaUrl(null)}
          />
        </div>
      )}
      <BaseInput
        title="请输入按钮名称"
        value={name}
        setValue={setName}
        placeholder="按钮名称"
        special
      />
      {/* <BaseInput
        title="请输入自动回复文本"
        value={reply}
        setValue={setReply}
        placeholder="自动回复文本"
        special
      /> */}
      <div style={{ padding: "10px 10px 0 10px" }}>
        <div style={{ padding: "10px" }}>请输入自动回复文本</div>
        <div style={{ padding: "0 10px" }}>
          <div
            style={{
              background: "#fff",
              width: "95%",
              padding: "8px",
              borderRadius: "20px",
            }}
          >
            <TextArea
              placeholder="自动回复文本"
              autoSize={{ minRows: 3, maxRows: 10 }}
              value={reply}
              onChange={(val) => {
                setReply(val);
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            margin: "10px 20px 10px 20px",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <FileInput
            onChange={(event) => {
              const file = event.target.files[0];
              const formData = new FormData();
              formData.append("upload-file", file);
              uploadApi(formData, (json) => {
                setMediaUrl(json.data.url);
                setLoading(false);
              });
              setLoading(true);
            }}
          />
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
          if (name == null) {
            Toast.show({ content: "请输入按钮名称", position: "center" });
            return;
          }
          const newData = structuredClone(counter.keyboardButton);
          newData.list[index].text = name;
          newData.list[index].content = {
            text: reply,
            medias_path: mediaUrl ? [mediaUrl] : [],
          };
          dispatch(setKeyboardButton(newData));
          navigate(-1);
        }}
      >
        保存
      </Button>
    </div>
  );
}
