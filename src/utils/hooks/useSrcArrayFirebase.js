import { useState, useEffect } from "react"
import { storage } from '../../services/firebase';
import { ref, getDownloadURL  } from "firebase/storage";

export default function useSrcArrayFirebase(inputArray){
    const [array, setArray] = useState(inputArray);
  
    useEffect(() => {
      const arrayCopy = [...array];
      const length = arrayCopy.length;
      for (let i = 0; i < length; i++) {
        const object = arrayCopy[i]
        if (object.ref) {
          const fileRef = ref(storage, object.ref);
          getDownloadURL(fileRef)
          .then((url) => {
            object.src = url
          })
          }
        }
      setArray(arrayCopy)
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [array]
}