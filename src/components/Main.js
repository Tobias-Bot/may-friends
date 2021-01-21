import React from "react";
import bridge from "@vkontakte/vk-bridge";
import qs from "querystring";
import { Route, HashRouter, Switch, NavLink } from "react-router-dom";
// import Transition from "react-transition-group/Transition";

import FindFriend from "./FindFriend";

import "../App.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      headerStyles: {},
      modalForm: <div></div>,
      modalStyles: {},

      show: false,

      submitUserForm: {
        id: "",
        name: "",
        photo: "",
        url: "",
      },

      submitUserData: {},
    };

    this.token =
      "1cc15217534a491b2e5486ea6b31f92421c151f365a8e987272660177daa23538874e879e3cbf344f0415";
    this.group_id = 140403026;

    this.submitUserPost = this.submitUserPost.bind(this);
    this.getHeaderStyle = this.getHeaderStyle.bind(this);
    this.showAnimation = this.showAnimation.bind(this);
    this.setModalForm = this.setModalForm.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.getUserData = this.getUserData.bind(this);
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

  setModalForm(form, style) {
    this.setState({ modalForm: form, modalStyles: style });
    this.getUserData();
  }

  saveForm(formData) {
    this.setState({ submitUserData: formData });
  }

  getUserData() {
    bridge.send("VKWebAppGetUserInfo").then((r) => {
      this.setState({
        submitUserForm: {
          id: r.id,
          name: r.first_name,
          photo: r.photo_100,
          url: `https://vk.com/id${r.id}`,
        },
      });
    });
  }

  submitUserPost() {
    let mes = {
      form: this.state.submitUserData,
      user: this.state.submitUserForm,
    };

    bridge.send("VKWebAppCallAPIMethod", {
      method: "wall.createComment",
      params: {
        owner_id: "-" + this.group_id,
        post_id: "673",
        message: JSON.stringify(mes),
        from_group: this.group_id,
        v: "5.126",
        access_token: this.token,
      },
    });
  }

  render() {
    // let posts = this.getTests();
    let styles = this.state.headerStyles;
    let form = this.state.modalForm;

    let bar = (
      <HashRouter>
        <div>
          <NavLink className="linkStyle" to="/friend">
            <div className="btnInfo" style={{ backgroundColor: "#7DC5D5" }}>
              <i className="fas fa-icons"></i> ищу друга
            </div>
          </NavLink>
          <NavLink className="linkStyle" to="/film">
            <div className="btnInfo" style={{ backgroundColor: "#A59BFF" }}>
              <i className="fas fa-icons"></i> посмотрим фильм?
            </div>
          </NavLink>
          <NavLink className="linkStyle" to="/talk">
            <div className="btnInfo" style={{ backgroundColor: "#FFC1F9" }}>
              <i className="fas fa-icons"></i> поговорите со мной
            </div>
          </NavLink>
          <NavLink className="linkStyle" to="/game">
            <div className="btnInfo" style={{ backgroundColor: "#FFEF85" }}>
              <i className="fas fa-icons"></i> поиграем?
            </div>
          </NavLink>
          <NavLink className="linkStyle" to="/walk">
            <div className="btnInfo" style={{ backgroundColor: "#8BD1FF" }}>
              <i className="fas fa-icons"></i> идем гулять?
            </div>
          </NavLink>
          <NavLink className="linkStyle" to="/ask">
            <div className="btnInfo" style={{ backgroundColor: "#FFAA97" }}>
              <i className="fas fa-icons"></i> хочу спросить
            </div>
          </NavLink>
        </div>
      </HashRouter>
    );

    return (
      <div>
        <div
          className="modal fade"
          id="postModal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div
              className="modal-content"
              style={{ backgroundColor: this.state.modalStyles.color }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Опубликовать запись</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{form}</div>
              <div className="modal-footer">
                <div
                  className="submitBtn"
                  data-dismiss="modal"
                  onClick={this.submitUserPost}
                >
                  опубликовать
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Header" style={styles.header}>
          <span className="titleMark">Мαú</span>{" "}
          <span className="titleApp">френдс</span>
        </div>

        <div className="headerLineBot">{bar}</div>

        <div className="Body" style={styles.body}>
          <HashRouter>
            <Switch>
              {/* <Route exact path="/">
                {posts}
              </Route> */}
              <Route exact path="/friend">
                <FindFriend
                  color={"#7DC5D5"}
                  onSetForm={this.setModalForm}
                  onSubmitForm={this.saveForm}
                />
              </Route>
              <Route exact path="/film">
                FIMLS
              </Route>
              <Route exact path="/game">
                GAMES
              </Route>
              <Route exact path="/walk">
                WALKS
              </Route>
              <Route exact path="/talk">
                TALK
              </Route>
              <Route exact path="/ask">
                ASK
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
