/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { FaList, FaSearch } from "react-icons/fa";
import useMenu from "../../stores/menuStore";
import Filter from "../../stores/searchFilter";
import { useLocation } from "react-router-dom";
import { fetchBranches } from "../../services/chekoAPI";
import { Branch } from "../../models/Branch";
import MenuItem from "../../models/MenuItem";

const SearchBar: React.FC<{ onSearch: (searchValue?: number[]) => void }> = ({
  onSearch,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [filterV, setFilterValue] = useState<string>("");
  const [searchV, setSearchValue] = useState<string>("");

  // search and filter

  const { searchValue } = Filter();
  // const {filterValue} = Filter();
  const { updateSearchValue } = Filter();
  const { updateFilterValue } = Filter();

  const location = useLocation();
  //  menu
  const { menu } = useMenu();
  const { updateMenuBySearch } = useMenu();

  //branches
  const [branches, setBranches] = useState<Branch[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  // const [searchBranch, setSearchBranch] = useState<{ id: number; name: string } | null>(null);
  const [filterBranch, setFilterBranch] = useState<number[]>([]);

  const [found, setFound] = useState<boolean>(false);
  //suggestions
  const [suggestedItems, setSuggestedItems] = useState<MenuItem[]>([]);
  const [suggestedBranches, setSuggestedBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchAndSetBranches = async () => {
      const branches = await fetchBranches();
      const branchNames = [
        ...new Set(branches.map((branch: Branch) => branch)),
      ];
      setBranches(branchNames);
    };

    fetchAndSetBranches();
  }, []);
  useEffect(() => {
    const itemsCategories = [
      ...new Set(menu.map((item: any) => item.category)),
    ];
    setCategories(itemsCategories);
  }, [menu]);
  const handleMapSearchInput = (value: any) => {
    setSearchText(value); // Filter menu items based on search input
    if (value.trim() === "") {
      setSuggestedBranches([]);
      setFilterBranch([]);
    } else {
      const filteredItems = branches.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.address.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestedBranches(filteredItems);
    }
  };
  const handleMapFilter = (value: any) => {
    const branchesIds = [
      ...new Set(
        branches
          .filter((branch) => branch.address == value)
          .map((branch) => branch.id)
      ),
    ];
    setFilterBranch(branchesIds);
    setSearchText("");
    setFilterValue(value);
  };
  const handleSearchInput = (value: any) => {
    setSearchValue(value);
    updateSearchValue(value);

    if (value.trim() === "") {
      setSuggestedItems([]);
    } else {
      const filteredItems = menu.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedItems(filteredItems);
    }
  };

  const renderSearchBar = () => {
    switch (location.pathname) {
      case "/":
        return (
          <>
            <div className="search-bar">
              {/* Search Icon */}
              <div className="icon-container">
                <FaSearch className="mr-3" />
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search"
                value={searchV}
                onChange={(e) => handleSearchInput(e.target.value)}
                className="search-input"
              />

              {/* Filter Icon */}
              <FaList className="mr-3" />

              <select
                value={filterV}
                onChange={(e) => setFilterValue(e.target.value)}
                className="filter-select"
              >
                <option value="" disabled>
                  Filter
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Search Button */}
              <button
                className="btn search-btn"
                onClick={async () => {
                  updateFilterValue(filterV);
                  updateSearchValue(searchV);
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  updateMenuBySearch(searchValue, filterV),
                    setSuggestedItems([]);
                  setFound(true);
                  onSearch([0]);
                }}
              >
                Search
              </button>
            </div>
            {/* Dropdown Suggestions */}
            {suggestedItems.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestedItems.map((item, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => {
                      setSearchValue(item.name);
                      updateSearchValue(item.name);

                      setFound(true);
                      setSuggestedItems([]);
                    }}
                  >
                    <strong>{item.name}</strong>
                    <div className="text-body-secondary">
                      {" "}
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* not found */}
            {suggestedItems.length == 0 && searchV != "" && !found && (
              <div className="suggestions-dropdown p-3">
                No item related to ({searchV})
              </div>
            )}
          </>
        );
      case "/map":
        return (
          <>
            <div className="search-bar">
              {/* Search Icon */}
              <div className="icon-container">
                <FaSearch className="mr-3" />
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => handleMapSearchInput(e.target.value)}
                className="search-input"
              />
              {/* Dropdown Suggestions */}
              {suggestedBranches.length > 0 && (
                <div className="suggestions-dropdown-map">
                  {suggestedBranches.map((item, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => {
                        setFilterBranch([item.id]);
                        setFilterValue(item.address);
                        setSuggestedBranches([]);
                        setSearchText(item.name);
                        setFound(true);
                      }}
                    >
                      <strong>{item.name}</strong>
                      <div className="text-body-secondary"> {item.address}</div>
                    </div>
                  ))}
                </div>
              )}
              {/* not found */}
              {suggestedBranches.length == 0 && searchText != "" && !found && (
                <div className="suggestions-dropdown-map p-2">
                  <div className="suggestion-item">
                    No Branch related to ({searchText})
                  </div>
                </div>
              )}

              {/* Filter Icon */}
              <FaList className="mr-3" />

              <select
                value={filterV}
                onChange={(e) => handleMapFilter(e.target.value)}
                className="filter-select"
              >
                <option value="" disabled>
                  Filter
                </option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch.address}>
                    {branch.address}
                  </option>
                ))}
              </select>

              {/* Search Button */}
              <button
                className="btn search-btn"
                onClick={async () => {
                  onSearch(filterBranch!);
                }}
              >
                Search
              </button>
            </div>
          </>
        );
    }
  };
  return renderSearchBar();
};

export default SearchBar;
