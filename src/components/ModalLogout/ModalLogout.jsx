import s from "./ModalLogout.module.scss";
import Modal from "components/Modal/Modal";
import { useDispatch } from "react-redux";
import { toggleModalLogout } from "redux/global/global-slice";
import { logOut } from "redux/session/auth-operation";

export default function ModalLogout() {
  const dispatch = useDispatch();
  const isCloseModal = () => {
    dispatch(toggleModalLogout());
  };

  const logOutUser = () => {
    dispatch(logOut());
  };
  return (
    <Modal closeModal={isCloseModal}>
      <div className={s.logout}>
        <h1 className={s.logout__title}> Are you sure you want to log out?</h1>
        <div className={s.wrapper}>
          <button className={s.wrapper__btn} type="button" onClick={logOutUser}>
            Yes
          </button>
          <button
            className={s.wrapper__btn}
            type="button"
            onClick={isCloseModal}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}
