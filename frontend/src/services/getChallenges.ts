import axios from 'axios';
import { Challenge } from '../common/types';

interface Response {
  msg?: string;
  challengs?: Challenge[];
}

interface Payload {
  token: string
}

export default async function getChallenges(params: Payload): Promise<Response> {
  const { token } = params;
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/challenge/all', { params: { token: token } });
    return {
      challengs: response.data
    };
  } catch (error: any) {
    // eslint-disable-next-line no-throw-literal
    throw {
      msg: error.response.data
    };
  }
}