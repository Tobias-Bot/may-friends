import React from "react";
import bridge from "@vkontakte/vk-bridge";
// import { Route, HashRouter, Switch, NavLink } from "react-router-dom";
import Transition from "react-transition-group/Transition";

import "../styles/Post.css";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedPosts: [],
      show: false,
    };

    this.getRandom = this.getRandom.bind(this);
    this.getSavedPosts = this.getSavedPosts.bind(this);
    this.likePost = this.likePost.bind(this);
  }

  componentDidMount() {
    this.setState({ show: true });

    this.getSavedPosts();
  }

  componentWillUnmount() {
    this.setState({ show: false });
  }

  getSavedPosts() {
    let posts = localStorage.getItem("savedPosts");

    if (posts) {
      this.setState({ savedPosts: posts.split(",") });
    }
  }

  getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
  }

  likePost(id) {
    let posts = [];

    let str = localStorage.getItem("savedPosts");

    if (str) {
      posts = [...posts, ...str.split(",")];
    }

    posts.unshift(`${id}`);

    this.setState({ savedPosts: posts });

    localStorage.setItem("savedPosts", posts.join(","));

    // bridge
    //   .send("VKWebAppGetAuthToken", {
    //     app_id: 7734940, //7706189,
    //     scope: "wall",
    //   })
    //   .then((data) => {
    let token =
      "1cc15217534a491b2e5486ea6b31f92421c151f365a8e987272660177daa23538874e879e3cbf344f0415"; //data.access_token;
    let user_id = this.props.data.user_id;
    let comm_id = this.props.data.id;

    bridge
      .send("VKWebAppCallAPIMethod", {
        method: "wall.createComment",
        params: {
          owner_id: "-140403026",
          post_id: "673",
          message: "hello",
          from_group: "140403026",
          v: "5.126",
          access_token: token,
        },
      })
      .then((r) => {
        let likesCount = r.response;

        console.log(likesCount);
      });
    //});
  }

  dislikePost(id) {
    let posts = localStorage.getItem("savedPosts").split(",");

    let index = posts.findIndex((post_id) => post_id === `${id}`);

    posts.splice(index, 1);

    this.setState({ savedPosts: posts });

    localStorage.setItem("savedPosts", posts.join(","));
  }

  render() {
    let post = this.props.data;
    let index = this.props.index;
    let posts = localStorage.getItem("savedPosts");
    let liked = false;

    if (posts) {
      liked = posts.split(",").includes(`${post.id}`);
    }

    return (
      <div>
        <Transition in={this.state.show} timeout={200 + index * 200}>
          {(state) => {
            return (
              <div
                className="postView"
                //   style={{ backgroundColor: post.color }}
              >
                <a
                  className="linkStyle"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="postPhoto" src={post.photo} alt="avatar" />
                  <div className={"postHeader" + "-" + state}>{post.name}</div>
                </a>
                <div className={"postText" + "-" + state}>{post.text}</div>
                <div
                  className="postLikeBtn"
                  onClick={(e) =>
                    !liked
                      ? this.likePost(post.id, e)
                      : this.dislikePost(post.id, e)
                  }
                >
                  <i className={!liked ? "far fa-heart" : "fas fa-heart"}></i>
                </div>
              </div>
            );
          }}
        </Transition>
      </div>
    );
  }
}

export default Post;
