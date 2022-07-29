const getIsModalAddTransaction = (state) =>
  state.global.isModalAddTransactionOpen;
const getIsModalLogout = (state) => state.global.isModalLogoutOpen;
const getIsLoading = (state) => state.global.isLoading;

const globalSelectors = {
  getIsModalAddTransaction,
  getIsModalLogout,
  getIsLoading,
};

export default globalSelectors;
