import axios from 'axios';
import EnvConfig from 'react-native-config';

const ApiRESTService = axios.create({
  baseURL: EnvConfig.REACT_NATIVE_API_URL,
});

export default ApiRESTService;
