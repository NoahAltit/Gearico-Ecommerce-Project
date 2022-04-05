import styled from "styled-components";

import { useContext } from "react";
import { DataContext } from "../../Hooks/useContext";

const SectionFive = () => {
  const { data } = useContext(DataContext);

  if (!data) {
    return <p></p>;
  }

  return (
    <Footer>
      <Wrapper>
        <Credits> © 2022 NAN Media. All Rights Reserved.</Credits>
      </Wrapper>
    </Footer>
  );
};

const Footer = styled.footer`
  height: 70px;
  font-family: "Raleway", sans-serif;
  position: relative;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
`;

const Credits = styled.p`
  text-align: center;
  margin: auto;
  color: grey;
`;

export default SectionFive;
