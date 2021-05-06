import { useState } from "react";

const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const setMessageTimeout = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  return [errorMessage, setMessageTimeout];
};

export default useErrorMessage;