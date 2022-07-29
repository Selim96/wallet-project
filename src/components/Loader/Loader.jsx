import { ThreeDots } from "react-loader-spinner";
import s from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={s.loader}>
      <ThreeDots color="#4a56e2" height={100} width={100} />
    </div>
  );
}