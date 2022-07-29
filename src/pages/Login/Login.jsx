import s from "../Registration/registration.module.scss";
import imgLogin from "../../assets/images/imgLogin.png";
import sContainer from "../../components/AuthForm/ContainerForm.module.scss";
import AuthForm from "../../components/AuthForm/AuthForm";
import Media from "react-media";

const Login = () => {
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
                    <img src={imgLogin} alt="finance app" className={s.img} />
                    <h1 className={s.title}>Finance App</h1>
                  </div>
                </div>
                )}
            </>)}
          </Media>
          <div className={s.right}>
            <AuthForm type="login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
