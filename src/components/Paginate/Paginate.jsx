import React,{useState} from 'react'
import './Paginate.css'
const Paginate = ({value , paginate }) => {
     let val= Math.round(value?.length/10);
     const [selected ,setSelected] =useState(0);

    let page=[...Array(val).keys()];
    const [arr,setArr] = useState(page);
    const callPage=async(key)=>{
        setSelected(key);
           console.log(key)
        
            paginate(key);
    }
  return (
    <div className="pages__div">
        {arr?.map((_,key)=><div key={key} className={selected===key?"pages__selected":"pages"} onClick={()=>callPage(key)}><span> {key}</span></div>)}
      
        
    </div>
  )
}

export default Paginate