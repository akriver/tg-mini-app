import { ButtonCell } from "@telegram-apps/telegram-ui";
import { RxImage } from "react-icons/rx";

export function FileInput(props) {
  return (
    <div className="file-input">
      <ButtonCell Component="label" before={<RxImage fontSize="30px" />}>
        <div style={{ opacity: 0 }}>
          <input
            type="file"
            onChange={(event) => props.onChange(event)}
          />
        </div>
        <div style={{ position: "relative", bottom: "12px" }}>上传图片</div>
      </ButtonCell>
    </div>
  );
}
