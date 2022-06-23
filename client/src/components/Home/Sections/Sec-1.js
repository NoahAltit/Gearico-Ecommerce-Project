import { useContext } from "react";
import styled from "styled-components";
import sectionOneBg from "../../../assets/SecOne.jpg";
import { DataContext } from "../../Hooks/useContext";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import Load from "../../Loader/Load";

const SectionOne = () => {
  const { data } = useContext(DataContext);

  if (!data) {
    return <Load />;
  }

  return (
    <Section>
      <Image src={sectionOneBg} />

      <HomeContainer>
        <HomeData>
          <Subtitle>A store like no other</Subtitle>
          <Title>Gearico</Title>
          <Button href="/products">Shop Now</Button>
        </HomeData>

        <SocialInfo>
          <SocialLink
            className="fb"
            target="_blank"
            href="https://www.facebook.com/"
          >
            <BsFacebook />
          </SocialLink>
          <SocialLink
            className="ig"
            target="_blank"
            href="https://www.instagram.com/"
          >
            <BsInstagram />
          </SocialLink>
          <SocialLink
            className="tw"
            target="_blank"
            href="https://twitter.com/"
          >
            <BsTwitter />
          </SocialLink>
        </SocialInfo>
      </HomeContainer>
    </Section>
  );
};

const Section = styled.section`
  max-height: 75vh;
  font-family: "Raleway", sans-serif;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const HomeContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  position: relative;
  align-content: center;
  row-gap: 3rem;
  height: 90vh;
  margin: 0 auto;
  grid-template-rows: 2fr 0.5fr;
  max-width: 1024px;
`;

const HomeData = styled.div`
  align-self: flex-end;
`;

const Subtitle = styled.span`
  display: block;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: white;
`;

const Title = styled.h1`
  text-align: start;
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 2.5rem;
  color: white;
`;

const Button = styled.a`
  display: inline-block;
  background-color: black;
  border-radius: 3px;
  color: white;
  padding: 1rem 2rem;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s ease;

  &:hover {
    background: slateblue;
  }
`;

const SocialInfo = styled.div`
  display: flex;
  row-gap: 1.5rem;
  flex-direction: row;
  align-self: flex-end;
  margin-bottom: 3rem;
  column-gap: 2.5rem;
`;

const SocialLink = styled.a`
  font-size: 1.2rem;
  width: max-content;
  color: white;
  text-decoration: none;
  margin-bottom: 20%;
  transition: 0.3s ease-in-out;

  &.fb:hover {
    color: #4267b2;
  }

  &.ig:hover {
    color: #8a3ab9;
  }

  &.tw:hover {
    color: #00acee;
  }
`;

export default SectionOne;
