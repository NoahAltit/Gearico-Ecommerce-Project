import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../Hooks/AccountContext";

const SignInBox = ({ setPageDisplay }) => {
  const { setUserInfo } = useContext(AccountContext);
  const history = useHistory();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    let email = ev.target[0].value;
    let password = ev.target[1].value;
    fetch("http://localhost:4000/api/login-account", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUserInfo(data.data);
          history.push("/account");
        } else
          setPageDisplay({
            message: data.message,
            status: data.status,
            ref: "signin",
          });
      })
      .catch((err) => console.log("500 server error", err));
  };

  return (
    <>
      <Title>Sign In</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="email" name={"email"} placeholder={"Email"} required />
        <Input
          type="password"
          name={"password"}
          placeholder={"Password"}
          required
        />
        <LoginButton type="submit">Sign in</LoginButton>
      </Form>
      <Line />
      <SignUpLine>
        Not a member?{" "}
        <button onClick={() => setPageDisplay("signup")}>Sign up now</button>
      </SignUpLine>
      <ButtonDiv>
        <ForgotPassword onClick={() => setPageDisplay("password")}>
          Forgot your password?
        </ForgotPassword>
      </ButtonDiv>
    </>
  );
};

const Title = styled.p`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 3px;
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

const Line = styled.div`
  margin: 10px 0;
  height: 0;
  /* width: 320px; */
  border-bottom: 1px solid white;
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
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ForgotPassword = styled.button`
  font-size: 14px;
  font-weight: 700;
  color: white;
  /* outline: none; */
  background: none;
  border: none;
  cursor: pointer;
`;

export default SignInBox;
