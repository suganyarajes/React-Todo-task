import React, { useState } from 'react';
import "./App.css";
import TodoList from './TodoList.jsx';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', status: '' });
  const [filter, setFilter] = useState('All');
  const [editingIndex, setEditingIndex] = useState(null);

  const addTodo = () => {
    if (newTask.name.trim() === '') return;

    if (editingIndex !== null) {
      
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = { ...newTask };
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
     
      setTodos([...todos, { ...newTask }]);
    }

    setNewTask({ name: '', description: '', status: 'Completed' });
  };

  const startEdit = (index) => {
    
    setEditingIndex(index);
    setNewTask({ ...todos[index] });
  };

  const cancelEdit = () => {

    setEditingIndex(null);
    setNewTask({ name: '', description: '', status: 'Not Completed' });
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setEditingIndex(null); 
  };

  const filterTodos = (status) => {
    setFilter(status);
  };

  return (
    
    <div className='container'>
     <h1>TODO APP</h1>
      <div className="mb-3">
        <div className="col-10">
          <div className="row">
            <label>
              Task Name:
              <input
                type="text"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
            </label>
          </div>
        </div>

        <div className="col-10">
          <div className="row">
            <label>
              Description:
              <input
                type="text"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </label>
          </div>
        </div>
        <div className="list-group mt-2">
        <div className='col-8'>
          <h6>Status:</h6>
          <select className="form-select"  value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })} >
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </div>
      </div>
        <button type="button" className="btn btn-secondary btn-sm" onClick={addTodo}>
          {editingIndex !== null ? 'Update Todo' : 'Add Todo'}
        </button>
        {editingIndex !== null && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={cancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>

      <div className="list-group mt-2">
        <div className='col-8'>
          <h6>Filter:</h6>
          <select className="form-select" onChange={(e) => filterTodos(e.target.value)}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </div>
      </div>
      <h3>RESULT:</h3>
      <div className="list-group list-group-horizontal mt-4">
        {todos.map((todo, index) => (
          <div className="result" key={index}>
            
            <TodoList
              todos={[todo]}
              editTodo={startEdit}
              deleteTodo={deleteTodo}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoApp;
