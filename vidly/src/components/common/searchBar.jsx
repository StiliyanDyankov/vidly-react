import React from "react";

const SearchBar = ({ onSearch, searchInput }) => {
    return (
        <nav className="navbar navbar-light pl-0">
            <form className="form-inline">
                <input
                    className="form-control mr-sm-2 ml-l"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    name="searchInput"
                    value={searchInput}
                    onChange={(e)=>onSearch(e)}
                />
            </form>
        </nav>
    );
};

export default SearchBar;
