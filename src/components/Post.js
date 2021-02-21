import React from "react";
import bridge from "@vkontakte/vk-bridge";
import Transition from "react-transition-group/Transition";

import "../styles/Post.css";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.data,
      savedPosts: [],
      show: false,
      like: false,
    };

    this.topic_id = 798;
    this.topicName = "";

    this.token =
      "f97761ee8a2f12188b1a52d0c7f149ddbeb68151e0dc71c91d945a04eac7f0d0aef3bb0cdbcfe5293ef47";
    this.group_id = 140403026;

    this.getSavedPosts = this.getSavedPosts.bind(this);
    this.likePost = this.likePost.bind(this);
    this.getPostText = this.getPostText.bind(this);
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

  getPostText() {
    let form = this.props.data.text;
    let text = "";

    for (let key in form) {
      if (form[key].length)
        text += `<b>${!key ? "P.S." : key}</b>: ${form[key]}<br/><br/>`;
    }

    return text;
  }

  likePost() {
    if (!this.state.like) {
      let post = this.props.data;
      // let user = this.props.user;

      // let userLike = {
      //   name: user.name,
      //   photo: user.photo,
      //   url: user.url,
      //   color: post.color,
      //   topic: post.topic,
      // };

      bridge
        .send("VKWebAppCallAPIMethod", {
          method: "wall.createComment",
          params: {
            owner_id: "-" + this.group_id,
            post_id: this.topic_id,
            message:  "like", // JSON.stringify(userLike),
            from_group: this.group_id,
            reply_to_comment: post.id,
            v: "5.126",
            access_token: this.token,
          },
        })
        .then((r) => {
          post.likes += 1;
          this.setState({ like: true, post });
        });
    }
  }

  render() {
    let post = this.state.post;
    let index = this.props.index;
    let postColor = post.color;
    let text = this.getPostText();

    let todayTime = new Date();
    let todayDate = todayTime.toLocaleString("ru", {
      day: "numeric",
      weekday: "short",
    });

    let time = new Date(post.date * 1000);
    let date = time.toLocaleString("ru", {
      day: "numeric",
      weekday: "short",
    });

    return (
      <div>
        <Transition in={this.state.show} timeout={index * 5}>
          {(state) => {
            return (
              <div className="postView">
                <div className={"postHeader-" + state}>
                  <div className="row">
                    <a
                      className="linkStyle"
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className={"postPhoto-" + state}
                        src={post.photo}
                        alt="avatar"
                      />
                    </a>
                    <div className="col-6">
                      {post.name}
                      <br />
                      <div
                        className={"topicName-" + state}
                        style={{ backgroundColor: post.color }}
                      >
                        {post.topic}
                      </div>
                    </div>
                    <div className="col-3 postInfo">
                      <i className="fas fa-calendar-week"></i>
                      {todayDate === date ? " сегодня" : ` ${date}`}
                      <br />
                      <i className="fas fa-heart"></i> {post.likes}
                    </div>
                  </div>
                </div>

                <div
                  className={"postText-" + state}
                  style={{ backgroundColor: postColor }}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
                <a
                  className="linkStyle"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={"postMsgBtn-" + state}
                    style={{ backgroundColor: postColor }}
                  >
                    <i className="fas fa-comment"></i>
                  </div>
                </a>
                <div
                  className={"postLikeBtn-" + state}
                  style={{ backgroundColor: postColor }}
                  onClick={this.likePost}
                >
                  <i
                    className={
                      !this.state.like ? "far fa-heart" : "fas fa-heart"
                    }
                  ></i>
                </div>
                {/* <div
                  className={"shareBtn" + "-" + state}
                  style={{ backgroundColor: postColor }}
                  onClick={(e) =>
                    !liked
                      ? this.likePost(post.id, e)
                      : this.dislikePost(post.id, e)
                  }
                >
                  {!liked ? (
                    <div>
                      <i className="far fa-heart"></i>
                    </div>
                  ) : (
                    <div>
                      <i className="fas fa-heart"></i>
                    </div>
                  )}
                </div>*/}
                {/* <div
                  className={"shareBtn-" + state}
                  style={{ backgroundColor: postColor }}
                  onClick={this.sharePost}
                >
                  <i className="fas fa-share"></i>
                </div> */}
              </div>
            );
          }}
        </Transition>
        <br />
        <br />
      </div>
    );
  }
}

export default Post;
