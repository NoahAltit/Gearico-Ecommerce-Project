import styled from "styled-components";
import Input from "./Input";
import { useContext, useState } from "react";
import { AccountContext } from "../../Hooks/AccountContext";

const SecBilling = () => {
  const { userInfo, setUserInfo } = useContext(AccountContext);
  const [status, setStatus] = useState("Update");

  const handleUpdate = (ev) => {
    ev.preventDefault();
    setStatus("...");
    let updateObject = { ...userInfo };
    updateObject["billing"] = {
      fullName: ev.target[0].value,
      cardNo: ev.target[1].value,
      expMonth: ev.target[2].value,
      expYear: ev.target[3].value,
      cvv: ev.target[4].value,
    };

    fetch("http://localhost:4000/api/update-account", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObject),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUserInfo(data.data);
          setStatus("Updated!");
        } else setStatus("Try Again");
      })
      .catch((err) => console.log("error:", err));
  };

  return (
    <Wrapper>
      <FormContent onSubmit={(ev) => handleUpdate(ev)}>
        <Input
          name="fullName"
          type="text"
          placeholder="Cardholder Name"
          defaultValue={userInfo?.billing?.fullName}
          required
        />
        <Input
          name="cardNo"
          type="text"
          placeholder="Card Number"
          defaultValue={userInfo?.billing?.cardNo}
          required
        />
        <FormGroup>
          <Input
            name="expMonth"
            type="text"
            placeholder="MM"
            defaultValue={userInfo?.billing?.expMonth}
            required
          />
          <Input
            name="expYear"
            type="text"
            placeholder="YY"
            defaultValue={userInfo?.billing?.expYear}
            required
          />
        </FormGroup>
        <Input
          name="cvv"
          type="text"
          placeholder="CVC / CVV"
          defaultValue={userInfo?.billing?.cvv}
          required
        />
        <Button type="submit">{status}</Button>
      </FormContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 40px 20px;
  padding: 0 20px;
`;
const FormContent = styled.form``;

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > div {
    flex: 1 0 auto;
    width: 48%;

    &:first-child {
      margin-right: 6px;
    }
  }
`;

const Button = styled.button`
  margin: 0.2rem 0;
  width: 6rem;
  display: inline-block;
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s ease;
  cursor: pointer;
  &:hover {
    background: slateblue;
  }
`;

export default SecBilling;
