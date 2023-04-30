import axios from 'axios';

interface Player {
  id: string,
  name: string;
  onlineStatus: string;
  challengeStatus: string;
}

interface Response {
  msg?: string;
  players?: Player[];
}

interface Payload {
  token: string
}

export default async function getPlayers(params: Payload): Promise<Response> {
  const { token } = params;
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/player/all', { params: { token: token } });
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