import React from "react";
import bridge from "@vkontakte/vk-bridge";

import "../App.css";
import topics from "../data/topics";
import { NavLink } from "react-router-dom";

class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoMain: `Май-френдс — приложение для знакомств и общения.`,
      privacy: `Опубликованные записи не видят твои друзья или подписчики.
      Записи можно просматривать только через это приложение.`,
      info: `Посты удаляются автоматически.`,
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
    let info = this.state.info;

    let topics = this.getTopicsInfo();

    return (
      <div>
        <div className="infoText">{infoMain}</div>
        <div className="infoText">{privacy}</div>
        <div className="infoText">{info}</div>
        <div className="btnsTitle">приложение</div>
        <div className="btnsBackground">
          <div className="row mb-4">
            <div className="col">
              <NavLink className="linkStyle" to="search">
                <div className="icon">
                  <i className="fas fa-icons"></i>
                  <span className="iconTitle">публикации</span>
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
        </div>

        <div className="btnsTitle">тематики записей</div>
        <div className="btnsBackground">{topics}</div>
      </div>
    );
  }
}

export default InfoPage;
