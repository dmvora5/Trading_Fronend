import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Only create a socket instance if it doesn't exist already
        if (!socket && process.env.SOCKET_URL) {
            const newSocket = io(process.env.SOCKET_URL, {
                transports: ["websocket"], // Use only websockets for optimized performance
                reconnectionAttempts: 5,    // Attempt reconnection 5 times before giving up
                reconnectionDelay: 2000,    // Delay between reconnection attempts
            });

            setSocket(newSocket);

            // Handle connection errors
            newSocket.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
