import { db } from 'firebase/fire';

export const fireStoreFetch = async (idUser) => {
  const docRef = db.collection('users').doc(idUser);
  return docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log('No such document!');
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });
};
