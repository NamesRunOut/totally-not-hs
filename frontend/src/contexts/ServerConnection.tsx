// @ts-nocheck
import React, {createContext, useEffect, useState} from 'react'
import io from 'socket.io-client'

export const ServerConnectionContext: any = createContext()

const ServerConnection = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
    const [socket, setSocket] = useState<any>({on: () => {}, off: () => {}, close: () => {}, emit: () => {}})

    useEffect(() => {
        const socketio = io(`127.0.0.1:8000`)
        setSocket(socketio)
        return () => socketio.close()
    }, [])

    useEffect(() => {
        // const inter = setInterval(() => console.log(socket?.connected, socket), 20000)
        // return () => clearInterval(inter)
    }, [socket])

    // useEffect(() => {
    //     socket.on('endOfRound', (r) => console.log('endofround', r))

    //     // const liste = socket?.onAny((event, ...args) => {
    //     //     console.log(`got ${event}`)
    //     // })

    //     socket.on('client_count', (r) => {
    //         console.log(r)

    //         if (r > 1) {
    //             socket.emit('join', {name: '1', email: 'qehj'})
    //             socket.emit('endOfRound', {name: 'gehj', gameId: 0})
    //         }
    //     })
    //     socket.on('join', (r) => console.log('join', r))


    //     return () => {
    //         socket.off('endOfRound')
    //         socket.off('client_count')
    //         socket.off('join')
    //         // socket?.offAny(liste)
    //     }
    // }, [socket])

    return (
        <ServerConnectionContext.Provider value={socket}>
            {props.children}
        </ServerConnectionContext.Provider>
    )
}


export {ServerConnection}
