import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-config', () => ({
  REACT_NATIVE_API_URL: 'http://localhost:3333',
}));
