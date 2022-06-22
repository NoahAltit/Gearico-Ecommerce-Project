import { useEffect, useState } from "react";
import styled from "styled-components";
import SingleProduct from "../SingleProduct/SingleProduct";

// import ent from "../../assets/SidebarCats/Entertainment.png";
import { TiThMenuOutline } from "react-icons/ti";
import Sidebar from "./Sidebar";
import ProductPreview from "./ProductPreview";
import PageSelect from "./PageSelect";
import { useParams } from "react-router-dom";

const Products = () => {
  const [catSelection, setCatSelection] = useState(null);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(null);

  const catParam = useParams().category;
  useEffect(() => {
    setCurrentPage(1);
    setCatSelection(catParam);
  }, [catParam]);

  // setting the start point for the product fetch, based on the selected page #
  const startPoint = currentPage * 10 - 10;

  // setting the number of items displayed per page
  const numItems = 10;

  useEffect(() => {
    // fetching category-specific items if a category has been selected...
    if (catSelection || catParam) {
      fetch(
        `http://localhost:4000/api/get-items/cat/${catSelection}?start=${startPoint}&limit=${numItems}`
      )
        .then((res) => res.json())
        .then((data) => setProducts(data.data))
        .catch((err) => console.log("error:", err));
    } else {
      // ...otherwise, fetching all items
      fetch(
        `http://localhost:4000/api/get-items?start=${startPoint}&limit=${numItems}`
      )
        .then((res) => res.json())
        .then((data) => setProducts(data.data))
        .catch((err) => console.log("error:", err));
    }
  }, [currentPage, catSelection]);

  if (!products) return <div>Loading...</div>;

  return (
    <>
      <Wrapper>
        {sidebarToggle ? (
          <Sidebar
            setSidebarToggle={setSidebarToggle}
            setCurrentPage={setCurrentPage}
            setCatSelection={setCatSelection}
            catSelection={catSelection}
          />
        ) : (
          <SidebarButton onClick={() => setSidebarToggle(true)}>
            <TiThMenuOutline /> <span>Categories</span>
          </SidebarButton>
        )}
        <MainDiv>
          <TitleDiv cat={catSelection}>
            <h1>{catSelection || "Products"}</h1>
            {/* <img src={ent} alt="" /> */}
          </TitleDiv>
          <ProductsGrid>
            {products.map((product) => {
              return (
                <ProductPreview
                  productInfo={product}
                  setModal={setModal}
                  key={product._id}
                />
              );
            })}
          </ProductsGrid>
          <PageDiv>
            <PageSelect
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              numProducts={products.length}
            />
          </PageDiv>
        </MainDiv>
      </Wrapper>
      <SingleProduct modal={modal} setModal={setModal} />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 100%;
`;

const TitleDiv = styled.div`
  padding: 100px 0;
  width: 100%;
  background-image: linear-gradient(147deg, #000000 0%, #2c3e50 74%);
  letter-spacing: 5px;
  text-transform: uppercase;
`;

const SidebarButton = styled.button`
  background: none;
  font-weight: 700;
  height: auto;
  cursor: pointer;
  position: absolute;
  top: 200px;
  outline: none;
  border: none;
  font-size: 20px;
  display: flex;
  align-content: center;
  flex-direction: row;
  align-items: center;

  > span {
    font-size: 15px;
    margin-left: 10px;
  }
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* flex: 5 0 20%; */
`;

const PageDiv = styled.div``;

export default Products;
