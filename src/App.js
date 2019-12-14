import React, { Component } from 'react';
import{ BrowserRouter as Router, Route} from 
'react-router-dom';
import Todos from './components/Todos'
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
import uuid from 'uuid'
import axios from 'axios';

import './App.css';


class App extends Component{
  state= {
    todos: [
      {
        id: uuid.v4(),
        title: 'Governor is on a date with Chi',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Lati is on a date with Ezinne',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Uzor is on a date with Lizzy',
        completed: false
      },
    ]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res => this.setState({ todos: res.data}))
  }
//Toggle Complete
markComplete = (id)=>{
  this.setState({ todos: this.state.todos.map(todo =>{
    if(todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo;
  })});
}
//Delete Todo
delTodo = (id) =>{
  axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
  .then(res =>this.setState({ todos: [...this.state.todos.filter(todo =>
    todo.id!== id)]}));
}

//Add Todo
addTodo = (title) =>{
  const newTodo = {
    id:uuid.v4(),
    title,
    completed: false
  }
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    title,
    completed: false
  })
  .then(res => this.setState({ todos: 
    [...this.state.todos, res.data], newTodo }));
  
}

render(){
   return (
     <Router>
      <div className="App">
        <div className="container">
        <Header />
        <Route exact path="/" render={props=>(
          <React.Fragment>
          <AddTodo addTodo={this.addTodo}/>
          <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
          </React.Fragment>
        )}/>
        <Route path="/about" component={About} />
        
        </div>
    </div>
   </Router>
  );
 }
}

export default App;
