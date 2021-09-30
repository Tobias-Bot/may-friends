import React from "react";
import bridge from "@vkontakte/vk-bridge";

import "../App.css";
import topics from "../data/topics";
import { NavLink } from "react-router-dom";

class MenuPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoMain: `Май-френдс — приложение для знакомств и общения.`,
      privacy: `Анкеты исчезают автоматически через 2 недели, их нельзя удалить.
      Опубликованные записи не видят твои друзья или подписчики,
      записи можно просматривать только через это приложение.
      `,
      you: `Знакомься, общайся, ищи свою родственную душу!`,
    };

    this.shareApp = this.shareApp.bind(this);
    this.getTopicsInfo = this.getTopicsInfo.bind(this);
  }

  componentDidMount() {}

  shareApp() {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7738603",
    });
  }

  getTopicsInfo() {
    let response = [];

    response = topics.map((t) => {
      return (
        <div key={t.title} style={{ textAlign: "center" }}>
          <div className="btnInfo" style={{ backgroundColor: t.color }}>
            <i className={t.icon}></i> {t.title}
          </div>
          <div className="infoText">{t.description}</div>
          <hr />
        </div>
      );
    });

    return response;
  }

  render() {
    let infoMain = this.state.infoMain;
    let privacy = this.state.privacy;
    let you = this.state.you;

    // let topics = this.getTopicsInfo();

    return (
      <div>
        <div className="infoText">{infoMain}</div>
        <div className="infoText">{privacy}</div>
        <div className="infoText">{you}</div>
        <div className="btnsTitle">меню</div>
        <div className="btnsBackground">
          <div className="row mb-3">
            <div className="col">
              <NavLink className="linkStyle" to="search">
                <div className="icon">
                  <i className="fas fa-icons"></i>
                  <span className="iconTitle">анкеты</span>
                </div>
              </NavLink>
            </div>
            <div className="col">
              <NavLink className="linkStyle" to="chats">
                <div className="icon">
                  <i className="fas fa-comments"></i>
                  <span className="iconTitle">чаты</span>
                </div>
              </NavLink>
            </div>
            <div className="col">
              <div className="icon" onClick={this.shareApp}>
                <i className="fas fa-share-square"></i>
                <span className="iconTitle">поделиться</span>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <a
                className="linkStyle"
                href="https://vk.com/im?sel=-160404048"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="icon">
                  <i className="fas fa-question"></i>
                  <span className="iconTitle">вопрос по приложению</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuPage;
