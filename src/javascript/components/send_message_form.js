import React from 'react';
import underscore from 'underscore';

export default class SendMessageForm extends React.Component {
    constructor() {
        super();
        this.state = {
            userMessage: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            userMessage: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.userMessage);
        this.setState({
            userMessage: ''
        });
    }

    render() {
        return (
            <form
                className="send-message-form"
                onSubmit={this.handleSubmit}>
                <input type='text'
                    placeholder='enter your message and hit enter'
                    value={this.state.userMessage}
                    onChange={this.handleInputChange}
                />
            </form>
        );
    }
}
