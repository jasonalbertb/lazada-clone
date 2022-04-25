import {useEffect} from "react";
import { initializeApp } from "firebase/app";
import {useDispatch} from "react-redux";
import {setIsFirebaseInitialized} from "../store/firebaseSlice";
export const useInitFirebase = () => {
  const dispatch = useDispatch();
  return (
    useEffect(()=>{
        const firebaseConfig = {
          apiKey: process.env.REACT_APP_apiKey,
          authDomain: process.env.REACT_APP_authDomain,
          projectId: process.env.REACT_APP_projectId,
          storageBucket: process.env.REACT_APP_storageBucket,
          messagingSenderId: process.env.REACT_APP_messagingSenderId,
          appId: process.env.REACT_APP_appId
        };
        initializeApp(firebaseConfig);
        dispatch(setIsFirebaseInitialized(true));
    }, [dispatch])
  );
}
