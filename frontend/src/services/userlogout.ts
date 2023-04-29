import axios from 'axios';

interface Payload {
  token: string
}

export default async function getPlayerStats(params: Payload) {
  const { token } = params;
  try {
    await axios.post(process.env.REACT_APP_API_URL + '/auth/logout', { token: token });
    return;
  } catch (error: any) {
    // eslint-disable-next-line no-throw-literal
    throw {
      msg: error.response.data
    };
  }
}