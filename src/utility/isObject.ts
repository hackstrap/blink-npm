export default (obj: any) => {
    return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]'
}