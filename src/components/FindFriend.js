import React from "react";
import bridge from "@vkontakte/vk-bridge";
// import { Route, HashRouter, Switch, NavLink } from "react-router-dom";
import Transition from "react-transition-group/Transition";

import "../App.css";

class FindFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],

      show: false,
      postsLoad: true,
    };

    this.offset = 20;
    this.currOffset = 0;

    this.getPosts = this.getPosts.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.getRandom = this.getRandom.bind(this);
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
    let posts = this.state.posts;
    let newPosts = [];

    bridge
      .send("VKWebAppGetAuthToken", {
        app_id: 7706189,
        scope: "wall",
      })
      .then((data) => {
        let token = data.access_token;

        bridge
          .send("VKWebAppCallAPIMethod", {
            method: "board.getComments",
            params: {
              group_id: "140403026",
              topic_id: "46804450",
              need_likes: 1,
              count: this.offset,
              //offset: this.currOffset,
              sort: "desc",
              extended: 1,
              v: "5.126",
              access_token: token,
            },
          })
          .then((r) => {
              console.log(r);
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
      return (
        <div key={i}>
          <Transition in={this.state.show} timeout={200 + i * 150}>
            {(state) => {
              return (
                <div
                  className={"postView" + "-" + state}
                  //   style={{ backgroundColor: post.color }}
                >
                  {post.text}
                </div>
              );
            }}
          </Transition>
        </div>
      );
    });

    return response;
  }

  render() {
    let posts = this.getPosts();

    return <div>{posts}</div>;
  }
}

export default FindFriend;
