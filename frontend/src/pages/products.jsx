import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock_quantity: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock_quantity: product.stock_quantity,
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
      };

      if (editingId) {
        await api.put(
          `/products/${editingId}`,
          payload
        );
      } else {
        await api.post(
          "/products/",
          payload
        );
      }

      setEditingId(null);

      setFormData({
        name: "",
        sku: "",
        price: "",
        stock_quantity: "",
      });

      fetchProducts();

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.detail ||
        "Operation failed"
      );
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      name: "",
      sku: "",
      price: "",
      stock_quantity: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Product Management
      </h2>

      <form onSubmit={saveProduct}>
        <div className="mb-2">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            className="form-control"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="stock_quantity"
            placeholder="Stock Quantity"
            className="form-control"
            value={formData.stock_quantity}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          {editingId
            ? "Update Product"
            : "Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th width="180">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.price}</td>
              <td>
                {product.stock_quantity}
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    handleEdit(product)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteProduct(product.id)
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

export default Products;