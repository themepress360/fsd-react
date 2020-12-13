import React, { useEffect } from 'react';
import { useState } from 'react';

export const UserContext = React.createContext(null);

const UserContextProvider = (props) =>{
    const [user,setUser] = useState({
        isGuestUser:true,

    })
    useEffect(()=>{
        if(window.FsdApp){
            window.FsdApp.accountService.addEventListener('user-change',()=>getUserDetails());
        }
        /* develblock:start */
        setTimeout(()=>{
            setUser({
                email:"nirmalgs910@gmail.com" 
             })
        },5000)
        /* develblock:end */
        
    },[]);  
    const getUserDetails = () =>{
        if(!window.FsdApp.accountService.isGuestUser){
            setUser(window.FsdApp.accountService.user);
        }
        
    }
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;