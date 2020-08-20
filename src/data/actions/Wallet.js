import fire from 'firebase/fire';

export const Wallet = (money) => {
  return {
    type: 'ADD_MONEY',
    money: money,
  };
};

// export const addTransaction = (test) => {
//   return (dispatch, getState, { getFirebase, getFirestore }) => {
//     const fire = getFirestore();
//     fire
//       .collection('test')
//       .add({
//         ...test,
//         name: 'Konrad',
//         authorId: 12345,
//       })
//       .then(() => {
//         dispatch({ type: 'ADD_TRANSACTION', test });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };
