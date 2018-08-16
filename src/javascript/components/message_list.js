import React from 'react';
import underscore from 'underscore';
import ScrollArea from 'react-scrollbar';

export default class MessageList extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { message } = this.props;
        return (
            <ScrollArea
              speed={0.8}
              horizontal={false} >
                <ul className='message-list'>
                    {message && message.length
                       ? underscore.map(message, (user, key) => <li key={key} className='message'><p>{user.senderId}</p><p>{user.text}</p></li>)
                       : null
                     }
                </ul>
            </ScrollArea>
        );
    }
}
