import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const ClearButton = ({removeCompleted}) => {  
  return <button onClick={() => removeCompleted()}> Clear Completed </button>;
}

//just return JSX
//stateless always pure functions
//presentation component
const ToDoCount = ({ number }) => {
    return <p> {number} {(number <= 1) ? 'todo' : 'todos' } </p>;

}

const TodoItem = ({item, toggleComplete, removeToDo }) => {  
  return (
    <li>
      { item.title }
      <input type="checkbox" 
            id = {item.id} 
            checked = {item.complete} 
            onChange = {() => toggleComplete(item)}
      />
        <label htmlFor={item.id} />
        <button onClick={() => removeToDo(item)}>
          <i className="fa fa-trash" />
        </button>
    </li>
  );
};


//pass 'props' as args if needs to access props from the parent. 
class App extends Component {
  constructor() {
    super()
    this.state = {
      showIt: true,
      todos: [
        { id: 0, title: 'Grocery shopping', complete: false },
        { id: 1, title: 'Take cat to the vet', complete: false },
        { id: 2, title: 'Master react skills', complete: false },
      ],
      lastId: 3
    }
    this.toDoInput = React.createRef();
  }
  toggleComplete = (item) => {
    const todosList = this.state.todos.map((todo) => {
      if (todo.id === item.id) todo.complete = !todo.complete;
      return todo;    
    });
    // key and value are the same
    this.setState({ todosList });
  }

  removeToDo = item => {
    const todos = this.state.todos.filter(todo =>
      todo.id !== item.id);
      this.setState({ todos });
  };

  removeCompleted = () => {
    const todos = this.state.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  };

  hasCompleted = () => {
    const todos = this.state.todos.filter(todo => todo.complete);
    return todos.length > 0 ? true : false;

  }

  addToDo = (event) => {
    event.preventDefault();
    let toDoInput = this.toDoInput.current;

    if(toDoInput.value){
      const nextId = this.state.lastId + 1

      //spread operator to include the previous list items
      const todos = [...this.state.todos, {id: nextId, title: toDoInput.value, complete: false},
      ];
      //lastId is the key and nextId is the value 
      this.setState({ todos, lastId: nextId })
      toDoInput.value = '';
    }   
  };

  componentDidMount(){
    this.toDoInput.current.focus();
  }

  render() {
    return (
      <div className="todo-list">
        <h1>So Much Todo</h1>   
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
            <input type="text" ref={this.toDoInput} />
            <span>(press enter to add)</span>
          </form>
 
        </div>
          {
            this.state.showIt ? (
            <ul>
              {this.state.todos.map((todo) => (
                <TodoItem item = {todo} 
                          key = {todo.id} 
                          toggleComplete = {this.toggleComplete}
                          removeToDo = {this.removeToDo} />
              ))}
            </ul>) : (<p> No items to show, empty to do list.</p>
            )}
         
        <div className="todo-admin">
            <ToDoCount number={this.state.todos.length} />
              {this.hasCompleted() && (<ClearButton removeCompleted={this.removeCompleted} /> )}
   
        </div>

      </div>
    );
  }
} 

export default App;

//If my prop is not required, I should have a default prop. 

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired,
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired

  }).isRequired,

};

ClearButton.protoTypes = {
  removeCompleted: PropTypes.func.isRequired,

};


