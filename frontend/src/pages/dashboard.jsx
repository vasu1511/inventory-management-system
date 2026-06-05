import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [data, setData] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard/");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">
        Inventory Dashboard
      </h1>

      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Total Products</h5>
              <h2>{data.total_products}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Total Customers</h5>
              <h2>{data.total_customers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Total Orders</h5>
              <h2>{data.total_orders}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Low Stock Products</h5>
              <h2>{data.low_stock_products}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;