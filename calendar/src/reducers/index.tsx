import { combineReducers } from 'redux';
import { IMeeting } from '../services/zoom.service';
import zoom from './zoom';

interface IZoom {
    meetings: IMeeting[];
}
export interface IRootState {
    zoom: IZoom;
}
export default combineReducers({
    zoom,
});
