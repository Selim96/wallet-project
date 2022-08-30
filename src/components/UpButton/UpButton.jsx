import s from './UpButton.module.scss';


export default function UpButton({inView, refin}) {
    const buttonStyles = [s.button];
    const buttonSpan = [s.button__wrap];
    if (!inView) {
        buttonStyles.push(s.hidden)
        buttonSpan.push(s.hidden)
    }
    return (
        <div className={s.wrapper}>
            <button className={buttonStyles} disabled={!inView} type='button' onClick={()=>{console.log("UpButton is pressed!!")}}>
            <span className={s.button__wrap}>Up</span>
            </button>
            <div className={s.scrollview}></div>
            <div ref={refin} className={s.abserver}></div>
        </div>
  
  );
}