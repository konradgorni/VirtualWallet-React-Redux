export const setWallet = (salary, currency) => {
  return {
    type: 'SET_WALLET',
    salary: salary,
    currency: currency,
  };
};
