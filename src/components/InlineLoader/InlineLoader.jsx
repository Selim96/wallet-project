import { ThreeDots } from "react-loader-spinner";
import s from "./InlineLoader.module.scss";

export default function InlineLoader() {
  return (
    <div className={s.loader}>
      <ThreeDots color="#4a56e2" height={30} width={50} />
    </div>
  );
}
