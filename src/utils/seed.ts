interface setToLocalStorageProps {
  key: string;
  value: string;
}

const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (!value || value.trim() === "") {
    return undefined;
  }

  return value;
};

const setToLocalStorage = ({ key, value }: setToLocalStorageProps) => {
  localStorage.setItem(key, value ? value : "");

  return value;
};

export { getFromLocalStorage };
export { setToLocalStorage };
