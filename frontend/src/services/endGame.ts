import axios from 'axios';

interface Response {
    msg?: string;
}

interface Payload {
    token: string,
    gameId: string;
    drawn: boolean;
    winnerId: string;
    losserId: string;
}

export default async function endGame(params: Payload): Promise<Response> {
    const { token, gameId, winnerId, losserId, drawn } = params;

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/games/end', { token, gameId, winnerId, losserId, drawn });
        return { msg: response.data };
    } catch (error: any) {
        // eslint-disable-next-line no-throw-literal
        throw { msg: error.response.data };
    }
}