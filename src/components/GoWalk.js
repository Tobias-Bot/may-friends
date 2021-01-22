import React from "react";
import bridge from "@vkontakte/vk-bridge";
// import { Route, HashRouter, Switch, NavLink } from "react-router-dom";
// import Transition from "react-transition-group/Transition";

import Post from "./Post";

import "../App.css";

class GoWalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      savedPosts: [],

      show: false,
      postsLoad: true,

      city: "",
      text: "",
      ps: "",
    };

    this.info = `найти того, с кем можно погулять`;

    this.offset = 20;
    this.currOffset = 0;

    this.group_id = 140403026;
    this.post_id = 729;
    this.lastComm = 0;

    this.getPosts = this.getPosts.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.setModalForm = this.setModalForm.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
  }

  componentDidMount() {
    this.setState({ show: true });

    this.loadPosts();
    //this.props.startLoad();
  }

  componentWillUnmount() {
    this.setState({ show: false });
  }

  componentDidUpdate() {
    if (this.props.load) {
      this.loadPosts();
      this.props.stopLoad();
    }
  }

  loadPosts() {
    bridge
      .send("VKWebAppGetAuthToken", {
        app_id: 7706189,
        scope: "wall",
      })
      .then((data) => {
        let token = data.access_token;

        bridge
          .send("VKWebAppCallAPIMethod", {
            method: "wall.getComments",
            params: {
              owner_id: "-" + this.group_id,
              post_id: this.post_id,
              start_comment_id: this.lastComm,
              count: this.offset,
              sort: "desc",
              v: "5.126",
              access_token: token,
            },
          })
          .then((r) => {
            let comms = r.response.items;
            let posts = [];

            for (let i = 0; i < comms.length; i++) {
              let post = {};
              let postData = JSON.parse(comms[i].text);

              post.id = comms[i].id;
              post.text = postData.form.text;

              post.name = postData.user.name;
              post.url = postData.user.url;
              post.user_id = postData.user.id;
              post.photo = postData.user.photo;

              posts.push(post);

              if (i === comms.length - 1) {
                this.lastComm = comms[i].id - 1;
              }
            }

            this.setState({
              posts: [...this.state.posts, ...posts],
              postsLoad: false,
            });
          })
          .catch((e) => {
            console.log("it's ok");
          });
      });

    this.currOffset += this.offset;
  }

  getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
  }

  getPosts() {
    let response = this.state.posts.map((post, i) => {
      return <Post key={i} data={post} index={i} color={this.props.color} />;
    });

    return response;
  }

  updatePosts() {
    //let posts = [];

    this.lastComm = 0;
    this.setState({ posts: [] });

    this.loadPosts();
  }

  saveForm() {
    let formData = {
      text: this.state.text,
      ps: this.state.ps,
    };

    this.props.onSubmitForm(formData, this.post_id);
  }

  setModalForm() {
    let form = (
      <div className="postForm">
        {/* <input
          className="inputStr"
          placeholder="Укажи свой город"
          onChange={(e) =>
            this.setState({ city: e.target.value }, this.saveForm)
          }
        /> */}
        <textarea
          className="inputText"
          placeholder="Текст"
          onChange={(e) =>
            this.setState({ text: e.target.value }, this.saveForm)
          }
        ></textarea>
        <textarea
          className="inputText"
          placeholder="P.S."
          onChange={(e) => this.setState({ ps: e.target.value }, this.saveForm)}
        ></textarea>
      </div>
    );

    let styles = {
      color: this.props.color,
    };

    this.props.onSetForm(form, styles);
  }

  render() {
    let posts = this.getPosts();
    let color = this.props.color;

    return (
      <div>
        <div className="infoText">{this.info}</div>

        {posts}

        <div className="topicFooter" style={{ borderColor: color }}>
          <div
            className="postBtn"
            style={{ color: color, borderColor: color }}
            onClick={this.updatePosts}
          >
            <i className="fas fa-redo-alt"></i>
          </div>
          <div
            className="postBtn"
            style={{ color: color, borderColor: color }}
            data-toggle="modal"
            data-target="#postModal"
            onClick={this.setModalForm}
          >
            <i className="fas fa-pencil-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default GoWalk;
