import axios from 'axios';

interface Payload {
  token: string;
  challengedId: string;
}

interface Response {
  msg: string;
}

export default async function playerChallenge(params: Payload): Promise<Response> {
  const { token, challengedId } = params;
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + '/challenge/create', { token, challengedId });
    return {
      msg: response.data
    };
  } catch (error: any) {
    // eslint-disable-next-line no-throw-literal
    throw {
      msg: error.response.data
    };
  }
}