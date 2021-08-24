export const deepEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if(keys1.length !== keys2.length) return false;
    else {
        for(let i = 0; i < keys1.length; ++i){
            if(obj1[keys1[i]] !== obj2[keys2[i]]) return false; 
        }
    }
    return true;
};

export const indexOf = (arr, item, func) => {
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if(func){
            if(func(el, item)) return i;
        } else {
            if(el === item) return i;
        } 
    }
    return -1;
}