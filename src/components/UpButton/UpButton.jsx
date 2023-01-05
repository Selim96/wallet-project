import s from './UpButton.module.scss';
import { TiArrowBack } from "react-icons/ti";


export default function UpButton({inView, refin}) {
    const buttonStyles = [s.button];
    if (!inView) {
        buttonStyles.push(s.hidden)
    }
    return (
        <div className={s.wrapper}>
            <button className={buttonStyles.join(" ")} disabled={!inView} type='button' >
                <a href='#naviget'>
                    {/* <span className={s.button__wrap}>Up</span> */}
                    <TiArrowBack
                      style={{ width: "27", height: "28", color: "white", transform: "rotate(90deg) rotateX(180deg) translate(2px, -2px)" }}
                    />
                </a>
            </button>
            <div className={s.scrollview}></div>
            <div ref={refin} className={s.abserver}></div>
        </div>
  
  );
}