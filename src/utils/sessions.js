// 对sessionStorage操作的封装

/**
 * sessionStorage - 添加
 * @DateTime 2018-10-25
 * @param    {String}   key   键值名
 * @param    {String/object}   value 键值
 */
export function setSessionStorage (key, value) {
  if(typeof value === 'object') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }else {
    sessionStorage.setItem(key, value)
  }
}

/**
 * 获取sessionStorage的值
 * @DateTime 2018-10-25
 * @param    {String}   key   键值名
 */
export function getSessionStorage (key) {
  return JSON.parse(sessionStorage.getItem(key));
}

/**
 * sessionStorage - 删除
 * @DateTime 2018-10-25
 * @param    {String}   key   键值名
 */
export function removeSessionStorage (key) {
  sessionStorage.removeItem(key);
}

/**
 * 清空sessionStorage
 * @DateTime 2018-10-25
 */
export function initialSessionStorage() {
  sessionStorage.clear();
}