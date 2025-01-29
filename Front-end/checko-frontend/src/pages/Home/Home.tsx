import React, { useEffect, useState } from "react";
import CardItem from "../../components/Card_Item/CardItem";
import "./Home.css";
import CategoriesCards from "../../components/Categories_Cards/CategoriesCards";
import MenuItem from "../../models/MenuItem";
import useMenu from "../../stores/menuStore";
import SearchBar from "../../components/SearchBar/SearchBar";
import { get_second_highest_calorie_meal } from "../../services/chekoAPI";

const Home: React.FC = () => {
  const [groupedByCategory, setGroupedByCategory] = useState<
    Record<string, MenuItem[]>
  >({});
  const menu = useMenu((state)=> state.filteredMenu)
  const [second_hi_meals, setSecond_hi_meals] = useState<MenuItem[]>([])

  useEffect(() => {
    const grouped = menu.reduce((acc: Record<string, MenuItem[]>, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
    setGroupedByCategory(grouped);
  },[menu]);
  useEffect(()=> {
    second_highest_calorie_meals();
  },[])

  const second_highest_calorie_meals =async()=>{
      const highestMeals = await get_second_highest_calorie_meal();
      setSecond_hi_meals(highestMeals);
  

  }
  const is_second_hi_cal_meal =(itemId: number)=>{
   
    const highestMealsId = second_hi_meals.map((meal)=> meal.id) 
    if(highestMealsId.includes(itemId))
      return true;
    else return false
}

  return (
    <>
    <SearchBar onSearch={()=>{}}/>
    <div className="content-wrapper">
      <CategoriesCards></CategoriesCards>
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div className="row" key={category}>
        <div className="category-header">
                <h2>{category}</h2>
                <hr />
              </div>    
              <div className="container">
                      <div className="row">
                        {items.map((item) => (
                          <div className="col-lg-4 col-md-12 col-sm-12 " key={item.id}>
                            <CardItem
                              item={{ ...item, secondHiCal: is_second_hi_cal_meal(item.id) }}
                              count={0}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

        </div>
      ))}
    </div>
    </>
  );
};

export default Home;
