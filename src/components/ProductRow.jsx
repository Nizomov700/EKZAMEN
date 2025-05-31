import { useDispatch } from "react-redux";
import { increment, decrement } from "../store/productsSlice";
const ProductRow = ({ id, name, available, price, quantity }) => {
  const dispatch = useDispatch();
  const total = (price * quantity).toFixed(2);
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{available}</td>
      <td>${price.toFixed(2)}</td>
      <td>
        <span style={{ margin: "0 8px" }}>{quantity}</span>
      </td>
      <td>${total}</td>
      <td>
        <button onClick={() => dispatch(increment(id))}>+</button>
        <button
          onClick={() => dispatch(decrement(id))}
          style={{ marginLeft: "4px" }}
        >
          -
        </button>
      </td>
    </tr>
  );
};
export default ProductRow;
