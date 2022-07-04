import { useState, useEffect } from "react"
import { storage } from '../../services/firebase';
import { ref, getDownloadURL  } from "firebase/storage";

export default function useSongs(songList){
    const [songs, setSongs] = useState(songList);
  
    useEffect(() => {
      const songsCopy = [...songs];
      const length = songsCopy.length;
      for (let i = 0; i < length; i++) {
        const song = songsCopy[i]
        if (song.ref) {
          const songRef = ref(storage, song.ref);
          getDownloadURL(songRef)
          .then((url) => {
            song.src = url
          })
          }
        }
      setSongs(songsCopy)
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [songs]
}