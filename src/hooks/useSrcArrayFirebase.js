import { useState, useEffect } from "react"
import { getURL } from '../services/firebase';

export default function useSrcArrayFirebase(inputArray, index){
    const [array, setArray] = useState(inputArray);
  
    useEffect(() => {
      const arrayCopy = [...array];
      const object = arrayCopy[index];
      if (!object.src) {
        getURL(object.ref)
        .then((url) => {
          object.src = url;
          setArray(arrayCopy);
        })
      }  
    }, [array, index]);

    return [array]
};