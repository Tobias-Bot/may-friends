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
      posts: this.props.posts,

      show: false,
      postsLoad: true,
      justUploaded: false,
    };

    this.offset = 30;
    this.currOffset = 0;

    this.group_id = 140403026;
    this.post_id = this.props.topic_id;
    this.lastComm = 0;

    this.getPosts = this.getPosts.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
    this.shareTopic = this.shareTopic.bind(this);
  }

  componentDidMount() {
    this.setState({ show: true });

    this.updatePosts();

    // setInterval(() => {
    //   this.updatePosts();
    // }, 300000);
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
        app_id: 7738603,
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
              post.text = postData.form;

              post.name = postData.user.name;
              post.url = postData.user.url;
              post.user_id = postData.user.id;
              post.photo = postData.user.photo;
              post.color = postData.color;
              post.topic = postData.topic;

              posts.push(post);

              if (i === comms.length - 1) {
                this.lastComm = comms[i].id - 1;
              }
            }

            this.setState(
              {
                posts: [...this.state.posts, ...posts],
                postsLoad: false,
              },
              () => {
                this.props.setPosts(this.state.posts);
              }
            );
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
    let response = this.props.posts.map((post, i) => {
      return <Post key={i} data={post} index={i} />;
    });

    return response;
  }

  updatePosts() {
    this.lastComm = 0;
    this.setState({ posts: [], postsLoad: true, justUploaded: true }, () => {
      this.props.setPosts(this.state.posts);
    });

    this.loadPosts();

    setTimeout(() => {
      this.setState({ justUploaded: false });
    }, 60000);
  }

  shareTopic() {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7738603#" + this.props.data.url,
    });
  }

  render() {
    let posts = this.getPosts();
    let isShow = this.state.postsLoad;
    let justUploaded = this.state.justUploaded;

    return (
      <div>
        <div className="infoText">лента</div>
        <div
          className="shareTopicBtn"
          style={justUploaded ? { opacity: "0.5" } : {}}
          onClick={() => {
            if (!justUploaded) this.updatePosts();
          }}
        >
          обновить
        </div>

        <div className="Loading" hidden={!isShow}>
          <div className="spinner-border" role="status"></div>{" "}
          <span className="LoadingText">секундочку...</span>
        </div>

        {posts}
      </div>
    );
  }
}

export default FindFriend;
