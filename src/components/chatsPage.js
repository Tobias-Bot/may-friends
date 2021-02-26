import React from "react";

import chats from "../data/chats";

import "../styles/ChatsPage.css";

class ChatsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getChats = this.getChats.bind(this);
  }

  getChats() {
    let response = [];

    response = chats.map((chat, i) => {
      return (
        <div key={chat.title + i}>
          <div
            className="chatView"
            style={{
              background: `url(${chat.background}) center/100% no-repeat`,
            }}
          >
            <div className="picBlackout">
              <div className="chatTitle">{chat.title}</div>
              <div className="chatText">{chat.text}</div>
              <a
                className="linkStyle"
                href={chat.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="chatComeInBtn"
                  style={{ borderColor: chat.color }}
                >
                  <span style={{ color: chat.color }}>войти</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      );
    });

    return response;
  }

  render() {
    let chats = this.getChats();

    return (
      <div>
        <div className="infoText">присоединяйся к майским беседам</div>
        {chats}
      </div>
    );
  }
}

export default ChatsPage;
