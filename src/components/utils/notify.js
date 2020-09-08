import { toast } from 'react-toastify';

export const notify = (type) => {
  const toastObject = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  if (type === 'success') {
    toast.success('Transaction added!', {
      toastObject,
    });
  } else if (type === 'payment') {
    toast.info('Montly Payment Added!', {
      toastObject,
    });
  } else {
    toast.error('Something went wrong :<', {
      toastObject,
    });
  }
};
