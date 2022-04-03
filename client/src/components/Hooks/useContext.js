import { createContext, useState, useEffect } from "react";
import usePersistedState from "./usePersistedState";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [cart, setCart] = usePersistedState([], "cart");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/get-items")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  // updating the CART total
  useEffect(() => {
    setTotal(0);
    cart.forEach((item) => setTotal((prevTotal) => prevTotal + item.itemTotal));
  }, [cart]);

  // calculating the ITEM total (price * quantity)
  const calcItemTotal = (price, quantity) => {
    price = Number(price.slice(1));
    const itemTotal = price * Number(quantity);
    return itemTotal;
  };

  return (
    <DataContext.Provider value={{ data, cart, setCart, total, calcItemTotal }}>
      {children}
    </DataContext.Provider>
  );
};