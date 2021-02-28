import React from "react";
import bridge from "@vkontakte/vk-bridge";
// import { Route, HashRouter, Switch, NavLink } from "react-router-dom";
// import Transition from "react-transition-group/Transition";

import topics from "../data/topics";
import Post from "./Post";

import "../App.css";

class FindFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
      savedPosts: [],
      checkedTopics: [],

      show: false,
      postsLoad: true,
      justUploaded: false,
    };

    this.offset = 35;
    this.currOffset = 0;

    this.group_id = 140403026;
    this.post_id = this.props.topic_id;
    this.lastComm = 0;

    this.getPosts = this.getPosts.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
    this.shareTopic = this.shareTopic.bind(this);
    this.getTopics = this.getTopics.bind(this);
    this.checkTopic = this.checkTopic.bind(this);
    this.uncheckTopic = this.uncheckTopic.bind(this);
    this.uncheckAllTopics = this.uncheckAllTopics.bind(this);
    this.getPostLikes = this.getPostLikes.bind(this);
  }

  componentDidMount() {
    this.setState({ show: true });

    this.getPostLikes();
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

  getTopics() {
    let checkedTopics = this.state.checkedTopics;

    let response = topics.map((topic, i) => {
      let t = checkedTopics.includes(topic.title);

      return (
        <div
          key={topic.title}
          className={"btnInfo"}
          style={
            t
              ? {
                  backgroundColor: topic.color,
                }
              : { backgroundColor: "rgba(37, 37, 51)", color: "#b9bfff" }
          }
          onClick={() =>
            t ? this.uncheckTopic(topic.title) : this.checkTopic(topic.title)
          }
        >
          <i className={topic.icon}></i> {topic.title}
        </div>
      );
    });

    return response;
  }

  checkTopic(topic) {
    let checked = this.state.checkedTopics;

    checked.unshift(topic);

    this.setState({ checkedTopics: checked });
  }

  uncheckTopic(topic) {
    let checked = this.state.checkedTopics;

    checked.splice(
      checked.findIndex((title) => title === topic),
      1
    );

    this.setState({ checkedTopics: checked });
  }

  uncheckAllTopics() {
    this.setState({ checkedTopics: [] });
  }

  getPostLikes() {
    bridge
      .send("VKWebAppStorageGet", {
        keys: ["may-friends"],
      })
      .then((r) => {
        let likes = r.keys[0].value.split(",");

        // console.log(likes);

        this.setState({ savedPosts: likes });
      });
  }

  loadPosts() {
    this.setState({ postsLoad: true });

    bridge
      .send("VKWebAppGetAuthToken", {
        app_id: 7738603, // 7706189,
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
              // thread_items_count: 10,
              v: "5.126",
              access_token: token,
            },
          })
          .then((r) => {
            let comms = r.response.items;
            let posts = [];

            // console.log(comms);

            if (comms.length) {
              for (let i = 0; i < comms.length; i++) {
                let postData = JSON.parse(comms[i].text);

                let post = {};

                post.id = comms[i].id;
                post.date = comms[i].date;
                post.text = postData.form;
                post.likes = comms[i].thread.count;

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
            }
          })
          .catch((e) => {
            console.log("it's ok");
            this.setState({ postsLoad: false });
          });
      });

    this.currOffset += this.offset;
  }

  getPosts() {
    let filter = this.state.checkedTopics;

    let response = this.props.posts.map((post, i) => {
      return (
        <div key={post.topic + i}>
          {!filter.length || filter.includes(post.topic) ? (
            <Post data={post} index={i} user={this.props.user} savedPosts={this.state.savedPosts} />
          ) : (
            <div></div>
          )}
        </div>
      );
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
    let checkedTopics = this.state.checkedTopics;
    let bar = this.getTopics();

    return (
      <div>
        <div className="headerLineBot">{bar}</div>
        <br />
        <div
          className="shareTopicBtn"
          style={justUploaded ? { opacity: "0.5" } : {}}
          onClick={() => {
            if (!justUploaded) this.updatePosts();
          }}
        >
          <i className="fas fa-redo-alt"></i>
        </div>
        <br />
        <div
          className="shareTopicBtn"
          hidden={!checkedTopics.length}
          onClick={this.uncheckAllTopics}
        >
          показать все
        </div>
        <hr />

        {posts}

        <div className="Loading" hidden={!isShow}>
          <div className="spinner-border" role="status"></div>{" "}
          <span className="LoadingText">секундочку...</span>
        </div>

        <br />
        {/* <div
          className="shareTopicBtn"
          hidden={posts.length < this.offset}
          onClick={() => bridge.send("VKWebAppScroll", { top: 1, speed: 600 })}
        >
          ↑ наверх ↑
        </div> */}
        <hr />
      </div>
    );
  }
}

export default FindFriend;
