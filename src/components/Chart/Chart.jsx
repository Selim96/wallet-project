import s from "./Chart.module.scss";
import React from "react";
import { useSelector } from "react-redux";
import financeSelectors from "redux/finance/finance-selectors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const dataNull = {
  labels: [],
  datasets: [
    {
      label: "# of Votes",
      data: [0.001],
      backgroundColor: ["#ff6596"],
      hoverOffset: 0,
      borderColor: [],
      borderWidth: 0,
    },
  ],
};

const Chart = ({ data, expenseSummaryChart, show }) => {
  const isLoading = useSelector(financeSelectors.getLoading);
  return (
    <div className={s.wrapper__chart}>
      <h2 className={s.title}>Statistics</h2>

      {show ? (
        <div className={s.wrapper__doughnut}>
          {!isLoading && (
            <>
              <Doughnut
                data={data}
                options={{
                  maintainAspectRatio: false,
                  cutoutPercentage: 90,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
              <div className={s.balance__wrapper}>
                <span className={s.symbol}>&#8372;</span>
                {expenseSummaryChart}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={s.wrapper__doughnut}>
          {!isLoading && (
            <>
              <Doughnut
                data={dataNull}
                options={{
                  maintainAspectRatio: false,
                  cutoutPercentage: 90,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      enabled: false,
                    },
                  },
                }}
              />

              <div className={s.balance__wrapper}>
                <span className={s.symbol}>&#8372;</span>
                {expenseSummaryChart}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default Chart;
