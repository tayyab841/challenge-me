import axios from 'axios';

interface Payload {
  email: string;
  password: string;
}

interface Response {
  msg?: string;
  token?: string;
  userId?: string;
  userName?: string;
}

export default async function userLogin(params: Payload): Promise<Response> {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/login', {
      email: params.email,
      password: params.password
    });
    return {
      token: response.data.token,
      userId: response.data.data.userId,
      userName: response.data.data.userName
    };
  } catch (error: any) {
    // eslint-disable-next-line no-throw-literal
    throw {
      msg: error.response.data
    };
  }
}