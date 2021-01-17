import { combineReducers } from "redux";
import { isRunning } from './isRunning';
import { sortingAlgorithm } from './sortingAlgorithm'


export default combineReducers({
    isRunning,
    sortingAlgorithm,
});
