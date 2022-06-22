import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { DataContext } from "../Hooks/useContext";

const SingleProduct = ({ modal, setModal }) => {
  const [productInfo, setProductInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { setCart, cart, calcItemTotal } = useContext(DataContext);
  const history = useHistory();

  // getting product id from params
  const params = useParams().productId;
  const productId = params || modal;

  // fetching the product info
  useEffect(() => {
    fetch(`http://localhost:4000/api/get-item/${productId}`)
      .then((res) => res.json())
      .then((data) => setProductInfo(data.data))
      .catch((err) => console.log("error:", err));
  }, [productId]);

  // updating the cart with product info, quanity and total price
  const handleClick = () => {
    // checking the cart to see if the item is already there
    let dupeIndex = 0;
    const duplicateItem = cart.filter((item, index) => {
      console.log("index in here?", index);
      if (item.productInfo._id === productInfo._id) {
        dupeIndex = index;
        return item;
      }
    });

    let newCart = [...cart];
    // if item is a duplicate, updating the quantity only
    if (duplicateItem.length > 0) {
      newCart[dupeIndex].qnt =
        cart[dupeIndex].qnt + Number(quantity) >
        cart[dupeIndex].productInfo.numInStock
          ? cart[dupeIndex].productInfo.numInStock
          : cart[dupeIndex].qnt + Number(quantity);
    } else {
      // else, adding the new item to the "cart" array
      newCart.push({
        productInfo,
        qnt: Number(quantity),
        itemTotal: calcItemTotal(productInfo.price, quantity),
      });
    }
    setCart(newCart);
    history.push("/cart");
  };

  if (!modal && !params) return null;

  // returning a loading message until server has responded with product data
  if (!productInfo) return <div>Loading...</div>;

  // creating an array of quantity in stock for the dropdown to map over
  let numArray = [];
  for (let i = 1; i <= productInfo.numInStock; i++) {
    numArray.push(i);
  }

  // closing the modal if user clicks outside the main Wrapper
  // if params were used to navigate here, returning to the Products page
  const handleModalClose = () => {
    if (params) history.push("/products");
    if (modal) setModal(null);
  };

  return (
    <Modal onClick={handleModalClose}>
      <Wrapper onClick={(ev) => ev.stopPropagation()}>
        <ItemContainer>
          <LeftDiv>
            <ProductImg src={productInfo.imageSrc} />
          </LeftDiv>
          <RightDiv>
            <Title>{productInfo.name}</Title>
            <InfoBox>
              <h4>From: {productInfo.companyName}</h4>
              <h4>Category: {productInfo.category}</h4>
              <Price>
                ${calcItemTotal(productInfo.price, quantity).toFixed(2)}
              </Price>
            </InfoBox>
            <QuantityBox>
              <p>Quantity:</p>
              <select
                placeholder="Quantity"
                onChange={(ev) => setQuantity(ev.target.value)}
              >
                {numArray.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </QuantityBox>
            {productInfo.numInStock > 0 ? (
              <BuyButton onClick={handleClick}>Add to Cart</BuyButton>
            ) : (
              <BuyButton disabled={true}>Out of stock</BuyButton>
            )}
          </RightDiv>
        </ItemContainer>
      </Wrapper>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(55, 55, 55, 0.9);
  z-index: 200;
`;

const Wrapper = styled.div`
  border-radius: 10px;
  width: 750px;
  height: 350px;
  background-color: #f8f8ff;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.6);
  transition: all 0.3s;

  /* &:hover {
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.6),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  } */
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftDiv = styled.div`
  margin: 0 20px;
  padding: 30px;
  width: 45%;
  text-align: center;
  float: left;
`;

const ProductImg = styled.img`
  padding: 30px;
  float: left;
  height: 240px;
  width: 240px;
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 300px;
`;

const Title = styled.p`
  color: #515151;
  margin: 30px 0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 10px;
`;

const Price = styled.p`
  color: #515151;
  font-weight: 300;
  padding-top: 15px;
  padding-bottom: 15px;
  margin: 0;
  font-size: 26px;
  font-weight: 300;
`;

const InfoBox = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #727272;
  margin: 0;

  > h4 {
    font-size: 15px;
  }
`;

const BuyButton = styled.button`
  outline: 0;
  border: 0;
  background: none;
  border: 1px solid #d9d9d9;
  padding: 8px 0px;
  color: #515151;
  text-transform: uppercase;
  width: 125px;
  font-family: inherit;
  margin-right: 5px;
  transition: all 0.2s ease;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    border: 1px solid rgb(120, 120, 255);
    color: rgb(120, 120, 255);
    cursor: pointer;
  }

  &:active {
    transform: scale(0.97);
  }
`;

const QuantityBox = styled.div`
  > select {
    outline: 0;
    border: 0;
    background: none;
    border: 1px solid #d9d9d9;
    padding: 8px 0px;
    color: #515151;
    text-transform: uppercase;
    width: 125px;
    font-family: inherit;
    margin-right: 5px;
    transition: all 0.3s ease;
    font-size: 15px;
    font-weight: 500;

    display: inline-block;
    position: absolute;
    margin-left: 140px;
  }

  > select:focus {
    border: 1px solid rgb(120, 120, 255);
    color: black;
    cursor: pointer;
  }

  > p {
    position: relative;
    left: 140px;
    bottom: 5px;
    color: #515151;
  }
`;

export default SingleProduct;
