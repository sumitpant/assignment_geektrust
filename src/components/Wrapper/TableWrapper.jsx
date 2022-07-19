import React, { useEffect, useState } from "react";
import "../../App.css";
import Table from "../TableComponent/Table";
import Paginate from "../Paginate/Paginate";
import useDebounce from "../../helper/useDebounce";
import Error from "../ErrComponent/Error";
import { fetchData } from "../../network/axiosFile";

const TableWrapper = () => {
    const [value, setValue] = useState();
    const [original_value, setOriginalValue] = useState();
    const [original, setOriginal] = useState();
    const [search, setSearch] = useState("");
    const deb = useDebounce(search, 500);
  
    useEffect(() => {
      (async () => {
        const { res, paginate } = await fetchData();
        if (Array.isArray(paginate)) {
          setValue(paginate);
          setOriginal(res);
          setOriginalValue(paginate);
        } else {
          setValue("");
        }
      })();
    }, []);
  
    useEffect(() => {
      if (deb !== "") {
        const d = value?.filter((el) => el.name.toLowerCase().includes(deb) ||el.email.toLowerCase().includes(deb)||el.role.toLowerCase().includes(deb));
        setValue(d);
      } else {
        setValue(original_value);
      }
    }, [deb]);
  
    const searchBy = (e) => {
      setSearch(e.target.value.toLowerCase());
    };
    const setValueFromChild = (key) => {
      key = key * 10;
  
      setValue(original.slice(key, key + 10));
    };
    /**
     * 
     * @param {*} row take object find it in array and delete.
     */
    const deleteValue =(row)=>{
       let index= value.indexOf(row);
       let obj =[];
       if(index>-1){
       obj= value.splice(index,1);
       }
        setValue(value);
    }
  
    return (
      <div className="app">
        <div className="input__div">
          <input type="text" onChange={searchBy} className="text_box"  placeholder="Search..."/>
        </div>
       
        {value ? (
          <>
            <Table value={value} deleteValue={deleteValue} />
            <Paginate value={original} paginate={setValueFromChild} />
          </>
        ) : (
          <Error/>
        )}
      </div>
    );
  }
  
 


export default TableWrapper