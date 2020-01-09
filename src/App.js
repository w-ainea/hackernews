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

class App extends Component {
  // the constructor is used to initialise local component  state
  constructor(props) {
    // set this.props in the constructor for access
    super(props);

    // state of the component
    this.state = {
      list
    };

    this.onDismiss = this.onDismiss.bind(this);
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

  // the render method runs everytime state of the component changes in order to update the view
  render() {
    // destructure the list property of state
    const { list } = this.state;

    return (
      <div className="App">
        {list.map(item => {
          /* const onHandleDismiss=()=> this.onDismiss(item.objectID); */

          return (
            <div key={item.objectID}>
              <span>
                <a href="{item.url}"> {item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button
                  /* return a function that gets executed every time the button is clicked */
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                >
                  Dismiss
                </button>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
