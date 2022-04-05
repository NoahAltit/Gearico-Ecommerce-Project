import styled from "styled-components";

import { useContext } from "react";
import { DataContext } from "../../Hooks/useContext";

import amazon from "../../../assets/Sponsors/sponsors2.png";
import shopify from "../../../assets/Sponsors/sponsors3.png";
import paypal from "../../../assets/Sponsors/sponsors4.png";
import slack from "../../../assets/Sponsors/sponsors5.png";

const SectionFour = () => {
  const { data } = useContext(DataContext);

  if (!data) {
    return <p></p>;
  }

  return (
    <Section>
      {/* <Title>Find Us On</Title> */}
      <Wrapper>
        <SponsorWrap target="_blank" href="https://www.amazon.com/">
          <SponsorImg src={amazon} alt="Amazon" className="sponsor__img" />
        </SponsorWrap>
        <SponsorWrap target="_blank" href="https://www.shopify.com/">
          <SponsorImg src={shopify} alt="Shopify" className="sponsor__img" />
        </SponsorWrap>
        <SponsorWrap target="_blank" href="https://www.paypal.com/">
          <SponsorImg src={paypal} alt="PayPal" className="sponsor__img" />
        </SponsorWrap>
        <SponsorWrap target="_blank" href="https://www.slack.com/">
          <SponsorImg src={slack} alt="Slack" className="sponsor__img" />
        </SponsorWrap>
      </Wrapper>
    </Section>
  );
};

const Section = styled.section`
  padding: 50px 0;
`;

const Wrapper = styled.div`
  display: grid;
  gap: 1.5rem;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  justify-items: center;
  row-gap: 3.5rem;
`;

// const Title = styled.h2``;

const SponsorWrap = styled.a``;

const SponsorImg = styled.img`
  width: 90px;
  filter: invert(0.7);
  transition: 0.2s ease-in;

  &:hover {
    opacity: 0.5;
  }
`;

export default SectionFour;
