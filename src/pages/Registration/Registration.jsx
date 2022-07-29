import AuthForm from "../../components/AuthForm/AuthForm";
import imgRegister from "../../assets/images/imgRegister.png";
import s from "./registration.module.scss";
import sContainer from "../../components/AuthForm/ContainerForm.module.scss";
import "react-toastify/dist/ReactToastify.min.css";
import Media from "react-media";

const Registration = () => {
  return (
    <div className={s.registerBg}>
      <div className={sContainer.container}>
        <div className={s.mainPage}>
          <Media
            queries={{
            smallWidth: "(max-width: 1279px)",
            smallHeight: "(max-height: 1009px)",
          }}
          >
          {({smallWidth, smallHeight,}) => (
            <>
              {smallHeight && smallWidth ? (
                <></>
                ) : (
                <div className={s.left}>
                  <div className={s.left__position}>
                  <img src={imgRegister} alt="finance app" className={s.img} />
                    <h1 className={s.title}>Finance App</h1>
                  </div>
                </div>
                )}
            </>)}
          </Media>
          <div className={s.right}>
            <div className={s.right__formbox}>
              <AuthForm type="signUp" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
