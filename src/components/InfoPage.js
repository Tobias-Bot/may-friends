import React from "react";
import bridge from "@vkontakte/vk-bridge";
import { Route, HashRouter, Switch, NavLink } from "react-router-dom";
import Transition from "react-transition-group/Transition";

import "../App.css";

class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: `Май-френдс — приложение для знакомств и общения.`,
      privacy: `Опубликованные записи не видят твои друзья или подписчики.
      Записи можно просматривать только через это приложение.`,
    };

    this.shareApp = this.shareApp.bind(this);
  }

  componentDidMount() {}

  shareApp() {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7738603",
    });
  }

  render() {
    let info = this.state.info;
    let privacy = this.state.privacy;

    return (
      <div>
        <div className="infoText">{info}</div>
        <div className="infoText">{privacy}</div>
        <div className="row mt-5 mb-2 pl-3 pr-3">
          <div className="col">
            <div className="icon" onClick={this.shareApp}>
              <i className="fas fa-share-square"></i>
              <span className="iconTitle">поделиться</span>
            </div>
          </div>
          <div className="col">
            <a
              href="https://vk.com/warmay"
              target="_blank"
              rel="noopener noreferrer"
              className="linkStyle"
            >
              <div className="icon">
                <i className="fas fa-door-open"></i>
                <span className="iconTitle">сообщество</span>
              </div>
            </a>
          </div>
        </div>
        <div className="row mt-4 mb-2 pl-3 pr-3">
          <div className="col">
            <a
              href="https://vk.com/im?sel=-160404048"
              target="_blank"
              rel="noopener noreferrer"
              className="linkStyle"
            >
              <div className="icon">
                <i className="fas fa-bug"></i>
                <span className="iconTitle">сообщить об ошибке</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPage;
