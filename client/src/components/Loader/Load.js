import { BiLoaderCircle } from "react-icons/bi";
import styled, { keyframes } from "styled-components";

const Load = () => {
  return (
    <>
      <Wrapper>
        <BiLoaderCircle className="icon" />
      </Wrapper>
    </>
  );
};

const loading = keyframes`
from {
    transform: rotate(0);
}
to {
    transform: rotate(360deg);
}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    text-align: center;
    font-size: 70px;
    animation: ${loading} 1000ms infinite;
  }
`;

export default Load;
