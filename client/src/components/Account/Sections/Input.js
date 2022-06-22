import styled, { keyframes } from "styled-components";

const Input = ({ name, type, placeholder, defaultValue, section }) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{placeholder}</label>
      <input
        type={type}
        name={name}
        section={section}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

const borderColor = keyframes`
0% {
  border: 2px solid blueviolet;
} 

20% {
  border: 2px solid orange;
}

40% {
  border: 2px solid yellow;
}

60% {
  border: 2px solid green;
}

80% {
  border: 2px solid blue;
}

100% {
  border: 2px solid indigo;
}
`;

const Wrapper = styled.div`
  margin-bottom: 6px;
  width: 100%;
  position: relative;

  label {
    display: none;
  }

  input {
    border-radius: 8px;
    border: 1px solid #6c7a89;
    background: none;
    box-sizing: border-box;
    color: black;
    font-size: 15px;
    font-weight: 500;
    height: 36px;
    padding: 8px 12px 10px 12px;
    width: 100%;
    outline: none;
    transition: all 0.1s linear infinite;

    &:focus {
      animation: ${borderColor} 3s linear infinite;
    }
  }
`;

export default Input;
