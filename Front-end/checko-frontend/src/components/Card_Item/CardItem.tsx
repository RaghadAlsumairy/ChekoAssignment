import React, { useEffect, useState } from "react";
import "./CardItem.css";
import CardDetails from "../CardDetails/CardDetails";
import MenuItem from "../../models/MenuItem";
import OrderList from "../../stores/OrderList";

interface Props {
  item: MenuItem;
  count: number
}

const CardItem: React.FC<Props> = ({ item, count }: Props) => {
  const [itemCount, setItemCount] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const {addOrder}= OrderList();
  const {deleteOrder}= OrderList();

  useEffect(() => {
    setItemCount(count); 

  }, [count]);
  const handleCardClick = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const updateCount = (operation: string) => {
    if (operation === "+") {
      setItemCount((prevCount) => prevCount + 1);
      addOrder(item)
    } else if (operation === "-" && itemCount > 0) {
      setItemCount((prevCount) => prevCount - 1);
      deleteOrder(item.id)
    }
  };

  return (
    <>
      {/* Card */}
      <div className="card p-3 mb-2" onClick={handleCardClick}>
        <div className="row g-0">
          <div className="col-md-5">
            <img src={item.image} alt={item.name} className="rounded card-img" />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <div className="card-text" >
                {item.calorie} Cal
              </div>
              <div
                  className="calorie-label"
                  style={{ backgroundColor: item.secondHiCal ? "" : "transparent", visibility: item.secondHiCal ? "visible" : "hidden" }}
                >
                  {item.secondHiCal ? "Second-Highest Calorie Meal" : <span>&nbsp;</span>}
                </div>
              <div className="row ">
                <div className="col">
                  <div className="price">{item.price} SR</div>
                </div>
                <div className="col count-group">
                  <button
                    className="btn count-button"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      updateCount("-");
                    }}
                  >
                      -
                  </button>
                  <span className="item-count">{itemCount}</span>
                  <button
                    className="btn count-button"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      updateCount("+");
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>
           <CardDetails updateCount={updateCount} menuItem={{ ...item, count: itemCount }} />
          </div>
        </div>
      )}
    </>
  );
};

export default CardItem;
