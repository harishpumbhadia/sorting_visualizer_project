var animation = [];
export function quickSort(array) {
  animation = [];
    quickSortHelperFunction(array,0,array.length-1);
    return animation;
  }
  
  function quickSortHelperFunction(array,startId, endId){
      if(startId >= endId) return;
      const pivotId = startId;
      let leftId = startId+1;
      let rightId = endId;
      
      while (rightId >= leftId) {
        animation.push([pivotId,leftId,rightId]);
          if (array[leftId] > array[pivotId] && array[rightId] < array[pivotId]) {
              animation.push([leftId, array[rightId], rightId, array[leftId]]);
              swap(leftId, rightId, array);
          } else
              animation.push([leftId,array[leftId],rightId,array[rightId]]);
          if (array[leftId] <= array[pivotId]) {
              leftId++;
            // animation.push([leftId++]);
          }//else
            //animation.push([leftId]);
          if (array[rightId] >= array[pivotId]) {
              rightId--;
             // animation.push([rightId--]);
          } //else
             // animation.push([rightId]);
      }
      swap(pivotId, rightId, array);
      animation.push([pivotId, array[pivotId], rightId, array[rightId]]);
      const leftSubarray = rightId -1-startId< endId -(rightId +1);
      if(leftSubarray){
        quickSortHelperFunction(array,startId,rightId-1);
        quickSortHelperFunction(array,rightId+1,endId);
      }
      else{
        quickSortHelperFunction(array,rightId+1,endId);
        quickSortHelperFunction(array,startId,rightId-1);
      }
  }
  
  function swap(i,j,array){
      let temp = array[j];
      array[j] = array[i];
      array[i] = temp;
  }
  