import request from '../utils/request'

export function getSign(userId) {
  return request({
    url: `/sign/getSignInSig?userId=${userId}`,
    method: 'GET',
  })
}