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

      // const length = arrayCopy.length;
      // for (let i = 0; i < length; i++) {
      //   const object = arrayCopy[i]
      //   if (object.ref) {
      //     getURL(object.ref)
      //     .then((url) => {
      //       object.src = url
      //     })
      //     }
      //   }
      //  setArray(arrayCopy);
      
    }, [array, index]);

    return [array]
};