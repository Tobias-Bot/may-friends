import React from "react";
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
    //this.likePost = this.likePost.bind(this);
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

  getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
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

  // likePost(id) {
  //   let posts = [];

  //   let str = localStorage.getItem("savedPosts");

  //   if (str) {
  //     posts = [...posts, ...str.split(",")];
  //   }

  //   posts.unshift(`${id}`);

  //   this.setState({ savedPosts: posts });

  //   localStorage.setItem("savedPosts", posts.join(","));
  // }

  // dislikePost(id) {
  //   let posts = localStorage.getItem("savedPosts").split(",");

  //   let index = posts.findIndex((post_id) => post_id === `${id}`);

  //   posts.splice(index, 1);

  //   this.setState({ savedPosts: posts });

  //   localStorage.setItem("savedPosts", posts.join(","));
  // }

  render() {
    let post = this.props.data;
    let index = this.props.index;
    let postColor = post.color;
    let text = this.getPostText();

    return (
      <div>
        <Transition in={this.state.show} timeout={100 + index * 150}>
          {(state) => {
            return (
              <div
                className="postView"
                //   style={{ backgroundColor: post.color }}
              >
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
                    <div className="col">
                      {post.name}
                      <br />
                      <div
                        className={"topicName-" + state}
                        style={{ backgroundColor: post.color }}
                      >
                        {post.topic}
                      </div>
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
                    className={"postLikeBtn-" + state}
                    style={{ backgroundColor: postColor }}
                  >
                    <i className="fas fa-comment"></i>
                  </div>
                </a>
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
      </div>
    );
  }
}

export default Post;
