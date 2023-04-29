import axios from 'axios';

interface Payload {
  email: string;
  name: string;
  password: string;
}

interface Response {
  msg?: string;
  token?: string;
  userId?: string;
  userName?: string;
}

export default async function userSignup(params: Payload): Promise<Response> {
  const { name, email, password } = params;
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/signup', {
      email: email,
      password: password,
      name: name
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