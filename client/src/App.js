import React from 'react';
import axios from 'axios';


import './App.css';

class App extends React.Component {

  state = {
    researchTitle: '',
    professorName: '',
    professorEmail: '',
    researchDescription: '',
    posts: []
  };

  componentDidMount = () => {
    this.getResearchPost();
  };


  getResearchPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };


  submit = (event) => {
    event.preventDefault();

    const payload = {
      researchTitle: this.state.researchTitle,
      professorName: this.state.professorName,
      professorEmail: this.state.professorEmail,
      projectDescription: this.state.projectDescription,
    };


    axios({
      url: 'http://localhost:3000/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getResearchPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };

  resetUserInputs = () => {
    this.setState({
      researchTitle: '',
      professorName: '',
      professorEmail: '',
      projectDescription: '',
    });
  };

  displayBlogPost = (posts) => {

    if (!posts.length) return null;


    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.researchTitle}</h3>
        <p>{post.professorName}</p>
        <p>{post.professorEmail}</p>
        <p>{post.projectDescription}</p>
      </div>
    ));
  };




  render() {

    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
        <div className="topnav">
          <a className="left">Research.r</a>
          <a className="right">University of Calgary</a>
          </div>
        <h1 className='title'>Post your research</h1>
        <div id='form'>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input 
              type="text"
              name="researchTitle"
              placeholder="Research Title"
              value={this.state.researchTitle}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input 
              type="text"
              name="professorName"
              placeholder="Name"
              value={this.state.professorName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input 
              type="text"
              name="professorEmail"
              placeholder='Email'
              value={this.state.professorEmail}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="Project Description alongside candidate requirements such as program, year of study, etc."
              name="projectDescription"
              cols="30"
              rows="10"
              value={this.state.projectDescription}
              onChange={this.handleChange}
            >
              
            </textarea>
          </div>

          <button>Submit</button>
        </form>
        </div>

        <h1 className= 'title'> Research Opportunities </h1>

        <div className="blog-">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}


export default App;