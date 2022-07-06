import { useState, useEffect } from "react"
import { getURL } from "../../services/firebase";

export default function useSrcFirebase(path){
    const [src, setSrc] = useState(undefined);

    useEffect(() => {
        getURL(path)
        .then((url) => {
            setSrc(url)
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [src]
};