import s from "./Balance.module.scss";
import { useSelector } from "react-redux";
import financeSelectors from "redux/finance/finance-selectors";

const Balance = () => {
  const totalBalance = useSelector(financeSelectors.getBalance);

  return (
    <div className={s.balance}>
      <p className={s.balanceTitle}>Your balance</p>
      <p className={s.balanceValue}>
        <span className={s.symbol}>&#8372;</span>
        {totalBalance}
      </p>
    </div>
  );
};

export default Balance;
