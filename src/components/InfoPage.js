import React from "react";
import bridge from "@vkontakte/vk-bridge";

import "../App.css";
import topics from "../data/topics";
// import { NavLink } from "react-router-dom";

class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: `Опубликованные записи удаляются автоматически.`,
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
    let info = this.state.info;

    let topics = this.getTopicsInfo();

    return (
      <div>
        <div className="infoText">{info}</div>

        <div className="btnsTitle">тематики записей</div>
        <div className="btnsBackground">{topics}</div>
      </div>
    );
  }
}

export default InfoPage;
