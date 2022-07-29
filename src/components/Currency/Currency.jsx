import s from "./Currency.module.scss";
import { useState, useEffect, useCallback } from "react";
import { BallTriangle } from "react-loader-spinner";
import useLocalStorage from "hooks/useLocalStorage";
import fetchExchangeRate from "services/CurrencyApi";

const Currency = () => {
  const [requestData, setRequestData] = useLocalStorage("request", {
    currency: [],
    time: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const prepareData = (data) => {
    const filteredData = data.filter(
      (el) => el.ccy !== "RUR" && el.ccy !== "BTC"
    );
    return filteredData.map((el) => ({
      ...el,
      buy: Number(el.buy).toFixed(2),
      sale: Number(el.sale).toFixed(2),
    }));
  };

  const countPastTime = useCallback(() => {
    const pastTime = new Date(Date.now() - requestData.time);
    return pastTime / (1000 * 60);
  }, [requestData.time]);

  useEffect(() => {
    (async () => {
      try {
        if (countPastTime() < 60) {
          return;
        }
        setLoading(true);
        setError("");
        const data = await fetchExchangeRate();
        const normalizedData = prepareData(data);
        setRequestData({ currency: normalizedData, time: Date.now() });
        setLoading(false);
      } catch (error) {
        setError("Sorry, exchange rate is not available now.");
        setLoading(false);
      }
    })();
  }, [countPastTime, requestData, setRequestData]);

  return (
    <div className={s.currency}>
      {loading ? (
        <div className={s.loader}>
          <BallTriangle color="#ffffff" height={50} width={50} />
        </div>
      ) : null}
      {!error && !loading ? (
        <>
          <div className={s.currencyHead}>
            <p className={s.currencyHeader}>Currency</p>
            <p className={s.currencyHeader}>Buy</p>
            <p className={s.currencyHeader}>Sell</p>
          </div>
          <ul className={s.currencyBody}>
            {requestData.currency?.map(({ buy, sale, ccy }) => (
              <li key={ccy} className={s.currencyRow}>
                <span className={s.currencyData}>{ccy}</span>
                <span className={s.currencyData}>{buy}</span>
                <span className={s.currencyData}>{sale}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className={s.error}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
export default Currency;

/* <table className={s.table}>
        <thead className={s.tableHead}>
          <tr className={s.tableRow}>
            <th className={s.tableHeader} scope="col">
              Currency
            </th>
            <th className={s.tableHeader} scope="col">
              Buy
            </th>
            <th className={s.tableHeader} scope="col">
              Sell
            </th>
          </tr>
        </thead>
        <tbody className={s.tableBody}>
          {currency.map(({ buy, sale, ccy }) => {
            return (
              <tr className={s.tableRow} key={ccy}>
                <td className={s.tableData}>{ccy}</td>
                <td className={s.tableData}>{buy}</td>
                <td className={s.tableData}>{sale}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */
