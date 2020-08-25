import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';

import TodoItem from './components/TodoItem';
import styles from './styles';

import {Todo} from './models/Todo';
import TodoService from './services/TodoService';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<string>('');

  useEffect(() => {
    TodoService.index().then(setTodos).catch(console.error);
  }, []);

  async function handleAddTodo(): Promise<void> {
    if (!currentTodo.trim()) {
      return;
    }
    const createdTodo = await TodoService.store(currentTodo);
    setTodos([...todos, createdTodo]);
    setCurrentTodo('');
    Keyboard.dismiss();
  }

  async function handleComplete(id: number): Promise<void> {
    await TodoService.done(id);
    setTodos((oldTodo) =>
      oldTodo.map((todo) => {
        if (todo.id === id) {
          return {...todo, completed: true};
        }
        return todo;
      }),
    );
  }

  async function handleDelete(id: number): Promise<void> {
    await TodoService.destroy(id);
    setTodos((oldTodo) => oldTodo.filter((todo) => todo.id !== id));
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#202225" barStyle="light-content" />
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          value={currentTodo}
          onChangeText={setCurrentTodo}
          testID="todoInput"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddTodo}
          testID="btnAddTodo">
          <Text style={styles.buttonText}>add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.todoList}
        data={todos}
        keyExtractor={(todo) => String(todo.id)}
        renderItem={({item}) => (
          <TodoItem
            data={item}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        )}
      />
    </View>
  );
};

export default App;
