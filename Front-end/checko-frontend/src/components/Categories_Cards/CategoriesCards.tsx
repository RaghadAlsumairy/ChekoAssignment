import React, { useEffect, useState } from 'react';
import './CategoriesCards.css';
import { FaHamburger, FaSun, FaUtensils } from 'react-icons/fa';
import useMenu from '../../stores/menuStore';
import Filter from '../../stores/searchFilter';
import { FaListCheck } from 'react-icons/fa6';
import OrderList from '../../stores/OrderList';
import OrdersDetails from '../OrdersDetails/OrdersDetails';
import { IoCafe, IoFastFood } from 'react-icons/io5';
import { GiHotMeal, GiCakeSlice } from 'react-icons/gi';

const CategoriesCards: React.FC = () => {
  const [counts, setCategoriesCounts] = useState<Record<string, number>>({});
  const {totalOrders}= OrderList();
  const [showOrdersList, setShow] = useState<boolean>(false)

  // Zustand store for filter
  const {filterValue} = Filter();
  const {updateFilterValue} = Filter();
  
  const getBackgroundColor = (category:string) => {
    switch(category.toLowerCase()){
      case 'Breakfast'.toLowerCase():
        return '#F4CBDF';
        case 'Dinner'.toLowerCase():
          return '#E7DEE3';
          case 'lunch'.toLowerCase():
            return '#D1D1EF';
            case 'dessert'.toLowerCase():
              return '#CDDFEC';  
            default:
              return '#D0EAE3'

  };}
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "breakfast":
        return <FaSun  />; 
      case "lunch":
        return <GiHotMeal  />;
      case "dinner":
        return <FaUtensils  />; 
      case "dessert":
        return <GiCakeSlice title="Dessert" />;
      case "snack":
        return <IoFastFood title="Snack" />; 
      case "coffee":
        return <IoCafe title="Coffee" />; 
      default:
        return <FaHamburger title="Other" />; 
    }
  };
  // Zustand store for menu
  const { menu, updateMenuBySearch } = useMenu();

  useEffect(() => {
    const categoryCounts = menu.reduce((acc: Record<string, number>, item: any) => {
      acc[item.category] = (acc[item.category] || 0) + 1; 
      return acc;
    }, {});

    setCategoriesCounts(categoryCounts);
  }, [menu]);

  const handleCloseModal = () => {
    setShow(false);
  };
  return (
    <div className="row mb-3 p-1">
      {Object.entries(counts).map(([category, count]) => (
        <div className="  col-sm-6 col-md-6 col-lg-3 text-center mt-2" key={category}>
          <div
            className={`card category ${filterValue === category ? 'selected' : ''}`}
            onClick={() => {
              if (filterValue === category) {
                updateFilterValue('');
                updateMenuBySearch('', '');
              } else {
                updateFilterValue(category);
                updateMenuBySearch('', category);
              }
            }}
          >
            <div className="card-body">
              <div className="card-title category">
                <div className="row">
                  <div className="col  mt-1">
                    <div className="icon"   style={{ backgroundColor: getBackgroundColor(category) }} >
                      {getIcon(category)}
                    </div>
                  </div>
                  <div className="col mt-1">{category}</div>
                  <div className="col mt-1">{count}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    
      <div className=" col-sm-6 col-md-6 col-lg-3 mt-2 text-center">
        <div className="line">
          <div className="card category mx-2" onClick={()=> setShow(true)}>
            <div className="card-body">
              <div className="card-title category">
                <div className="row">
                  <div className="col mt-1">
                    <div className="icon" style={{ backgroundColor: getBackgroundColor('orders') }}>
                      <FaListCheck />
                    </div>
                  </div>
                  <div className="col mt-1">Orders</div>
                  <div className="col mt-1">{totalOrders}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          {/* Modal */}
          {showOrdersList && (
        <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={handleCloseModal}>
            &times;
          </button>
          <OrdersDetails />
        </div>
      </div>
      
      )}
    </div>
  );
  
  
};

export default CategoriesCards;
