import React, { Component } from "react";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://reactjs.org",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

// filter functionality
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  // the constructor is used to initialise local component  state
  constructor(props) {
    // set this.props in the constructor for access
    super(props);

    // state of the component
    this.state = {
      list,
      searchTerm: ""
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  // function to remove items from the list when the dismiss button is clicked
  onDismiss(id) {
    // function to determine if the id of the clicked item matched that of the item on the list
    const isNotId = item => item.objectID !== id;
    // update the list depending on the returned value from the isNotId function
    const updatedList = this.state.list.filter(isNotId);
    // update the state of the component
    this.setState({ list: updatedList });
  }
  // function to filter the output based on what the user inputs into the form
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // the render method runs everytime state of the component changes in order to update the view
  render() {
    // destructure the properties of state
    const { list, searchTerm } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
          <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => (
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>
);

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => {
      /* const onHandleDismiss=()=> this.onDismiss(item.objectID); */
      return (
        <div key={item.objectID} className="table-row">
          <span>
            <a href="{item.url}"> {item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
            <Button
              /* return a function that gets executed every time the button is clicked */
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      );
    })}
  </div>
);

const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default App;
