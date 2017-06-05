import React from 'react';
import Todo from "../components/Todo";
import TodoStrore from "../stores/TodoStore";
import * as TodoActions from "../actions/TodoActions";
export  default class Todos extends  React.Component{

    constructor(){
        super();
        this.state={
            todos: TodoStrore.getAll()
        }
    }
    componentWillMount(){
        TodoStrore.on("change", ()=>{
            this.setState({
                todos: TodoStrore.getAll()
            });
        });
    }

    createTodo(){
        TodoActions.createTodo(Date.now());
    }

    render(){
        const { todos} =  this.state;
        const TodoComponents = todos.map((todo)=> {
            return <Todo key={todo.id}{...todo}/>
        });
        return(
            <div>
                <button onClick={this.createTodo.bind(this)}>Click</button>
                <h3>Todos</h3>
                <ul>{TodoComponents}</ul>
            </div>
        )
    }
}