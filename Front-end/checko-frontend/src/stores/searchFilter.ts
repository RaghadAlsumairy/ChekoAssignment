import { create } from "zustand";

interface searchFilter{
    searchValue: string;
    filterValue: string;
    updateSearchValue: (value: string)=>void
    updateFilterValue: (value: string)=>void

}

const Filter= create<searchFilter>((set)=>({
    searchValue: '',
    filterValue:'',
    updateSearchValue(value) {
        set({searchValue:value})
    },
    updateFilterValue(value) {
        set({filterValue:value})
    },
}))
export default Filter;