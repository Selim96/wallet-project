import { allMonths } from "assets/const";

import normalizeAmount from "services/normalizeAmount";

const getTotalBalance = (state) => state.finance.totalBalance;
const getTransactionsData = (state) => state.finance.data;
const getCategories = (state) => state.finance.categories;
const getSummary = (state) => state.finance.summary;
const getError = (state) => state.finance.error;
const getLoading = (state) => state.finance.loading;

const getBalance = (state) => normalizeAmount(getTotalBalance(state));

const getFilteredData = (state) => {
  const sortedData = getTransactionsData(state)
    ?.map((data) => ({
      ...data,
      transactionDate: new Date(data.transactionDate),
    }))
    .sort((a, b) => b.transactionDate - a.transactionDate);
  const categories = getCategories(state)?.reduce((acc, cur) => {
    return { ...acc, [cur.id]: cur.name };
  }, {});

  return normalizeData(sortedData, categories);
};

function normalizeData(data, categories) {
  return data?.map((data) => {
    const day = data.transactionDate.getDate().toString().padStart(2, "0");
    const month = (data.transactionDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const year = data.transactionDate.getFullYear();
    const amount = data.amount < 0 ? -data.amount : data.amount;
    const updatedData = {
      ...data,
      transactionDate: `${day}.${month}.${year}`,
      amount: normalizeAmount(amount),
      balanceAfter: normalizeAmount(data.balanceAfter),
    };
    return categories
      ? {
          ...updatedData,
          category: categories[data.categoryId],
        }
      : updatedData;
  });
}

const getPeriodForStatistic = (state) => {
  // const uniqueMonths = getTransactionsData(state);
  //   ?.map((obj) => obj.transactionDate.slice(5, 7))
  //   .reduce((acc, month) => (!acc.includes(month) ? [...acc, month] : acc), []);
  // if (!uniqueMonths) {
  //   return {};
  // }
  // const sortMonth = uniqueMonths
  //   .map((string) => Number(string))
  //   .sort((a, b) => a - b);
  // const stringMonths = sortMonth.map((number) => allMonths[number - 1]);

  const uniqueYears =
    getTransactionsData(state)
      ?.map((obj) => obj.transactionDate?.slice(0, 4))
      .reduce(
        (acc, year) => (!acc.includes(year) ? [...acc, year] : acc),
        []
      ) || [];
  const sortYears = uniqueYears
    ?.map((string) => Number(string))
    ?.sort((a, b) => a - b);
  const period = { months: allMonths, years: sortYears };
  return period;
};

const getAllTransactionsForStat = (state) => {
  const categoryNew = getCategories(state);
  const objectSummary = getSummary(state) || {};
  const { categoriesSummary, expenseSummary, incomeSummary } = objectSummary;
  const newExpenseSummary = String(normalizeAmount(expenseSummary * -1));
  const newIncomeSummary = normalizeAmount(incomeSummary);
  const arrayCategoriesSummary = categoriesSummary
    ?.filter((category) => category.type === "EXPENSE")
    .map((category) => {
      const color = categoryNew?.find(
        (object) => object.name === category.name
      ).backgroundColor;
      const number = normalizeAmount(category.total * -1);
      const object = {
        ...category,
        total: String(number),
        backgroundColor: color,
      };
      return object;
    });
  return {
    arrayCategoriesSummary,
    newExpenseSummary,
    newIncomeSummary,
  };
};

const getDataAllSummaryForChart = (state) => {
  const dataAllSummaryForChart = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [],
        hoverOffset: 0,
        borderColor: [],
        borderWidth: 0,
      },
    ],
  };
  const categoryNew = getCategories(state);
  const objectSummary = getSummary(state) || {};

  const { categoriesSummary } = objectSummary;
  categoriesSummary
    ?.filter((category) => category.type === "EXPENSE")
    .forEach((category) => {
      const color = categoryNew?.find(
        (object) => object.name === category.name
      ).backgroundColor;
      const number = category.total * -1;
      dataAllSummaryForChart.labels.push(category.name);
      dataAllSummaryForChart.datasets[0].backgroundColor.push(color);
      dataAllSummaryForChart.datasets[0].data.push(number);
    });
  return dataAllSummaryForChart;
};

const financeSelectors = {
  getPeriodForStatistic,
  getAllTransactionsForStat,
  getDataAllSummaryForChart,
  getTotalBalance,
  getBalance,
  getTransactionsData,
  getCategories,
  getFilteredData,
  getSummary,
  getError,
  getLoading,
};

export default financeSelectors;
