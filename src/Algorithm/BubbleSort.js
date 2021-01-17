var animation = [];
export function bubbleSort(Array) {
    animation = [];
    let isSorted = false;
    let counter = 0;
    if (Array.length === 1) return Array;
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < Array.length - 1 - counter; i++) {
            //comparing 2 values
            animation.push([i, i + 1]);
            
            //push them to change the color
         
            if (Array[i] > Array[i + 1]) {
                let temp = Array[i + 1];
                Array[i + 1] = Array[i];
                Array[i] = temp;
                isSorted = false;
                animation.push([i, Array[i],i + 1, Array[i+1]]);
               
            }
            else
                animation.push([i, Array[i],i + 1, Array[i+1]]);
        }
        counter++;
    }
    return animation;
};
