import axios from 'axios';

import { Game } from '../common/types';

interface Response {
    msg?: string;
    games?: Game[];
}

interface Payload {
    token: string
}

export default async function getGames(params: Payload): Promise<Response> {
    const { token } = params;
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/games/all', { params: { token: token } });
        return {
            games: response.data
        };
    } catch (error: any) {
        // eslint-disable-next-line no-throw-literal
        throw {
            msg: error.response.data
        };
    }
}