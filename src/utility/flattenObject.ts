import React from 'react'

type RObject = { [key: string]: any }

const isObject = (el: any) => {
    if (!Array.isArray(el)) return el === Object(el)
    else return false;
}

const flattenObject = (obj: RObject, parent?: string, res: RObject = {}) => {
    for (let key in obj) {
        let propName = parent ? parent + '.' + key : key;
        if (isObject(obj[key]) && !React.isValidElement(obj[key])) flattenObject(obj[key], propName, res);
        else res[propName] = obj[key];
    }
    return res;
}

export default flattenObject;