import { toast, Slide } from 'react-toastify';

const dispatchToast = (type, message) => {
  toast[type](message, {
    position: 'top-right',
    transition: Slide,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });
};

export default dispatchToast;
