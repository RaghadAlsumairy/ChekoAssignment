import React from 'react'
import MenuItem from '../../models/MenuItem';
import './CardDetails.css'
interface props{
    menuItem : MenuItem,
    updateCount: (operation: string) => void;

}
const CardDetails: React.FC<props> = ( { menuItem ,updateCount}) => {
  return (

      <div >
        <div className="modal-header ">
          <h2>{menuItem.name}</h2>
          <div className="calorie-label header" style={{ backgroundColor: menuItem.secondHiCal ? "" : "transparent", visibility: menuItem.secondHiCal ? "visible" : "hidden" }}
                >
                  {menuItem.secondHiCal ? "Second-Highest Calorie Meal" : <span>&nbsp;</span>}
                </div>
        </div>
        <div className="modal-body">
            <div className="card-text" >{menuItem.calorie} Cal</div>
           
          <div className='card-text mb-2 mt-2'>{menuItem.description}</div>
          <img src={menuItem.image} alt={menuItem.name} className=" rounded card-img"  />
        </div>
        <div className="modal-footer details mt-3 ">
            <div className=" count-group">
            <div className=' price px-4'>{menuItem.price} SR</div>

            <button
                    className="btn count-button"
                    onClick={() => updateCount("-")}
                  >
                      -
                  </button> 
                 {menuItem.count}
                  <button
                    className="btn count-button"
                    onClick={() => updateCount("+")}
                  >  +
                  </button>                </div>
        </div>
      </div>
  
  )
}

export default CardDetails
