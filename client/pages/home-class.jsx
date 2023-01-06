import React from 'react';
import { io } from '../lib';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.socket = io().connect();
  }

  componentDidMount() {
    this.socket.emit('message', { type: 'user-join', text: `User ${this.props.name} has joined` });

    this.socket.on('message', newMessage => {
      this.setState({
        messages: [
          ...this.state.messages,
          newMessage
        ]
      });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    // eslint-disable-next-line no-console
    console.log('Messages:', this.state.messages);

    return (
      <div>
        <h1>Socket.io Example - Class</h1>
      </div>
    );
  }
}
