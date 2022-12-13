import React, {createContext, useState} from 'react'

type NotificationType = {
    color: string,
    message: string
}

export type NotificationContextType = [any, NotificationType]

export const NotificationContext = createContext<[any, NotificationType]>([() => {}, {color: '', message: ''}])

const Notification = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
    const [notification, setNotification] = useState({
        color: '',
        message: ''
    })

    return (
        <NotificationContext.Provider value={[setNotification, notification]}>
            {props.children}
        </NotificationContext.Provider>
    )
}


export {Notification}
