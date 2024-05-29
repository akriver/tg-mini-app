import { Link } from "@/components/Link/Link.jsx";
import { useState, useEffect } from "react";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { Dialog, Toast, Tag, Empty } from "antd-mobile";
//import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getKeyWordsListApi, deleteKeyWordApi } from "@/api/api";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";

function Head() {
  return (
    <div
      style={{
        borderRadius: "10px",
        background: "#fff",
        color: "#000",
        height: "50px",
        display: "flex",
      }}
    >
      <div
        style={{
          flex: 1,
          lineHeight: "50px",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        关键词
      </div>
      <div
        style={{
          flex: 2,
          lineHeight: "50px",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        回复内容
      </div>
    </div>
  );
}

function KeyWordsItem(props) {
  const item = props.item;

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        display: "flex",
        borderTop: "1px solid #ccc",
      }}
    >
      <div
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: "16px",
          overflow: "hidden",
          padding: "8px",
        }}
      >
        {item.key_words}
        {item.is_switch === 1 && item.switch_type === 0 && (
          <Tag color="#87d068" fill="outline" style={{ marginLeft: "5px" }}>
            开
          </Tag>
        )}
        {item.is_switch === 1 && item.switch_type === 1 && (
          <Tag color="#ff6430" fill="outline" style={{ marginLeft: "5px" }}>
            关
          </Tag>
        )}
      </div>
      <div
        style={{
          flex: 2,
          textAlign: "center",
          fontSize: "16px",
          display: "flex",
          padding: "8px",
        }}
      >
        <div
          className="multi-line-ellipsis-3"
          style={{ padding: "5px", height: "70px", flex: 3 }}
        >
          {JSON.parse(item.content)?.text}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RiEditLine
            style={{ fontSize: "28px", marginTop: "10px", color: "#666" }}
          />
          <RiDeleteBinLine
            style={{ fontSize: "28px", color: "#666" }}
            onClick={async () => {
              const result = await Dialog.confirm({
                content: "确定删除关键词?",
              });
              if (result) {
                deleteKeyWordApi({ id: item.id });
                props.setUpdate(props.update + 1);
                Toast.show({ content: "已删除", position: "center" });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * @returns {JSX.Element}
 */
export function KeyWordListPage() {
  const [keyWords, setKeyWords] = useState([]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getKeyWordsListApi(
      {
        bot_id: localStorage.getItem("botId"),
      },
      (res) => {
        setKeyWords(res.data);
      }
    );
  }, [update]);

  return (
    <>
      <div style={{ margin: "0 30px" }}>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <Head />
          {keyWords.map((item, index) => (
            <KeyWordsItem
              key={index}
              index={index}
              item={item}
              update={update}
              setUpdate={setUpdate}
            />
          ))}
          {keyWords.length === 0 && (
            <Empty description="暂无数据" style={{ background: "#f1f1f1" }} />
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="keyword-add">
            <IoIosAddCircleOutline style={{ fontSize: "25px" }} />
          </Link>
        </div>
      </div>
    </>
  );
}
