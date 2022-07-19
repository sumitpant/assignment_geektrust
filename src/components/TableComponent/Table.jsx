import React, { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import "./Table.css";

const Table = ({ value,deleteValue }) => {
  const [selected, setSelected] = useState({});
  const [check ,setCheck] =useState(false)

  const checkSelect = (key) => {
    if (selected[key]) {
      delete selected[key];
      setSelected({ ...selected });
    } else {
      let obj = { [key]: true };

      setSelected({ ...selected, ...obj });
    }
  };
/**
 * Selcts all values on click 
 */
  const selectAll=()=>{
    let obj ={};
    setCheck(true);
    if(Object.keys(selected).length==0){
      value.map((object)=>{
      
        obj={...obj ,[object.id]:true}
    })
    setSelected({ ...selected, ...obj})

    }else{
      setSelected({})
      setCheck(false);
    }
   
  }
 
 
  const deleteData=()=>{
   const keys =Object.keys(selected)
    let data=value.filter(data=>keys.includes(data.id));
   data.forEach((data)=>deleteValue(data));
   setSelected({});
   setCheck(false);
  }

  const TableStruct = ({ id, name, email, role }) => {
    const [edit, setEdit] = useState();

    const editNow = (e) => {
  
      setEdit(e.target.dataset["id"]);
    };

    const checkRow = (e) => {
      checkSelect(e.target.value);
    };
    const deleteOne =(e)=>{
      
       if(e.target.dataset["user"]){
        let index=e.target.dataset["user"];

        let row = value[index];
       
       deleteValue(row);
       }
     

    }
    return (
      <tr
        id={id}
        key={id}
       className={selected[id]?"table_body_gray":"table_body"}
        contentEditable={id === edit}
        suppressContentEditableWarning={true}
      >
        <td>
          <input
            type="checkbox"
            onChange={checkRow}
            value={id}
            checked={selected[id] ? true : false}
          />
        </td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
        <td className="icons">
          <div className="edit_div"  onClick={editNow} >
            <FaEdit className="edit" data-id={id}/>
          </div>
          <div className="delete_div"    onClick={deleteOne}  >
            <FaRegTrashAlt className="delete"  data-user={id} />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div className="table__div">
        <table>
          <tbody>
            <tr className="table_heading">
              <th>
                <input type="checkbox"  onChange={selectAll} checked={check}/>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>

            {value?.map((data) => (
              <TableStruct
                id={data.id}
                name={data.name}
                email={data.email}
                role={data.role}
                key={data.id}
              />
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(selected).length ==0 ?    <button className="btn" >
        Deleted Selected
      </button>:
        <button  onClick ={deleteData} className="btn_delete" >
        Deleted Selected
      </button>
      }
    
    </div>
  );
};

export default Table;
