renderPosts = async () => {
    try {
      let res = await axios.get('/posts');
      let posts = res.data;
      return  posts.map((post, i) => {
        return (
          <li key={i} className="list-group-item">{post.text}</li>
        );
      });
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    return (
      <div>
        <ul className="list-group list-group-flush">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }

  //

  componentDidMount() {
    this.renderPosts();
  }
  
  renderPosts = async() => {
    try {
      let res = await axios.get('/posts');
      let posts = res.data;
      // this will re render the view with new data
      this.setState({
        Posts: posts.map((post, i) => (
          <li key={i} className="list-group-item">{post.text}</li>
        ))
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  render() {
    return (
      <div>
        <ul className="list-group list-group-flush">
          {this.state.Posts}
        </ul>
      </div>
    );
  }