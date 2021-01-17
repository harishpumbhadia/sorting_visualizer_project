import { connect } from "react-redux";
import { setRunning } from '../Reducers/isRunning'
import { setAlgorithm } from '../Reducers/sortingAlgorithm'
import SortingVIsualizer from "./SortingVIsualizer.jsx";

const mapStateToProps = ({
    isRunning,
    sortingAlgorithm,
}) => ({
    isRunning,
    sortingAlgorithm
});

const mapDispatchToProps = () => dispatch => ({
    updateAlgorithm: (sortingAlgorithm) => {
        dispatch(setAlgorithm(sortingAlgorithm));
        dispatch(setRunning(true))  
    },
   
    disableIsRunning: () => {
        dispatch(setRunning(false));
    },
    
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingVIsualizer);
