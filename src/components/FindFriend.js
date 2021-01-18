import React from "react";
import bridge from "@vkontakte/vk-bridge";
// import { Route, HashRouter, Switch, NavLink } from "react-router-dom";
// import Transition from "react-transition-group/Transition";

import Post from "./Post";

import "../App.css";

class FindFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      savedPosts: [],

      show: false,
      postsLoad: true,
    };

    this.offset = 20;
    this.currOffset = 0;

    this.group_id = 140403026;

    this.getPosts = this.getPosts.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.getRandom = this.getRandom.bind(this);
    //this.getSavedPosts = this.getSavedPosts.bind(this);
    this.likePost = this.likePost.bind(this);
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

  //   getSavedPosts() {
  //     let posts = localStorage.getItem("savedPosts");

  //     if (posts) {
  //       this.setState({ savedPosts: posts.split(",") });
  //     }
  //   }

  loadPosts() {
    //this.getSavedPosts();

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
              group_id: this.group_id,
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
            let comms = r.response.items;
            let profiles = r.response.profiles;
            let posts = [];

            for (let i = 0; i < comms.length; i++) {
              if (-this.group_id !== comms[i].from_id) {
                let post = {};
                post.id = comms[i].id;
                post.likes = comms[i].likes.count;
                post.text = comms[i].text;

                let index = profiles.findIndex(
                  (profile) => comms[i].from_id === profile.id
                );

                post.name = profiles[index].first_name;
                post.url = `https://vk.com/id${profiles[index].id}`;
                post.online = profiles[index].online;
                post.photo = profiles[index].photo_50;

                posts.unshift(post);
              }
            }

            this.setState({ posts: [...posts, ...this.state.posts] });
          });
      });

    this.currOffset += this.offset;
  }

  getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
  }

  likePost(id) {
    let posts = this.state.savedPosts;

    posts.unshift(id);

    this.setState({ savedPosts: posts });

    localStorage.setItem("savedPosts", posts.join(","));
  }

  getPosts() {
    let response = this.state.posts.map((post, i) => {
      return <Post key={i} data={post} index={i} />;
    });

    return response;
  }

  render() {
    let posts = this.getPosts();

    return <div>{posts}</div>;
  }
}

export default FindFriend;
