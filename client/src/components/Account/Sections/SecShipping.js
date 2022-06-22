import styled from "styled-components";
import Input from "./Input";
import { useContext, useState } from "react";
import { AccountContext } from "../../Hooks/AccountContext";

const SecShipping = () => {
  const { userInfo, setUserInfo } = useContext(AccountContext);
  const [status, setStatus] = useState("Update");

  const handleUpdate = (ev) => {
    ev.preventDefault();
    setStatus("...");
    let updateObject = { ...userInfo };
    updateObject["shipping"] = {
      firstName: ev.target[0].value,
      lastName: ev.target[1].value,
      address: ev.target[2].value,
      city: ev.target[3].value,
      province: ev.target[4].value,
      postcode: ev.target[5].value,
      country: ev.target[6].value,
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
        <FormGroup>
          <Input
            name="firstName"
            type="text"
            placeholder="First name"
            defaultValue={userInfo?.shipping?.firstName}
            required
          />
          <Input
            name="lastName"
            type="text"
            placeholder="Last name"
            defaultValue={userInfo?.shipping?.lastName}
            required
          />
        </FormGroup>
        <Input
          name="address"
          type="address"
          placeholder="Address"
          defaultValue={userInfo?.shipping?.address}
          required
        />
        <FormGroup>
          <Input
            name="city"
            type="text"
            placeholder="City"
            defaultValue={userInfo?.shipping?.city}
            required
          />
          <Input
            name="province"
            type="text"
            placeholder="Province"
            defaultValue={userInfo?.shipping?.province}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="postcode"
            type="text"
            placeholder="Postal Code"
            defaultValue={userInfo?.shipping?.postcode}
            required
          />
          <Input
            name="country"
            type="text"
            placeholder="Country"
            defaultValue={userInfo?.shipping?.country}
            required
          />
        </FormGroup>
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

export default SecShipping;
