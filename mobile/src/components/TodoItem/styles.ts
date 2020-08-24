import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  todoTitle: {
    color: '#FFF',
    fontSize: 20,
  },
  completedText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  completeButton: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  completeText: {
    color: 'rgb(0, 177, 0)',
  },
  deleteText: {
    color: '#F00',
  },
});

export default styles;
