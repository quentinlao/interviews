import { IResponseAmdb } from '../types';
import apiAmdb from './apiAmbdb';

// constants
const API_KEY_DEV = process.env.API_KEY_DEV;

/**
 * GET discover movies
 * @returns get all data movies
 */
const getDiscover = async () => {
    const response = await apiAmdb.get<IResponseAmdb>(
        `/discover/tv?api_key=${API_KEY_DEV}&language=en-US&sort_by=popularity.desc&page=3&timezone=America/New_York&include_null_first_air_dates=false`
    );
    return response.data;
};

const getDiscoverByPage = async (pageDate: number) => {
    const response = await apiAmdb.get<IResponseAmdb>(
        `/discover/tv?api_key=${API_KEY_DEV}&language=en-US&sort_by=popularity.desc&page=${pageDate}&timezone=America/New_York&include_null_first_air_dates=false`
    );
    return response.data;
};
export default { getDiscover, getDiscoverByPage };
