var animation = [];
export function heapSort(array) {
    // Write your code here.
    animation = [];
    buildMaxHeap(array);
    for (let endId = array.length - 1; endId > 0; endId--){
        animation.push([0, array[endId], endId, array[0]]);
          swap(0,endId,array);
          shiftDown(0,endId-1,array);
      }
      return animation;
  }
  
  function buildMaxHeap(array){
      const firstParentId = Math.floor((array.length - 2)/2);
      for(let currentId = firstParentId; currentId >=0; currentId--){
          shiftDown(currentId, array.length -1, array);
      }
  }
  
  function shiftDown(currentId,endId,heap){
      let childOneId = currentId * 2 + 1;
      while(childOneId <= endId){
          const childTwoId = currentId * 2 + 2 <= endId ? currentId * 2 + 2 : -1;
          let idToSwap;
          if (childTwoId !== -1 && heap[childTwoId] > heap[childOneId]) {
            animation.push([currentId,childOneId, childTwoId]);
              idToSwap = childTwoId;
          } else {
             if(childTwoId !== -1)
                animation.push([currentId,childOneId, childTwoId]);
            idToSwap = childOneId;
          }
          if (childTwoId !== -1) {
              animation.push([currentId, childOneId, childTwoId]);
          }
          //animation.push([idToSwap, currentId]);
          if (heap[idToSwap] > heap[currentId]) {
              animation.push([currentId,heap[idToSwap] , idToSwap,heap[currentId]]);
              swap(currentId, idToSwap, heap);
              currentId = idToSwap;
              childOneId = currentId * 2 + 1;
          } else {
            animation.push([currentId, heap[currentId], idToSwap,heap[idToSwap]]);
             return;
          }
      }
  }
  
  function swap(i,j, array){
      const temp = array[j];
      array[j]  =array[i];
      array[i] = temp;
  }
