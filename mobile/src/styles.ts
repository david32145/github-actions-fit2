import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202225',
    padding: 20,
  },
  form: {
    flexDirection: 'row',
  },
  textInput: {
    height: 45,
    flex: 1,
    fontSize: 16,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  button: {
    height: 45,
    width: 70,
    marginLeft: 15,
    borderRadius: 5,
    backgroundColor: '#dc143c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 28,
    marginBottom: 20,
  },
  todoList: {
    marginTop: 18,
  },
});

export default styles;
