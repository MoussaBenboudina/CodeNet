import React, { ChangeEvent } from "react";
import { LuSearch } from "react-icons/lu";
type SearshProps = {
  setSearchTerm: any;
};

const Search: React.FC<SearshProps> = ({ setSearchTerm }) => {
  return (
    <div>
      <div className="search-box">
        <button className="btn-search flex justify-center items-center">
          <LuSearch className="text-2xl" />
        </button>
        <input
          type="text"
          className="input-search text-white "
          placeholder="Search by title..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>
    </div>
  );
};
export default Search;
