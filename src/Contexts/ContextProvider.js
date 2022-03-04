import { createContext, useState } from 'react';

export const LoginContext = createContext(null);

const ContextProvider = ({children}) => {

    const [account,setAccount]=useState({});
    const [userid,setUserid]=useState();
    const [userEmail,setUserEmail]=useState();
    const [perKgObjId,setPerKgObjId]=useState();
    return (
        <LoginContext.Provider value={{
            account,
            setAccount,
            userid,
            setUserid,
            userEmail,
            setUserEmail,
            perKgObjId,
            setPerKgObjId
        }}>
            {children}
        </LoginContext.Provider>
    )
}
export default ContextProvider;