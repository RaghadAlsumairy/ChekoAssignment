import { useEffect, useState } from "react";
import MapComponent from "../../components/MapComponent/MapComponent";
import "./Map.css"; 
import SearchBar from "../../components/SearchBar/SearchBar";
import { Branch } from "../../models/Branch";
import { fetchBranches } from "../../services/chekoAPI";
const Map: React.FC  = () => {
  const [Branches, setBranches] = useState<Branch[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);

   useEffect(()=>{
        getBranches()
      },[]) 
  
  const getBranches= async ()=>{
    const branchesData = await fetchBranches()
    setBranches(branchesData);
    setFilteredBranches(branchesData);
  }

  const handleMapSearch = (value:any) => {
    console.log('value', value)
    if(value.length ===0){
      setFilteredBranches(Branches)
    }
    else{
      
      const branches = Branches.filter(branch => value.includes(branch.id));
      setFilteredBranches(branches)
    }
    
  };
  return (
    <>
    <SearchBar onSearch={handleMapSearch}/>
    <MapComponent filterBranches={filteredBranches}/> 
       </>
  )
}

export default Map;
