import React, { useEffect, useState } from "react";
import OrderList from "../../stores/OrderList";
import CardItem from "../Card_Item/CardItem";

const OrdersDetails: React.FC = () => {
  const { orders } = OrderList();
  const [tax, setTax] = useState<number>(0);
  const [beforeTax, setBeforeTax] = useState<number>(0);
  const [TotalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    calculateTotalPrice();
    console.log(orders);
  });
  const calculateTotalPrice = () => {
    var total = 0;
    orders.forEach((order) => {
      total += order.item.price * order.count;
    });
    setTotalPrice(parseFloat(total.toFixed(2)));
    setTax(parseFloat((total * 0.15).toFixed(2)));
    setBeforeTax(parseFloat((TotalPrice - tax).toFixed(2)));
  };

  return (
    <>
      <div className="modal-header">
        <h2>Orders List</h2>
      </div>
      <div className="modal-body">
        {orders.map((order) => {
          return (
            <CardItem
              item={{ ...order.item }}
              count={order.count}
              key={order.item.id}
            />
          );
        })}
        {orders.length == 0 && <p> The Order List is Empty</p>}
      </div>
      <div className="modal-footer">
        <div className="row justify-content-center mt-3">
          <div className="col-12">
            <div className="modal-footer-item">
              <div className="row justify-content-between">
                <p className="col-6 ">SubTotal</p>
                <div className="col-6 text-end">{beforeTax}</div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div>
              <div className="row justify-content-between">
                <p className="col-6 ">Tax</p>
                <div className="col-6 text-end">{tax}</div>
              </div>
            </div>
          </div>

          <hr className="separator" />

          <div className="col-12">
            <div>
              <div className="row justify-content-between">
                <strong className="col-6 ">Total</strong>
                <div className="col-6 text-end ">{TotalPrice}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersDetails;
