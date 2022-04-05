import { useContext, useEffect } from "react";
import styled from "styled-components";
import { DataContext } from "../../Hooks/useContext";
import { useHistory } from "react-router-dom";

const SectionThree = () => {
  const { data, getItems } = useContext(DataContext);
  const history = useHistory();

  useEffect(() => {
    getItems();
  }, []);

  if (!data) {
    return <p></p>;
  }
  const tenFeaturedItems = data;

  return (
    <Section>
      <Title>Featured Products</Title>
      <Wrapper>
        {tenFeaturedItems.map((item) => {
          return (
            <>
              <FeaturedProductsWrap
                key={"wrap" + item._id}
                onClick={() => history.push(`/products/id/${item._id}`)}
              >
                <ProductImg src={item.imageSrc} key={"img" + item._id} />
              </FeaturedProductsWrap>
            </>
          );
        })}
      </Wrapper>
    </Section>
  );
};

const Section = styled.section`
  padding: 7rem 0 2rem;
  height: auto;
  width: 100vw;
  font-family: "Raleway", sans-serif;
  display: grid;
  overflow: hidden;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  color: white;
  margin-left: auto;
  margin-right: auto;
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const FeaturedProductsWrap = styled.div`
  border: 5px turquoise solid;
  background-color: white;
  margin: 50px;
  text-align: center;
  border-radius: 50%;
  padding: 40px;
  transition: transform 0.7s;

  &:hover {
    opacity: 1;
    top: 80%;
    transform: scale(1.08);
    cursor: pointer;
  }

  &:hover > img {
    opacity: 1;
    transform: scale(1.4);
  }
`;

const ProductImg = styled.img`
  max-width: 263px;
  width: 150px;
  height: 150px;
  border-radius: 40%;
  opacity: 0.9;
  transition: 0.5s;
`;

export default SectionThree;
