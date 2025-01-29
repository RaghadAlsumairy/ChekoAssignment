import { apllicationConfig } from "../config/application.config";
import { Branch } from "../models/Branch";
import MenuItem from "../models/MenuItem";


const appUrl= apllicationConfig.urls
export const fetchMenuFromAPI = async() =>{
    const response = await fetch(appUrl.endpoint+appUrl.menu  );
    var result = response.json();
    return result;
}
export const fetchBranches = async(): Promise<Branch[]>=>{
    const response = await fetch(appUrl.endpoint+appUrl.branches);
    var result = response.json();
    return result;
}

export const get_second_highest_calorie_meal= async(): Promise<MenuItem[]>=>{
    const response = await fetch(appUrl.endpoint+ appUrl.secondHighestCalorie)
    var result = response.json()
    return result;
}