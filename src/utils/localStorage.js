// 对localStorage操作的封装

/**
 * locaStorage - 添加
 * @DateTime 2018-10-25
 * @param    {String}   key   键值名
 * @param    {String/object}   value 键值
 */
export function setLocalStorage (key, value) {
  if(typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  }else {
    localStorage.setItem(key, value)
  }
}

/**
 * 获取localStorage的值
 * @DateTime 2018-10-25
 * @param    {String}   key   键值名
 */
export function getLocalStorage (key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * localStorage - 删除
 * @DateTime 2018-10-25
 * @param    {String}   key   键值名
 */
export function removeLocalStorage (key) {
  localStorage.removeItem(key);
}

/**
 * 清空localStorage
 * @DateTime 2018-10-25
 */
export function initialLocalStorage() {
  localStorage.clear();
}