import { useState, useEffect } from "react"
import { storage } from "../../services/firebase";
import { ref, getDownloadURL  } from "firebase/storage";

export default function useVideoSrcFirebase(path){
    const [src, setSrc] = useState(undefined)

    useEffect(() => {
        const fileRef = ref(storage, path);
        getDownloadURL(fileRef)
        .then((url) => {
            setSrc(url)
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [src]
}