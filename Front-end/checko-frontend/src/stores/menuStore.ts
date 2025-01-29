import { create } from "zustand";
import MenuItem from "../models/MenuItem";
import { fetchMenuFromAPI } from "../services/chekoAPI";

interface MenuStore {
  menu: MenuItem[];
  filteredMenu: MenuItem[];
  fetchMenu: () => Promise<void>;
  updateMenuBySearch: (searchValue: string, filterValue: string) => void;
 
}

const useMenu = create<MenuStore>((set, get) => ({
  menu: [] as MenuItem[],
  filteredMenu: [] as MenuItem[],
  fetchMenu: async () => {
    const menuData = await fetchMenuFromAPI();
    const sortedMenu = [...menuData].sort((a: MenuItem, b: MenuItem) => {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      return 0;
    });
    set({ menu: sortedMenu });
    set({ filteredMenu: sortedMenu });
  },


  updateMenuBySearch: (searchValue: string, filterValue: string) => {
    const menu = get().menu; 
    let filtered = [...menu];
    
    console.log('search ', searchValue)
    console.log('filterValue ', filterValue)

    if (searchValue || filterValue) {
    
      filtered = filtered.filter((item: MenuItem) => {
        const matchesSearch =
          searchValue === "" ||
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description.toLowerCase().includes(searchValue.toLowerCase());

        const matchesFilter = filterValue === "" || item.category === filterValue;

        return matchesSearch && matchesFilter;
      });
    }

    set({ filteredMenu: filtered }); // Update filteredMenu with the results
  },

  
}));

export default useMenu;
