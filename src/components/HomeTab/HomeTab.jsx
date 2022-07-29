import s from "./HomeTab.module.scss";
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import Media from "react-media";
import financeSelectors from "redux/finance/finance-selectors";
import { IconContext } from "react-icons";
import { MdAccountBalanceWallet } from "react-icons/md";

const HomeTab = () => {
  const data = useSelector(financeSelectors.getFilteredData);

  return !!data?.length ? (
    <Media
      queries={{
        small: "(max-width: 767px)",
        medium: "(min-width: 768px)",
      }}
    >
      {(matches) => (
        <>
          {matches.small && (
            <ul className={s.mobailTrList}>
              {data.map(
                ({
                  id,
                  balanceAfter,
                  category,
                  amount,
                  comment,
                  type,
                  transactionDate,
                }) => {
                  return (
                    <li
                      key={id}
                      className={
                        type === "INCOME"
                          ? s.mobailTrItem_INCOME
                          : s.mobailTrItem_EXPENSE
                      }
                    >
                      <ul className={s.mobailTrItem__list}>
                        <li className={s.mobailTrItem__row}>
                          <span className={s.mobailTrItem__cell}>Data</span>
                          <span className={s.mobailTrItem__cell_value}>
                            {transactionDate}
                          </span>
                        </li>
                        <li className={s.mobailTrItem__row}>
                          <span className={s.mobailTrItem__cell}>Type</span>
                          <span className={s.mobailTrItem__cell_value}>
                            {type === "INCOME" ? "+" : "-"}
                          </span>
                        </li>
                        <li className={s.mobailTrItem__row}>
                          <span className={s.mobailTrItem__cell}>Category</span>
                          <span className={s.mobailTrItem__cell_value}>
                            {category}
                          </span>
                        </li>
                        <li className={s.mobailTrItem__row}>
                          <span className={s.mobailTrItem__cell}>Comment</span>
                          <span className={s.mobailTrItem__cell_value}>
                            {comment}
                          </span>
                        </li>
                        <li className={s.mobailTrItem__row}>
                          <span className={s.mobailTrItem__cell}>Amount</span>
                          <span
                            className={
                              type === "INCOME"
                                ? s.mobailTrItem__cell_value_INCOME
                                : s.mobailTrItem__cell_value_EXPENSE
                            }
                          >
                            {amount}
                          </span>
                        </li>
                        <li className={s.mobailTrItem__row}>
                          <span className={s.mobailTrItem__cell}>Balance</span>
                          <span className={s.mobailTrItem__cell_value}>
                            {balanceAfter}
                          </span>
                        </li>
                      </ul>
                      {/* <table className={s.mobailTrItem__table}>
                  <tbody>
                    <tr className={s.mobailTrItem__row}>
                      <td className={s.mobailTrItem__cell_1}>Data</td>
                      <td className={s.mobailTrItem__cell_2}>{transactionDate}</td>
                    </tr>
                    <tr className={s.mobailTrItem__row}>
                      <td className={s.mobailTrItem__cell_1}>Type</td>
                      <td className={s.mobailTrItem__cell_2}>{type}</td>
                    </tr>
                    <tr className={s.mobailTrItem__row}>
                      <td className={s.mobailTrItem__cell_1}>Category</td>
                      <td className={s.mobailTrItem__cell_2}>{category}</td>
                    </tr>
                    <tr className={s.mobailTrItem__row}>
                      <td className={s.mobailTrItem__cell_1}>Comment</td>
                      <td className={s.mobailTrItem__cell_2}>{comment}</td>
                    </tr>
                    <tr className={s.mobailTrItem__row}>
                      <td className={s.mobailTrItem__cell_1}>Amount</td>
                      <td className={s.mobailTrItem__cell_2}>{amount}</td>
                    </tr>
                    <tr className={s.mobailTrItem__row}>
                      <td className={s.mobailTrItem__cell_1}>Balance</td>
                      <td className={s.mobailTrItem__cell_2}>{balanceAfter}</td>
                    </tr>
                  </tbody>
                </table> */}
                    </li>
                  );
                }
              )}
            </ul>
          )}
          {matches.medium && (
            <div className={s.tableTrList}>
              <table className={s.table}>
                <thead className={s.tableHead}>
                  <tr>
                    <th className={s.tableHeader} scope="col">
                      Date
                    </th>
                    <th className={s.tableHeader} scope="col">
                      Type
                    </th>
                    <th className={s.tableHeader} scope="col">
                      Category
                    </th>
                    <th className={s.tableHeader} scope="col">
                      Comment
                    </th>
                    <th className={s.tableHeader} scope="col">
                      Amount
                    </th>
                    <th className={s.tableHeader} scope="col">
                      Balance
                    </th>
                  </tr>
                </thead>
              </table>
              <div className={s.tableScrollBox}>
                <table className={s.dataTable}>
                  <tbody className={s.tableBody}>
                    {data?.map(
                      ({
                        id,
                        balanceAfter,
                        category,
                        amount,
                        comment,
                        type,
                        transactionDate,
                      }) => {
                        return (
                          <tr className={s.tableRow} key={id}>
                            <td className={s.tableData}>
                              {transactionDate.replace(".20", ".")}
                            </td>
                            <td className={s.tableData}>
                              {type === "INCOME" ? "+" : "-"}
                            </td>
                            <td className={s.tableData}>{category}</td>
                            <td className={s.tableData}>{comment}</td>
                            <td
                              className={
                                type === "INCOME"
                                  ? s.tableData_INCOME
                                  : s.tableData_EXPENSE
                              }
                            >
                              {amount}
                            </td>
                            <td className={s.tableData}>{balanceAfter}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </Media>
  ) : (
    <div className={s.noTransactions}>
      <h2 className={s.noTransactions_title}>
        Your transactions will be shown here
      </h2>
      <IconContext.Provider
        value={{
          className: `${s.react__icon}`,
          style: {
            width: "140px",
            height: "130px",
          },
        }}
      >
        <MdAccountBalanceWallet />
      </IconContext.Provider>
    </div>
  );
};
export default HomeTab;
