// 判断数据类型
const oproto = Object.prototype.toString;


const dataType = {
  /**
   * 是否是 Undefined类型
   * @DateTime 2018-10-26
   * @param   obj   待检测的数据
   * @return   {Boolean}  布尔值
   */
  isUndefined: function(obj) {
    return typeof obj === 'undefined'
  },
  /**
   * 是否是 Number类型
   * @DateTime 2018-10-26
   * @param   obj   待检测的数据
   * @return   {Boolean}  布尔值
   */
  isNumber: function(obj) {
    return typeof obj === 'number'
  },
  /**
   * 是否是 String类型
   * @DateTime 2018-10-26
   * @param   obj   待检测的数据
   * @return   {Boolean}  布尔值
   */
  isString: function(obj) {
    return typeof obj === 'string'
  },
  /**
   * 是否是 Boolean类型
   * @DateTime 2018-10-26
   * @param   obj   待检测的数据
   * @return   {Boolean}  布尔值
   */
  isBoolean: function(obj) {
    return typeof obj === 'boolean'
  },
  /**
   * 是否是 Null类型
   * @DateTime 2018-10-26
   * @param   obj   待检测的数据
   * @return   {Boolean}  布尔值
   */
  isNull: function(obj) {
    return obj === null
  },
  /**
   * 是否是 Function类型
   * @DateTime 2018-10-26
   * @param   obj   待检测的数据
   * @return   {Boolean}  布尔值
   */
  isFunction: function(obj) {
    return typeof obj === 'function'
  },
  /**
   * 是否是 Array类型
   * @DateTime 2018-10-26
   * @param   obj   待检测的数据
   * @return   {Boolean}  布尔值
   */
  isArray: function(obj) {
    return Array.isArray ? Array.isArray(obj) : oproto.call(obj) == "[object Array]";
  },
  /**
   * 是否是 isObject类型
   * @DateTime 2018-10-26
   * @param   obj   待检测的数据
   * @return   {Boolean}  布尔值
   */
  isObject: function(obj) {
    return oproto.call(obj) == "[object Object]"
  },
  /**
   * 是否是 Date类型
   * @DateTime 2018-10-26
   * @param   obj   待检测的数据
   * @return   {Boolean}  布尔值
   */
  isDate: function(obj) {
    return oproto.call(obj) == "[object Date]"
  },
  /**
   * 是否是 RexExp类型
   * @DateTime 2018-10-26
   * @param   obj   待检测的数据
   * @return   {Boolean}  布尔值
   */
  isRegExp: function(obj) {
    return oproto.call(obj) == "[object RegExp]"
  }
}

export default dataType;