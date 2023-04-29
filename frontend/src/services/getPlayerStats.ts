import axios from 'axios';
import { Player } from '../common/types';

interface Response {
  msg?: string;
  players?: Player[];
}

interface Payload {
  token: string
}

export default async function getPlayerStats(params: Payload): Promise<Response> {
  const { token } = params;
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/user/playerStats', { params: { token: token } });
    return {
      players: response.data
    };
  } catch (error: any) {
    // eslint-disable-next-line no-throw-literal
    throw {
      msg: error.response.data
    };
  }
}