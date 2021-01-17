import React, { Component } from 'react';
import * as bubbleSort from '../Algorithm/BubbleSort.js'
import * as quickSort from '../Algorithm/QuickSort.js';
import * as mergeSort from '../Algorithm/MergeSort';
import * as heapSort from '../Algorithm/HeapSort';

const ARRAY_ANIMATION_SPEED = 20;
const TOTAL_BARS = 185;
const MIN_TOTAL_BARS = 15;
const ARRAY_COLOR_BEFORE_SORTING = 'rgb(99, 223, 210)';
const ARRAY_COLOR_AFTER_SORTING = 'rgb(149, 233, 142)';
const ARRAY_COLOR_WHILE_SORTING = 'rgb(172, 38, 15)';

class SortingVIsualizer extends Component {
    constructor(props) {
        super(props);
        // Must initialize state first
        this.state = {
            isclicked:false,
            array: []  ,
            width_value: "",
            color: "",
        };
    }
    componentDidMount() {
        this.onLoadArray();
    }
    handleClick(sortingAlgorithm) {
        const { updateAlgorithm } = this.props;
        updateAlgorithm(sortingAlgorithm)    
        
    }
    
    render() { 
        const  array = this.state.array;
         const {
            isRunning,
            sortingAlgorithm,
        } = this.props;

        const cursor = isRunning ? "auto" : "pointer";
        const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "white";
        return (
            <>
                <div className = "navBar">
                
                        <li><button
                             style={{color: color, cursor: cursor}}
                            className="generateNewArrayButton"
                            onClick={!isRunning ? this.randonNumberGenerator.bind(this) : null}>Generate new Array</button></li>
                        <li style={{color: color}}class="text">Change array size</li>
                        
                        <li>
                            <input type="range" min="1" max="100" id="ArrayRange" className="slider"
                                style={{background: color, cursor: cursor}}
                                disabled={isRunning}
                                value={ this.state.value}   
                                onChange={this.handleChange.bind(this)}    
                            />
                        </li> 
                    <button
                        className={sortingAlgorithm === "quickSort" ? "currentAlgorithmButton" : "algorithmButton"}
                        onClick={!isRunning ? () =>this.handleClick("quickSort"):null}>
                        Quick Sort
                    </button>
                    
                    <button
                        className={sortingAlgorithm === "mergeSort" ? "currentAlgorithmButton" : "algorithmButton"}
                        onClick={!isRunning ? () => this.handleClick("mergeSort"):null}>
                        Merge Sort
                    </button>
                    <button
                        className={sortingAlgorithm === "bubbleSort" ? "currentAlgorithmButton" : "algorithmButton"}
                        onClick={!isRunning ? () => this.handleClick("bubbleSort"):null}>
                        Bubble Sort
                    </button>
                    <button
                        className={sortingAlgorithm === "heapSort" ? "currentAlgorithmButton" : "algorithmButton"}
                        onClick={!isRunning ? () => this.handleClick("heapSort"):null}>
                            Heap Sort
                    </button>
                        {
                           
                           sortingAlgorithm ?
                                <button
                                id="sort"
                               // disabled={ this.state.isclicked}
                                    //stle={{color: color, cursor: cursor}}
                                    className='algorithmButton'
                                     onClick={sortingAlgorithm === 'bubbleSort' ? this.bubbleSort.bind(this) : sortingAlgorithm ==='quickSort'? this.quickSort.bind(this):sortingAlgorithm === 'heapSort' ? this.heapSort.bind(this): sortingAlgorithm === 'mergeSort'? this.mergeSort.bind(this): null}
                                   // onclick={ this.bubbleSort.bind(this)}
                                >
                                Sort!
                                     
                    </button>
                                : null
                       }
                </div>
                <div class="Array-container">   
                    {
                        array.map((value, id) => (
                        <div class="Array-bar"
                            key={id}
                            style={{
                                height: `${value}px`,
                                backgroundColor: `${this.state.color}`,
                                width: `${this.state.width_value}px`
                            }}
                            
                        >
                        </div>
                    ))}    
                </div>
            </>
        );
    }
    
    handleCurrentAlgorithm() {
        const currentAlgorithm = document.getElementById('currentAlgorithm').value;
        if (currentAlgorithm === 'merge sort') {
            this.mergeSort();
        }
    }
    
    
    handleChange(event) {
        const array = [];
        const color = ARRAY_COLOR_BEFORE_SORTING;
        this.setState({ color });

        if (event.target.value >= 0 && event.target.value <= 10)
            this.state.width_value = 30;
        else if (event.target.value > 10 && event.target.value <= 20)
            this.state.width_value = 22;
        else if (event.target.value > 20 && event.target.value <= 30)
            this.state.width_value = 17;
        else if (event.target.value > 30 && event.target.value <= 40)
            this.state.width_value = 12;
        else if (event.target.value > 40 && event.target.value <= 50)
            this.state.width_value = 9;
        else if (event.target.value > 50 && event.target.value <= 60)
            this.state.width_value = 7;
        else if (event.target.value > 60 && event.target.value <= 70)
            this.state.width_value = 5;
        else if (event.target.value > 70 && event.target.value <= 80)
            this.state.width_value = 4;
        else 
            this.state.width_value = 3;
   
        
        const doubleMultipler = event.target.value * 2;
        for (let index = 0; index < doubleMultipler; index++) {
            if (doubleMultipler < TOTAL_BARS) {
                if (doubleMultipler < MIN_TOTAL_BARS) {
                    this.state.width_value = 30;
                    this.setState({ array });
                    return this.randonNumberGenerator(MIN_TOTAL_BARS)
                }
                else
                    array.push(randomIntFromInterval(5, 500));
            }
            else {
                this.state.width_value = 3;
                this.setState({ array });
                return this.randonNumberGenerator(TOTAL_BARS)
            }
        }
        this.setState({ array });
    }
    
   

    //main bubble sort method
    bubbleSort() { 
        const sortingButton = document.getElementById('sort');
        sortingButton.disabled = true;
        sortingButton.className = 'disableButton';
        const animation = bubbleSort.bubbleSort(this.state.array);
       const arrayBars = document.getElementsByClassName('Array-bar');
        for (let i = 0; i < animation.length; i++) {
            const isColorChange = i % 2 !== 1;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animation[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = ARRAY_COLOR_WHILE_SORTING;
                    barTwoStyle.backgroundColor = ARRAY_COLOR_WHILE_SORTING;
                }, i * ARRAY_ANIMATION_SPEED);
            } else {
                setTimeout(() => {
                    const [barOneIdx, barOneNewHeight,barTwoIdx,barTwoNewHeight ] = animation[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${barOneNewHeight}px`;
                    barTwoStyle.height = `${barTwoNewHeight}px`;
                    barOneStyle.backgroundColor = ARRAY_COLOR_BEFORE_SORTING;
                    barTwoStyle.backgroundColor = ARRAY_COLOR_BEFORE_SORTING;
                    
                 },i* ARRAY_ANIMATION_SPEED );
            }
            if (i >= animation.length - 1) {
                setTimeout(() => {
                    this.setState({ color: ARRAY_COLOR_AFTER_SORTING });
                    const { disableIsRunning } = this.props;
                    disableIsRunning()
                    sortingButton.disabled = false;
                    sortingButton.className = 'algorithmButton'
                }, i * ARRAY_ANIMATION_SPEED);
            }
        }     
    }


    //quick sort method starts
    quickSort() {
        const animation = quickSort.quickSort(this.state.array);
        const arrayBars = document.getElementsByClassName('Array-bar');
        const sortingButton = document.getElementById('sort');
        sortingButton.disabled = true;
        sortingButton.className = 'disableButton';
        for (let i = 0; i < animation.length; i++){
            const arrayElementSize = animation[i].length;
            if (arrayElementSize === 3) {
                const [pivotBar, leftBar, rightBar] = animation[i];
                const pivotBarStyle = arrayBars[pivotBar].style;
                const leftBarStyle = arrayBars[leftBar].style;
                const rightBarStyle = arrayBars[rightBar].style;
                setTimeout(() => {
                    pivotBarStyle.backgroundColor = ARRAY_COLOR_WHILE_SORTING;
                    leftBarStyle.backgroundColor = ARRAY_COLOR_WHILE_SORTING;
                    rightBarStyle.backgroundColor = ARRAY_COLOR_WHILE_SORTING;
                }, i * ARRAY_ANIMATION_SPEED);
            }
           
            else {
                setTimeout(() => {
                    const [leftBar, leftBarNewHeight, rightBar, rightBarNewHeight] = animation[i];
                    const leftBarStyle = arrayBars[leftBar].style;
                    const rightBarStyle = arrayBars[rightBar].style;
                    leftBarStyle.height = `${leftBarNewHeight}px`;
                    rightBarStyle.height = `${rightBarNewHeight}px`;
                    leftBarStyle.backgroundColor = ARRAY_COLOR_BEFORE_SORTING;
                    rightBarStyle.backgroundColor = ARRAY_COLOR_BEFORE_SORTING;
                }, i * ARRAY_ANIMATION_SPEED);    
            }
            if (i >= animation.length - 1) {
                setTimeout(() => {
                    const { disableIsRunning } = this.props;
                    disableIsRunning()
                    sortingButton.disabled = false;
                    sortingButton.className = 'algorithmButton'
                    this.setState({ color: ARRAY_COLOR_AFTER_SORTING });
                }, i * ARRAY_ANIMATION_SPEED);
            }
        }
    }//quick sort methods ends here.
    //Merge sort method starts from here
    mergeSort() {
        const animation = mergeSort.mergeSort(this.state.array);
        const arrayBars = document.getElementsByClassName('Array-bar');
        const sortingButton = document.getElementById('sort');
        sortingButton.disabled = true;
        sortingButton.className = 'disableButton';
        for (let i = 0; i < animation.length;i++){
            const colorChange = i % 3 ;
            if (colorChange === 0) {
                setTimeout(() => {
                    const [leftBar, rightBar] = animation[i];
                    const leftBarStyle = arrayBars[leftBar].style;
                    const rightBarStyle = arrayBars[rightBar].style;
                    leftBarStyle.backgroundColor = ARRAY_COLOR_WHILE_SORTING;
                    rightBarStyle.backgroundColor = ARRAY_COLOR_WHILE_SORTING;
                }, i * ARRAY_ANIMATION_SPEED);   
            }
            if (colorChange === 1) {
                setTimeout(() => {
                    const [leftBar, rightBar] = animation[i];
                    const leftBarStyle = arrayBars[leftBar].style;
                    const rightBarStyle = arrayBars[rightBar].style;
                    leftBarStyle.backgroundColor = ARRAY_COLOR_BEFORE_SORTING;
                    rightBarStyle.backgroundColor = ARRAY_COLOR_BEFORE_SORTING;
                }, i * ARRAY_ANIMATION_SPEED);   
            }
            if (colorChange === 2)  {
                setTimeout(() => {
                    const [leftBar, leftBarNewHeight] = animation[i];
                    const leftBarStyle = arrayBars[leftBar].style;
                    leftBarStyle.height = `${leftBarNewHeight}px`;
                    leftBarStyle.backgroundColor = ARRAY_COLOR_BEFORE_SORTING;
                }, i * ARRAY_ANIMATION_SPEED);    
            }
            if (i >= animation.length - 1) {
                setTimeout(() => {
                    this.setState({ color: ARRAY_COLOR_AFTER_SORTING });
                    const { disableIsRunning } = this.props;
                    disableIsRunning()
                    sortingButton.disabled = false;
                    sortingButton.className = 'algorithmButton'
                }, i * ARRAY_ANIMATION_SPEED);
            }
        }
    }

    // heap sort method starts
    heapSort() {
        const animation = heapSort.heapSort(this.state.array);
        const arrayBars = document.getElementsByClassName('Array-bar');
        const sortingButton = document.getElementById('sort');
        sortingButton.disabled = true;
        sortingButton.className = 'disableButton';
        let count = 0;
        for (let i = 0; i < animation.length; i++){
            if (animation[i].length === 3) {
                setTimeout(() => {
                count = count + 1;
                if (count % 2 === 1) {
                   const [currentId, childOne, childTwo] = animation[i];
                    const currentIdStyle = arrayBars[currentId].style;
                    const childOneStyle = arrayBars[childOne].style;
                    const childTwoStyle = arrayBars[childTwo].style;
                    currentIdStyle.backgroundColor = ARRAY_COLOR_WHILE_SORTING;
                    childOneStyle.backgroundColor = ARRAY_COLOR_WHILE_SORTING;
                    childTwoStyle.backgroundColor = ARRAY_COLOR_WHILE_SORTING;
                } else {
                    const [currentId, childOne, childTwo] = animation[i];
                    const currentIdStyle = arrayBars[currentId].style;
                    const childOneStyle = arrayBars[childOne].style;
                    const childTwoStyle = arrayBars[childTwo].style;
                    currentIdStyle.backgroundColor = ARRAY_COLOR_BEFORE_SORTING;
                    childOneStyle.backgroundColor = ARRAY_COLOR_BEFORE_SORTING;
                    childTwoStyle.backgroundColor = ARRAY_COLOR_BEFORE_SORTING;
                }
                }, i * ARRAY_ANIMATION_SPEED);
            }
            else {
                setTimeout(() => {
                    const [leftBar, leftBarNewHeight, rightBar, rightBarNewHeight] = animation[i];
                    const leftBarStyle = arrayBars[leftBar].style;
                    const rightBarStyle = arrayBars[rightBar].style;
                    leftBarStyle.height = `${leftBarNewHeight}px`;
                    rightBarStyle.height = `${rightBarNewHeight}px`;
                    
                }, i * ARRAY_ANIMATION_SPEED);   
            }
            if (i >= animation.length - 1) {
                setTimeout(() => {
                    this.setState({ color: ARRAY_COLOR_AFTER_SORTING });
                    const { disableIsRunning } = this.props;
                    disableIsRunning()
                    sortingButton.disabled = false;
                    sortingButton.className = 'algorithmButton'
                }, i * ARRAY_ANIMATION_SPEED);
            }
        }
    }
    // random generator method will push 185 random numbers  to  array 
    // this method calls randomIntFromInterval method that originally generate random number between the range of 5 to 500 that can fit in the screen 
    randonNumberGenerator(arraySize) {
        const array = [];
        const width = this.state.width_value;
        const color = ARRAY_COLOR_BEFORE_SORTING;
        if (arraySize === 185 || arraySize === 15 ) {
            for (let index = 0; index < arraySize; index++) {
                array.push(randomIntFromInterval(5, 500));
            }
        } else {
            for (let index = 0; index < this.state.array.length; index++) {
                array.push(randomIntFromInterval(5, 500));
            }
        }
        this.setState({ array });
        this.setState({ width });
        this.setState({ color });
        
        
    }

    onLoadArray() {
        const array = [];
        this.state.width_value = 8;    
        for (let index = 0; index < 100; index++) 
            array.push(randomIntFromInterval(5,500));
        this.setState({ array }); 
    }

}  
// Stack overflow
function randomIntFromInterval(min, max) { // min and max included 
    //this.state.width = width;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVIsualizer; 