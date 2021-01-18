import React from "react";
import bridge from "@vkontakte/vk-bridge";
import qs from "querystring";
import { Route, HashRouter, Switch, NavLink } from "react-router-dom";
import Transition from "react-transition-group/Transition";

import FindFriend from "./FindFriend";

import "../App.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      headerStyles: {},

      show: false,
    };

    this.getTests = this.getTests.bind(this);
    this.getHeaderStyle = this.getHeaderStyle.bind(this);
    this.showAnimation = this.showAnimation.bind(this);
  }

  componentDidMount() {
    this.setState({ headerStyles: this.getHeaderStyle() });

    this.showAnimation();
  }

  showAnimation() {
    this.setState({ show: true });
  }

  getHeaderStyle() {
    const str = window.location.search.slice(1);
    const objParams = qs.parse(str);

    let platform = objParams.vk_platform;

    if (platform === "mobile_iphone") {
      return {
        header: {
          height: "70px",
          paddingTop: "30px",
        },
        body: {
          paddingTop: "20px",
        },
      };
    } else {
      return {};
    }
  }

  setModalText(text) {
    this.setState({ testInfo: text });
  }

  getTests() {
    let response = this.state.posts.map((post, i) => {
      return (
        <div key={i}>
          <Transition in={this.state.show} timeout={200 + i * 150}>
            {(state) => {
              return (
                <div
                  className={"postView" + "-" + state}
                  style={{ backgroundColor: post.color }}
                ></div>
              );
            }}
          </Transition>
        </div>
      );
    });

    return response;
  }

  render() {
    // let posts = this.getTests();
    let styles = this.state.headerStyles;

    return (
      <div>
        <div className="Header" style={styles.header}>
          Мαú-френдс
        </div>
        <div className="Body" style={styles.body}>
          <HashRouter>
            <Switch>
              {/* <Route exact path="/">
                {posts}
              </Route> */}
              <Route exact path="/">
                <FindFriend />
              </Route>
            </Switch>
          </HashRouter>
          <a href="https://vk.com/warmay" className="linkStyle">
            <div className="copyrightText">Май</div>
          </a>
        </div>
        {/* <div className="footer">
          <NavLink className="linkStyle" to="/search">
            <div className="btnFooter">
              <i className="fas fa-search"></i>
            </div>
          </NavLink>
        </div> */}
      </div>
    );
  }
}

export default Main;
