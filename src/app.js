import React from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader';
import { Chatkit, ChatManager, TokenProvider } from '@pusher/chatkit';
import MessageList from './javascript/components/message_list';
import SendMessageForm from './javascript/components/send_message_form';
import SuccessPopup from './javascript/components/shared/successPopup';
import './css/style.css';
const instanceLocator = "v1:us1:b9a0bcb4-2814-49d9-ba21-b97d473b2c26";
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/b9a0bcb4-2814-49d9-ba21-b97d473b2c26/token";
const userId = "101";
const roomId = 13799735;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            message: [],
            loaded: false,
            showPopup: false
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    componentDidMount() {
        const tokenProvider = new TokenProvider({
            url: testToken
        });
        const chatManager = new ChatManager({
            instanceLocator: instanceLocator,
            userId: userId,
            tokenProvider: tokenProvider
        });
        chatManager.connect().then(currentUser => {
            this.currentUser = currentUser
            this.currentUser.subscribeToRoom({
                roomId: roomId,
                hooks: {
                    onNewMessage: message => {
                        const  entry = { senderId: message.senderId, text: message.text };
                        this.setState({
                            message: [...this.state.message, entry],
                            loaded: true
                        })
                    }
                }
            })
        }).catch(error => {
            console.error("error:", error);
        });
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: roomId
        }).then(
            this.setState({
                showPopup: true
            })
        )
    }

    closePopup() {
        this.setState({
          showPopup: false
        });
    }

    render() {
        return (
            <div className='app'>
              <Loader loaded={this.state.loaded}>
                  {this.state.showPopup && <SuccessPopup closePopup={this.closePopup} headerText='success' bodyText='your message sent succesfully'/>}
                  <h1 className='title'>React Chat App</h1>
                  <MessageList message={this.state.message}/>
                  <SendMessageForm sendMessage={this.sendMessage}/>
              </Loader>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
