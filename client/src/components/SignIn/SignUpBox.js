import styled from "styled-components";
import { useState } from "react";

const SignUpBox = ({ setPageDisplay }) => {
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setErrorMsg(false);
    if (ev.target[1].value !== ev.target[2].value) {
      return setErrorMsg(true);
    }
    let email = ev.target[0].value;
    let password = ev.target[1].value;
    fetch("http://localhost:4000/api/create-account", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setPageDisplay({
          message: data.message,
          status: data.status,
          email: data.data,
          ref: "signup",
        })
      )
      .catch((err) =>
        setPageDisplay({ message: "Server error", ref: "signup" })
      );
  };

  return (
    <>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="email" name={"email"} placeholder={"Email"} required />
        <Input
          type="password"
          name={"password"}
          placeholder={"Choose a password"}
          required
        />
        <Input
          type="password"
          name={"password"}
          placeholder={"Confirm your password"}
          required
        />
        <LoginButton type="submit">Create an account</LoginButton>
      </Form>
      <Line />
      <SignUpLine>
        Already a member?{" "}
        <button onClick={() => setPageDisplay("signin")}>
          Click here to sign in
        </button>
      </SignUpLine>
      <ErrorMsg errorMsg={errorMsg}>Passwords don't match</ErrorMsg>
    </>
  );
};

const Title = styled.p`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  > * {
    margin: 10px 0;
  }
`;

const Input = styled.input`
  font-size: 16px;
  opacity: 0.5;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  outline: none;

  ::placeholder {
    color: #e5e5e5;
  }
`;

const Line = styled.div`
  height: 0;
  margin: 10px 0;
  /* width: 320px; */
  border-bottom: 1px solid white;
`;

const LoginButton = styled.button`
  display: inline-block;
  background-color: black;
  border: none;
  border-radius: 3px;
  color: white;
  padding: 0.8rem 1.7rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s ease;
  cursor: pointer;
  &:hover {
    background: slateblue;
  }
`;

const SignUpLine = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  z-index: 2;
  > button {
    font-size: 14px;
    font-weight: 700;
    color: white;
    /* outline: none; */
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const ErrorMsg = styled.div`
  display: ${({ errorMsg }) => (errorMsg ? "flex" : "none")};
  justify-content: center;
  color: rgb(139, 0, 0);
  margin-top: 20px;
  font-weight: 700;
  font-size: 20px;
`;

export default SignUpBox;
