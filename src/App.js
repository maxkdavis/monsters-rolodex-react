import { Component } from "react";
import "./App.css";

//"https://jsonplaceholder.typicode.com/users"


class App extends Component {
  constructor() {
    super();

    //setting searchField (captures the user's input) as a state so we can access anywhere in the component
    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  //function to handle user typing into the input box
  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
      return { searchField };
    });
  }

  //we're using this method so that it fires as soon as React renders the page for the first time
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        this.setState({ monsters: users });
      });
  }

  render() {
    //destructuring properties from this.state
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;


    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField)
    })

    return (
      <div className='App'>
        <input
          className="search-box"
          type="search"
          placeholder="Find Monsters"
          onChange={onSearchChange}
        />

        {filteredMonsters.map((monster) => {
          return <h1 key={monster.id}>{monster.name}</h1>;
        })}
      </div>
    );
  }
}

export default App;
