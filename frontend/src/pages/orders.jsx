import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  const fetchData = async () => {
    try {
      const customerRes = await api.get("/customers/");
      const productRes = await api.get("/products/");
      const orderRes = await api.get("/orders/");

      setCustomers(customerRes.data);
      setProducts(productRes.data);
      setOrders(orderRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      await api.post("/orders/", {
        customer_id: Number(formData.customer_id),
        items: [
          {
            product_id: Number(formData.product_id),
            quantity: Number(formData.quantity),
          },
        ],
      });

      setFormData({
        customer_id: "",
        product_id: "",
        quantity: "",
      });

      fetchData();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.detail ||
          "Failed to create order"
      );
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Failed to delete order");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Order Management
      </h2>

      <form onSubmit={createOrder}>
        <select
          className="form-select mb-2"
          value={formData.customer_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              customer_id: e.target.value,
            })
          }
          required
        >
          <option value="">
            Select Customer
          </option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.full_name}
            </option>
          ))}
        </select>

        <select
          className="form-select mb-2"
          value={formData.product_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              product_id: e.target.value,
            })
          }
          required
        >
          <option value="">
            Select Product
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
              {" "}
              (Stock:
              {" "}
              {product.stock_quantity})
            </option>
          ))}
        </select>

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({
              ...formData,
              quantity: e.target.value,
            })
          }
          required
        />

        <button
          type="submit"
          className="btn btn-success"
        >
          Create Order
        </button>
      </form>

      <hr />

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{order.total_amount}</td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteOrder(order.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;