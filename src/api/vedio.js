import request from '../utils/request'

export function Test() {
  return request({
    url: '/sign/getSignInSig',
    method: 'GET',
  })
}