import { Link } from "@/components/Link/Link.jsx";
import { useState, useEffect } from "react";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { Cell, List } from "@telegram-apps/telegram-ui";
import { Dialog, Toast, SpinLoading, Tag, Empty } from "antd-mobile";
import { useLocation } from "react-router-dom";
//import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  RiEditLine,
  RiDeleteBinLine,
  RiPlayCircleLine,
  RiStopCircleLine,
} from "react-icons/ri";
import { setAdStatus, getAdsListApi, deleteAdApi } from "@/api/api.js";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function AdsItem(props) {
  const { item, mode, index } = props;
  const navigate = useNavigate();

  return (
    <div
      style={{
        borderRadius: "10px",
        background: "#fff",
        color: "#000",
        display: "flex",
        borderBottom: "1px solid #eee",
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
        <div className="multi-line-ellipsis">
          {JSON.parse(item.content).text}
        </div>
        <div style={{ color: "#bbb" }}>
          {item.exec_type === 1
            ? `执行时间: ${item.exec_time}`
            : `时间间隔: ${item.exec_duration}`}
          {item.status === 0 && (
            <Tag
              color="#87d068"
              fill="outline"
              style={{ marginLeft: "5px", position: "relative", top: "-2px" }}
            >
              运行中
            </Tag>
          )}
          {item.status === 1 && (
            <Tag
              color="#ff6430"
              fill="outline"
              style={{ marginLeft: "5px", position: "relative", top: "-2px" }}
            >
              已停止
            </Tag>
          )}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          lineHeight: "50px",
          textAlign: "center",
          paddingTop: "10px",
        }}
      >
        <RiEditLine
          style={{ fontSize: "25px", marginRight: "20px", color: "#555" }}
          onClick={() => {
            navigate(
              `/advert-detail?mode=${mode}&index=${index}&id=${item.id}`
            );
          }}
        />
        <RiDeleteBinLine
          style={{ fontSize: "25px", marginRight: "20px", color: "#555" }}
          onClick={async () => {
            const result = await Dialog.confirm({
              content: "确定删除广告?",
            });
            if (result) {
              deleteAdApi({ id: item.id });
              props.setUpdate(props.update + 1);
              Toast.show({ content: "已删除", position: "center" });
            }
          }}
        />
        {item.status === 1 && (
          <RiPlayCircleLine
            style={{
              fontSize: "25px",
              color: "green",
              position: "relative",
            }}
            onClick={() => {
              setAdStatus({ id: item.id });
              props.setUpdate(props.update + 1);
            }}
          />
        )}
        {item.status === 0 && (
          <RiStopCircleLine
            style={{
              fontSize: "25px",
              color: "red",
              position: "relative",
            }}
            onClick={() => {
              setAdStatus({ id: props.item.id });
              props.setUpdate(props.update + 1);
            }}
          />
        )}
      </div>
    </div>
  );
}
/**
 * @returns {JSX.Element}
 */
export function AdsListPage() {
  const [mode, setMode] = useState("single");
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let _mode = location.search.split("=")[1];
    getAdsListApi({ bot_id: localStorage.getItem("botId") }, (res) => {
      setList(res.data);
      setMode(_mode);
      setLoading(false);
    });
    setLoading(true);
  }, [update]);

  return (
    <>
      {loading ? (
        <SpinLoading style={{ margin: "30px auto" }} />
      ) : (
        <List style={{ margin: "0 30px" }}>
          <div
            style={{ fontSize: "17px", textAlign: "center", marginTop: "20px" }}
          >
            {mode === "single" ? "间隔" : "定时"}广告
          </div>
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              background: "#fff",
            }}
          >
            {list
              .filter((item) =>
                mode === "single" ? item.exec_type === 2 : item.exec_type === 1
              )
              .map((item, index) => (
                <AdsItem
                  key={index}
                  index={index}
                  item={item}
                  mode={mode}
                  update={update}
                  setUpdate={setUpdate}
                />
              ))}
            {list.length === 0 && (
              <Empty description="暂无数据" style={{ background: "#f1f1f1" }} />
            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to={"/advert-detail?mode=" + mode}>
              <IoIosAddCircleOutline style={{ fontSize: "25px" }} />
            </Link>
          </div>
        </List>
      )}
    </>
  );
}
