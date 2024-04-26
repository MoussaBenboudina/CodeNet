import React, { ChangeEvent } from "react";
import { LuSearch } from "react-icons/lu";
type SearshProps = {
  setSearchTerm: any;
};

const Search: React.FC<SearshProps> = ({ setSearchTerm }) => {
  return (
    <div>
      {/* <input
        type="text"
        placeholder="Search by title..."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        className="search-input bg-purple-white shadow rounded border-0 p-3 m-auto w-72 h-10"
      /> */}
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
