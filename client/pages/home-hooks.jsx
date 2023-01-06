import React, { useEffect, useState } from 'react';
import { io } from '../lib';

export default function Home(props) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const socket = io().connect();

    socket.emit('message', { type: 'user-join', text: `User ${props.name} has joined` });

    socket.on('message', newMessage => {
      setMessages(messages => {
        return [
          ...messages,
          newMessage
        ];
      });
    });

    return () => socket.close();
  }, []);

  // eslint-disable-next-line no-console
  console.log('Messages:', messages);

  return (
    <div>
      <h1>Socket.io Example - Hooks</h1>
    </div>
  );
}
