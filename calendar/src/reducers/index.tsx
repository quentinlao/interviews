import { combineReducers } from 'redux';
import { IMeeting } from '../services/zoom.service';
import zoom from './zoom';

/**
 * storage meetings
 */
interface IZoom {
    meetings: IMeeting[];
}
/**
 * storage root
 */
export interface IRootState {
    zoom: IZoom;
}
/**
 * combine all reducers
 */
export default combineReducers({
    zoom,
});
