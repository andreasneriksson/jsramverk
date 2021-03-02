import React from 'react';
import io from 'socket.io-client';

const allMessages = document.getElementById("all-messages");
const newInput = document.getElementById("new-input");

class Chatfunction extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            users: []
        }

        this.socket = io('https://socket-server.andreasneriksson.me');
        this.newInput = document.getElementById("new-input");
    }

    componentDidMount() {
        const allMessages = document.getElementById("all-messages");

        // Get history when page loads
        this.socket.emit('get history');

        this.socket.on('get history', function(res) {
            res.map((msg, i) => {
                const lastMsg = document.createElement("p");
                lastMsg.textContent = "[" + msg.currtime + "] " + msg.user + " skrev: " + msg.msg;
                allMessages.appendChild(lastMsg);
            })
        });

        //empties chat
        this.socket.on('clear chat', function() {
            console.log("cleared the chat");
            window.location.reload();
            return false;
        })

        //Sends chatmessage so that it is shown
        this.socket.on('chat message', function (message) {
            let typedMessage = document.createElement("p");

            typedMessage.textContent =
                "[" + message.currtime + "] "
                + message.user + " skrev: "
                + message.msg;

            allMessages.appendChild(typedMessage);
        });


        //Shows that user is connected (by name)
        this.socket.on('user connected', function (user) {
            let newChatUser = document.createElement("p");
            newChatUser.style.fontStyle = "italic";

            newChatUser.textContent = user.user + " anslöt till chatten!";

            allMessages.appendChild(newChatUser);
        })
    }

    handleUser = (event) => {
        this.setState({ user: event.target.value })
    }

    handleInput = (event) => {
        if (event.key === "Enter") {
            this.checkUser();
            const timeStamp = new Date().toLocaleString();

            this.socket.emit('chat message', {
                currtime: timeStamp,
                user: this.state.user,
                msg: event.target.value
            });

            event.target.value = "";
        }
    }

    //empties chat
    clearChat = (event) => {
        this.socket.emit('clear chat');
    }

    checkUser = () => {
        if (!(this.state.users.includes(this.state.user))) {
            this.state.users.push(this.state.user);

            this.socket.emit('user connected', {
                user: this.state.user
            });
        } else {
            console.log(this.state.user + " already connected to chat")
        }
    };

    render() {
        return (
            <section className="main">
                <h1>CHatta här</h1>
                <div className="container">
                    <div id="all-messages" class="all-messages"></div>

                    <p><b>Namn:</b></p>
                    <input class="input" id="new-user" type="text" required name="user" onChange= {this.handleUser} />

                    <p><b>Meddelande:</b></p>
                    <input class="input" id="new-input" type="text" required name="msg" onKeyDown= {this.handleInput}
                    />
                    <p><b>Tryck enter för att skicka</b></p>

                    <input className="button green-button full-width-button" type="submit" value="rensa" onClick= {this.clearChat} />
                </div>
            </section>
        )
    }
}

export default Chatfunction;