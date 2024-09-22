import { useSocket } from '@/context/SocketProvider';
import React, { useEffect } from 'react'

const SocketPart = ({ statergy, eventCallback }) => {

    const { socket } = useSocket();


    const eventLisernar = (eventData) => {
        console.log(statergy?.name);
        eventCallback(eventData);
      };
    
      useEffect(() => {
        if (!socket || !statergy?.eventName) return;
    
        console.log('statergy?.eventName', statergy?.eventName);
    
        socket.on(statergy?.eventName, eventLisernar);
    
        return () => {
          socket.off(statergy?.eventName, eventLisernar);
        };
      }, [socket, statergy?.eventName]);

  return 
}

export default SocketPart