export function sortSubArray(masterArray, subArray) {
    // Create a Map for efficient lookup of indices in the master array
    const indexMap = new Map();
    masterArray.forEach((uuid, index) => indexMap.set(uuid, index));
  
    // Sort the sub-array based on the indices in the master array
    const sortedArray = subArray.slice().sort((uuid1, uuid2) => {
        const index1 = indexMap.get(uuid1);
        const index2 = indexMap.get(uuid2);
        return index1 - index2; // Ascending order
    });
  
    return sortedArray;
}