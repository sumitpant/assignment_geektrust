import {useState,useEffect} from 'react'

/**
 * 
 * @param {*} val : user types this value
 * @param {*} delay : delay in debounce
 * @returns 
 */
const useDebounce = (val ,delay) => {
    const[debouncedVal, setDebounceVal] = useState();

    useEffect(() => {
    
        const handler = setTimeout(()=>{
            setDebounceVal(val);

        },delay);
    
      return () => {
        clearTimeout(handler);
      }
    }, [val])
    
    return debouncedVal;

};

export default useDebounce