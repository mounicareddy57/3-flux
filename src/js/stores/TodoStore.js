import {EventEmitter} from "events";

import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter{
    constructor(){
        super();
        this.todos = [
            {
                id: 123,
                text: "Code",
                complete: false
            },
            {
                id: 453,
                text: "Read",
                complete: true
            }
        ];
    }

    createTodo(text){
        const id = Date.now();
        this.todos.push({
            id,
            text,
            complete:false
        });
        this.emit("change");
    }

    getAll(){
        return this.todos;
    }

    handleActions(action){
        console.log("Received an action: ", action);
        switch (action.type){
            case "CREATE":{
                this.createTodo(action.text);
            }
        }
    }

}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.dispatcher = dispatcher;
window.todoStore = todoStore;
export default todoStore;