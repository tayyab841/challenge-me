import axios from 'axios';

interface Response {
    msg?: string;
    playerOne?: string;
    playerTwo?: string;
}

interface Payload {
    token: string,
    challengerId: string;
}

export default async function acceptChallenges(params: Payload): Promise<Response> {
    const { token, challengerId } = params;
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/challenge/accept', { token, challengerId });
        return response.data;
    } catch (error: any) {
        // eslint-disable-next-line no-throw-literal
        throw {
            msg: error.response.data
        };
    }
}