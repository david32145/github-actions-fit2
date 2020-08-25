import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Todo} from '../../models/Todo';
import styles from './styles';

interface TodoItemProps {
  data: Todo;
  onDelete: (id: number) => Promise<void>;
  onComplete: (id: number) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({data, onDelete, onComplete}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.todoTitle} testID="todoTitle">
        {data.title}
      </Text>
      {data.completed ? (
        <Text style={styles.completedText}>completed</Text>
      ) : (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => onDelete(data.id)}
            testID="btnDeleteTodo">
            <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onComplete(data.id)}
            testID="btnDoneTodo">
            <Text style={[styles.buttonText, styles.completeText]}>
              Complete
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TodoItem;
