import s from './ButtonAddTransactions.module.scss'
import { useDispatch } from 'react-redux';
import { toggleModalAddTransaction } from 'redux/global/global-slice';
const ButtonAddTransactions = () => {
  const dispatch = useDispatch();
  return (
  <button className={s.button} type='button' onClick={()=>dispatch(toggleModalAddTransaction())}>
        <span className={s.button__wrap}>+</span>
      </button>
  );
};
export default ButtonAddTransactions;
