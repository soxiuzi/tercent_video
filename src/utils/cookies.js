// 基于js-cookie对cookie操作的封装
import Cookies from 'js-cookie'

/**
 * 创建cookie
 * @DateTime 2018-10-26
 * @param    {String}   name  键值名
 * @param    {String/Json}   key   键值
 */
export function setCookie(name, key) {
  return Cookies.set(name, key);
}

/**
 * 获取cookie
 * @DateTime 2018-10-26
 * @param    {String}   name  键值名
 */
export function getCookie(name) {
  return Cookies.getJSON(name);
}

/**
 * 删除单个cookie
 * @DateTime 2018-10-26
 * @param    {String}   name  键值名
 */
export function removeCookie(name) {
  return Cookies.remove(name)
}

/**
 * 清除本地所有cookie
 * @DateTime 2018-10-26
 */
export function initialCookie() {
  let allCookie = Cookies.get();
  for(let key in allCookie) {
    if(key !== null) {
      Cookies.remove(key)
    }
  }
}