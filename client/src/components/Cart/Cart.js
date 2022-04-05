import { useContext } from "react";
import { DataContext } from "../Hooks/useContext";
import { AccountContext } from "../Hooks/AccountContext";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { userInfo } = useContext(AccountContext);
  const { cart, setCart, calcItemTotal, total } = useContext(DataContext);
  const history = useHistory();

  // updating the quantity of a product
  const updateQuantity = (ev, price, index) => {
    let updatedCart = [...cart];
    updatedCart[index].qnt = ev.target.value;
    updatedCart[index].itemTotal = calcItemTotal(price, ev.target.value);
    setCart(updatedCart);
  };

  // removing a product from the cart
  const removeItem = (ev, index) => {
    let updatedCart = cart.filter((item, cartIndex) => cartIndex !== index);
    setCart(updatedCart);
  };

  return (
    <Wrapper>
      <MainContainer>
        {cart.length > 0 &&
          cart.map((item, index) => {
            return (
              <CartItem
                item={item}
                index={index}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
                key={item.productInfo._id}
              />
            );
          })}

        <CartTotalDiv>
          <SpacerDivLeft />
          <CartTotal>${total.toFixed(2)}</CartTotal>
        </CartTotalDiv>

        <CheckoutButtonDiv>
          <SpacerDivLeft />
          <CheckoutDivRight>
            {userInfo ? (
              <CheckoutButton
                disabled={cart.length > 0 ? false : true}
                onClick={() => history.push("/checkout")}
              >
                Checkout
              </CheckoutButton>
            ) : (
              <>
                <CheckoutButton
                  disabled={cart.length > 0 ? false : true}
                  onClick={() => history.push("/checkout")}
                >
                  Guest Checkout
                </CheckoutButton>
                <SignInLink to={"/signin"}>
                  Sign in/create an account
                </SignInLink>
              </>
            )}
          </CheckoutDivRight>
        </CheckoutButtonDiv>
      </MainContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  font-family: "Open Sans", sans-serif;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpacerDivLeft = styled.div`
  width: 960px;
`;

const CartTotalDiv = styled.div`
  display: flex;
`;
const CartTotal = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-end;
`;

const CheckoutButtonDiv = styled.div`
  display: flex;
`;

const CheckoutDivRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckoutButton = styled.button`
  margin: 10px 0;
  font-size: 16px;
  font-weight: 700;
  padding: 8px 50px;
  background-color: #00416a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
  }
`;

const SignInLink = styled(Link)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: 300;
`;

export default Cart;
