import React from "react";
import bridge from "@vkontakte/vk-bridge";
import qs from "querystring";
import { Route, HashRouter, Switch, NavLink } from "react-router-dom";
import Transition from "react-transition-group/Transition";

import topics from "../data/topics";
import InfoPage from "./InfoPage";
import FindFriend from "./FindFriend";

import "../App.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      headerStyles: {},
      modalStyles: {},
      modalForm: "",

      show: false,

      submitUserForm: {
        id: "",
        name: "",
        photo: "",
        url: "",
      },

      submitUserData: {},

      currForm: {},

      formValid: false,

      load: false,
      scroll: false,
    };

    this.topic_id = 798;
    this.topicName = "";

    this.closeRef = React.createRef();

    this.token =
      "f97761ee8a2f12188b1a52d0c7f149ddbeb68151e0dc71c91d945a04eac7f0d0aef3bb0cdbcfe5293ef47";
    this.group_id = 140403026;

    this.submitUserPost = this.submitUserPost.bind(this);
    this.getHeaderStyle = this.getHeaderStyle.bind(this);
    this.showAnimation = this.showAnimation.bind(this);
    this.setModalForm = this.setModalForm.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.stopLoad = this.stopLoad.bind(this);
    this.startLoad = this.startLoad.bind(this);
    this.PostsLoader = this.PostsLoader.bind(this);
    this.openMainApp = this.openMainApp.bind(this);
    this.getTopicForm = this.getTopicForm.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      bridge.send("VKWebAppJoinGroup", { group_id: 160404048 });
    }, 10000);

    this.setState({ headerStyles: this.getHeaderStyle() });
  }

  showAnimation() {
    let show = this.state.show;
    this.setState({ show: !show });
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
        headerLineBot: {
          top: "70px",
        },
        body: {
          top: "70px",
          height: "calc(100% - 125px)",
        },
        collapse: {
          height: "calc(100% - 120px)",
          top: "70px",
        },
      };
    } else {
      return {};
    }
  }

  getTopicForm(form, topicName) {
    let inputs = [];
    let data = {};

    inputs = form.map((input, i) => {
      data[input.title] = "";

      return (
        <div key={i} className="postForm">
          <div className="inputTitle">{input.title}</div>
          {input.type === "textarea" ? (
            <textarea
              className="inputText"
              placeholder={input.hint}
              rows={input.rows}
              onChange={(e) => this.saveForm(input.title, e)}
            ></textarea>
          ) : (
            <input
              className="inputStr"
              placeholder={input.hint}
              onChange={(e) => this.saveForm(input.title, e)}
            />
          )}
        </div>
      );
    });

    this.setState({ currForm: data });

    this.topicName = topicName;

    return <div>{inputs}</div>;
  }

  getTopics() {
    let response = topics.map((topic, i) => {
      return (
        <Transition key={i} in={this.state.show} timeout={100 + i * 150}>
          {(state) => {
            return (
              <div
                className={"btnInfo-" + state}
                style={{ backgroundColor: topic.color }}
                data-toggle="modal"
                data-target="#postModal"
                onClick={() =>
                  this.setModalForm(
                    this.getTopicForm(topic.form, topic.title),
                    {
                      color: topic.color,
                    }
                  )
                }
              >
                <i className={topic.icon}></i> {topic.title}
              </div>
            );
          }}
        </Transition>
      );
    });

    return response;
  }

  setModalText(text) {
    this.setState({ testInfo: text });
  }

  setModalForm(form, style) {
    this.setState({ modalForm: form, modalStyles: style });
    this.getUserData();
  }

  saveForm(key, e) {
    let formData = this.state.currForm;

    formData[key] = e.target.value;

    //let dirty = this.state.text.length > 0;

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
      color: this.state.modalStyles.color,
      topic: this.topicName,
    };

    bridge
      .send("VKWebAppCallAPIMethod", {
        method: "wall.createComment",
        params: {
          owner_id: "-" + this.group_id,
          post_id: this.topic_id,
          message: JSON.stringify(mes),
          from_group: this.group_id,
          v: "5.126",
          access_token: this.token,
        },
      })
      .then((r) => {
        this.setState({ submitUserData: {}, currForm: {}, modalForm: "" });
        this.topicName = "";

        let post = {};
        let posts = this.state.posts;

        post.id = r.response.comment_id;
        post.text = mes.form;

        post.name = mes.user.name;
        post.url = mes.user.url;
        post.user_id = mes.user.id;
        post.photo = mes.user.photo;
        post.color = mes.color;
        post.topic = mes.topic;

        posts.unshift(post);

        this.setState({ posts }, () => {
          this.closeRef.current.click();
        });
      });
  }

  stopLoad() {
    this.setState({ load: false });
  }

  startLoad() {
    this.setState({ scroll: true });
  }

  PostsLoader() {
    let content = document.getElementById("contentWindow");

    let H = content.scrollHeight;
    let currH = content.scrollTop;

    this.currPercent = (100 * currH) / (H - 700);

    if (this.currPercent <= 70) {
      this.startLoad();
    }

    if (this.state.scroll) {
      if (this.currPercent >= 70) {
        this.setState({ load: true, scroll: false });
      }
    }
  }

  openMainApp() {
    bridge.send("VKWebAppOpenApp", { app_id: 7646928 });
  }

  render() {
    let styles = this.state.headerStyles;
    let form = this.state.modalForm;
    let tabs = this.getTopics();
    let formValid = this.state.formValid;

    let show = this.state.show;

    // let bar = <HashRouter>{tabs}</HashRouter>;

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
                  // hidden={!formValid}
                  onClick={this.submitUserPost}
                >
                  опубликовать
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Header" style={styles.header}>
          <span className="titleMark" onClick={this.openMainApp}>
            Мαú
          </span>{" "}
          <span className="titleApp">френдс</span>
          {/* <HashRouter>
            <NavLink className="linkStyle" to="/info">
              <span className="headerBtn">
                <i className="fas fa-info-circle"></i>
              </span>
            </NavLink>
          </HashRouter> */}
        </div>

        {/* <div className="headerLineBot" style={styles.headerLineBot}>
          {bar}
        </div> */}

        <div
          className="collapse navbar-collapse"
          style={styles.collapse}
          id="navbarNavDropdown"
        >
          <div className="infoTitle">выбери тематику</div>
          <br />
          {tabs}
        </div>

        <div
          id="contentWindow"
          className="Body"
          style={styles.body}
          onScroll={this.PostsLoader}
        >
          <HashRouter>
            <Switch>
              <Route exact path="/">
                <InfoPage />
              </Route>
              <Route exact path="/search">
                <FindFriend
                  topic_id={this.topic_id}
                  posts={this.state.posts}
                  topics={tabs}
                  setPosts={(posts) => this.setState({ posts })}
                  load={this.state.load}
                  stopLoad={this.stopLoad}
                  startLoad={this.startLoad}
                />
              </Route>
            </Switch>
          </HashRouter>
          <a href="https://vk.com/warmay" className="linkStyle">
            <div className="copyrightText">Май</div>
          </a>
        </div>
        <div className="footer">
          <HashRouter>
            {!show ? (
              <NavLink className="linkStyle" to="/search">
                <div className="btnFooter">
                  <i className="fas fa-icons"></i>
                </div>
              </NavLink>
            ) : (
              ""
            )}
            <div
              className="btnFooterMain"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              onClick={() => {
                this.showAnimation();
                this.setState({
                  submitUserData: {},
                  currForm: {},
                  modalForm: "",
                });
                this.topicName = "";
              }}
            >
              {!show ? (
                <i className="fas fa-pencil-alt"></i>
              ) : (
                <i className="fas fa-times" ref={this.closeRef}></i>
              )}
            </div>
            {!show ? (
              <NavLink className="linkStyle" to="/">
                <div className="btnFooter">
                  <i className="fas fa-info-circle"></i>
                </div>
              </NavLink>
            ) : (
              ""
            )}
          </HashRouter>
        </div>
      </div>
    );
  }
}

export default Main;
