import s from './UpButton.module.scss';


export default function UpButton({inView, refin}) {
    const buttonStyles = [s.button];
    if (!inView) {
        buttonStyles.push(s.hidden)
    }
    return (
        <div className={s.wrapper}>
            <button className={buttonStyles.join(" ")} disabled={!inView} type='button' >
                <a href='#naviget'>
                    <span className={s.button__wrap}>Up</span>
                </a>
            </button>
            <div className={s.scrollview}></div>
            <div ref={refin} className={s.abserver}></div>
        </div>
  
  );
}