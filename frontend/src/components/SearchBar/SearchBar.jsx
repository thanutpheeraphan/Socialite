import React, {useState} from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({placeholder, data}){
    const [filteredData, serFilteredData] = useState([]);
    const [entered, setEntered] = useState("");

    const handleFilter = (event) => {
        const searchKey = event.target.value;
        setEntered(searchKey);
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(searchKey.toLowerCase());
        });

        if (searchKey === ""){
            serFilteredData([]);
        }else{
            setFilteredData(newFilter);
        }
    };
    const clearInput = () => {
        setFilteredData([]);
        setEntered("");
    };

    return(
        <div className="searchbar">
            <div className="input">
                <input type="text" placeholder={place} value={entered} onChange={handleFilter}/>
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                       <SearchIcon/>
                    ) : (
                        <CloseIcon id="clear" onClick={clearInput}/>
                    )}
                </div>
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0,15).map((value,key) =>{
                        return (
                            <a href="" target="" className="dataItem">
                                <p>{value.title}</p>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;