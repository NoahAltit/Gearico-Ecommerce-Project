import { createContext, useState, useEffect } from "react";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    if (!userInfo) return;
    fetch("http://localhost:4000/api/get-orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserOrders(data.data);
      });
  }, [userInfo]);

  return (
    <AccountContext.Provider value={{ userInfo, setUserInfo, userOrders }}>
      {children}
    </AccountContext.Provider>
  );
};
