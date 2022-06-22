import styled from "styled-components";
import OrderItem from "./OrderItem";

const SecOrderInfo = ({ userOrders }) => {
  return (
    <Wrapper>
      {userOrders?.map((order) => {
        return <OrderItem orderInfo={order} key={order._id} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 0;
`;

export default SecOrderInfo;
