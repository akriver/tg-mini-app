import { useState } from "react";
import { Image, DotLoading } from "antd-mobile";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FileInput } from "../FileInput/FileInput";
import { uploadApi } from "@/api/api";

export function ImageUploadSection(props) {
  const { imgUrl } = props;
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* <img src="" width="100" height="100" alt="" /> */}
      {loading && (
        <div style={{ textAlign: "center" }}>
          <DotLoading style={{ fontSize: "24px" }} />
        </div>
      )}
      {imgUrl && (
        <div style={{ position: "relative" }}>
          {imgUrl.indexOf(".mp4") > -1 ? (
            <div style={{ textAlign: "center" }}>
              <video
                src={imgUrl}
                autoPlay={true}
                controls
                style={{
                  maxHeight: "300px",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : imgUrl.indexOf(".mp3") > -1 ? (
            <div style={{ textAlign: "center" }}>
              <audio src={imgUrl} controls width="100%" />
            </div>
          ) : (
            <Image src={imgUrl} width="100%" height={200} fit="cover" />
          )}
          <RiDeleteBin5Fill
            style={{
              position: "absolute",
              right: "10px",
              bottom: "10px",
              fontSize: "25px",
              color: "#fff",
            }}
            onClick={() => props.setImgUrl(null)}
          />
        </div>
      )}
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
              props.setImgUrl(json.data.url);
              setLoading(false);
            });
            setLoading(true);
            //const img = window.URL.createObjectURL(file);
            //props.setImgUrl(img);
          }}
        />
      </div>
    </>
  );
}
