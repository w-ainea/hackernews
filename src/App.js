import React, { Component } from "react";
import "./App.css";

// url constants
const DEFAULT_QUERY = "redux";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

class App extends Component {
  // the constructor is used to initialise local component  state
  constructor(props) {
    // set this.props in the constructor for access
    super(props);

    // state of the component
    this.state = {
      // list,
      searchTerm: DEFAULT_QUERY,
      result: null
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  // function to remove items from the list when the dismiss button is clicked
  onDismiss(id) {
    // function to determine if the id of the clicked item matched that of the item on the list
    const isNotId = item => item.objectID !== id;
    // update the list depending on the returned value from the isNotId function
    const updatedHits = this.state.result.hits.filter(isNotId);
    // update the state of the component
    this.setState({ result: { ...this.state.result, updatedHits } });
  }
  // function to filter the output based on what the user inputs into the form
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  // fetch results from the HackerNews API
  onSearchSubmit(evt) {
    evt.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(err => err);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  // the render method runs everytime state of the component changes in order to update the view
  render() {
    // destructure the properties of state
    const { result, searchTerm } = this.state;

    // return null if there is no result
    if (!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
          {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button type="submit"> {children}</button>
  </form>
);

const Table = ({ list, onDismiss }) => (
  <div className="table">
    {list.map(item => {
      /* const onHandleDismiss=()=> this.onDismiss(item.objectID); */
      return (
        <div key={item.objectID} className="table-row">
          <span style={{ width: "40%" }}>
            <a href="{item.url}"> {item.title}</a>
          </span>
          <span style={{ width: "30%" }}>{item.author}</span>
          <span style={{ width: "10%" }}>{item.num_comments}</span>
          <span style={{ width: "10%" }}>{item.points}</span>
          <span style={{ width: "10%" }}>
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
