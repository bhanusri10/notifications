import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [stockLevel, setStockLevel] = useState(10);
  const [orders, setOrders] = useState([
    { id: 1, status: 'pending', dueDate: '2025-01-10' },
    { id: 2, status: 'overdue', dueDate: '2025-01-02' },
  ]);

  const checkStockLevel = () => {
    if (stockLevel <= 5) {
      toast.error("Low stock alert! Please reorder soon.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const checkOrders = () => {
    const currentDate = new Date();
    orders.forEach(order => {
      const dueDate = new Date(order.dueDate);
      if (order.status === 'pending') {
        toast.info(`Order #${order.id} is pending. Due by ${dueDate.toDateString()}.`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      } else if (order.status === 'overdue' && dueDate < currentDate) {
        toast.error(`Order #${order.id} is overdue!`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    });
  };

  useEffect(() => {
    checkStockLevel();
    checkOrders();
  }, []);

  return (
    <div className="App">
      <h1>Telecom Inventory Management</h1>

      <div>
        <p>Current Stock Level: {stockLevel}</p>
        <button onClick={checkStockLevel}>Check Stock Level</button>
        <button onClick={() => setStockLevel(stockLevel - 1)}>Reduce Stock</button>
      </div>

      <div>
        <h3>Orders</h3>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Order #{order.id} - Status: {order.status} (Due: {order.dueDate})
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
