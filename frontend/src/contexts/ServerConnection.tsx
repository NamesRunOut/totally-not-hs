import React, {createContext, useState} from 'react'

// @ts-ignore
export const ServerConnectionContext: any = createContext()

const ServerConnection = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
    const [notification, setNotification] = useState({
        color: '',
        message: ''
    })

    return (
        <ServerConnectionContext.Provider value={[setNotification, notification]}>
            {props.children}
        </ServerConnectionContext.Provider>
    )
}


export {ServerConnection}
