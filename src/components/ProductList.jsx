import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import ProductRow from "./ProductRow";
import { RingLoader } from "react-spinners";
import { Header } from "./Header";
import styled from "styled-components";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = total > 1000 ? total * 0.1 : 0;
  const finalTotal = (total - discount).toFixed(2);

  return (
    <StyledWrapper>
      <Header />

      <StyledTable>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th># Available</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" style={{ padding: "2rem" }}>
                <RingLoader size={60} color="#36d7b7" />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="7">Something went wrong: {error}</td>
            </tr>
          ) : items.length > 0 ? (
            items.map((item) => <ProductRow key={item.id} {...item} />)
          ) : (
            <tr>
              <td colSpan="7">No products found.</td>
            </tr>
          )}
        </tbody>
      </StyledTable>

      <StyledLastDiv>
        <h2>Order summary</h2>
        <p>Total: {loading ? "Loading..." : error ? "—" : `$${finalTotal}`}</p>
      </StyledLastDiv>
    </StyledWrapper>
  );
};

export default ProductList;

const StyledWrapper = styled.div`
  text-align: center;
`;
const StyledTable = styled.table`
  margin: 0 auto;
  margin-top: 1.5rem;
`;
const StyledLastDiv = styled.div`
  margin-top: 2rem;
  h2 {
    font-weight: bold;
  }
`;
