import {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {setAppIsLoading} from "../store/LoadingSlice";
import {login, logout} from "../store/userSlice";
import { getAuth, onAuthStateChanged,updateProfile} from "firebase/auth";
import {getUserData } from "../services/firebase";
export const useAuthChange = () => {
    const {isFirebaseInitialized} = useSelector(state=> state.firebase);
    const dispatch = useDispatch();

    return (    
        useEffect(()=>{
            if (isFirebaseInitialized) {
                const auth = getAuth();
                const unsub = onAuthStateChanged(auth, (user) => {
                    dispatch(setAppIsLoading(true));
                    if (user) {
                        (async()=>{
                            if (!user.displayName) {
                                const data = await getUserData();
                                if (data) {
                                   await updateProfile(auth.currentUser, {
                                    displayName: data.name
                                   })
                                }
                            }
                            dispatch(login(user.email));
                        })()
                        
                    } else {
                        dispatch(logout());
                    }
                    dispatch(setAppIsLoading(false));
                });
                
                return ()=>{
                    unsub && unsub();
                }
            }
        }, [isFirebaseInitialized, dispatch])
    );
}
