import { IResponseAmdb } from 'src/types';
import apiAmdb from './apiAmbdb';
const API_KEY_DEV = process.env.API_KEY_DEV;

const getDiscover = async () => {
    const response = await apiAmdb.get<IResponseAmdb>(
        `/discover/tv?api_key=${API_KEY_DEV}&language=en-US&sort_by=popularity.desc&page=3&timezone=America/New_York&include_null_first_air_dates=false`
    );
    return response.data;
};

export default { getDiscover };
