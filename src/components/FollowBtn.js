import React, {useEffect, useState} from 'react'
import { doc, onSnapshot, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {updateFollowStore} from "../services/firebase";
import {useSelector} from "react-redux";
import {ROUTES} from "../constants/routes";
import {Link} from "react-router-dom";

export const FollowBtn = ({className, storeID}) => {
  const {userCred} = useSelector(state=> state.user);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const handleClick = async()=>{
    try {
      setIsBtnDisabled(true)
      await updateFollowStore(storeID)
    } catch (error) {
      console.log(error);
    }
    setIsBtnDisabled(false);
  }
  useEffect(()=>{
    let unsub;
    if (userCred) {
      const {uid} = getAuth().currentUser;
      const db = getFirestore();
      unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        const flag = doc.data().following && doc.data().following.includes(storeID);
        setIsFollowing(flag);
      });
    }
    return ()=>{
      unsub && unsub();
    }
  }, [storeID, userCred])
  return (
    userCred? <button
      disabled={isBtnDisabled}
      onClick={handleClick} 
      className={`${className} disabled:opacity-50`}
    >
      {isFollowing? "Following": "Follow"}
    </button>:
    <Link className={`${className}`} to={ROUTES.LOGIN}>
      Follow
    </Link>
    
  )
}
