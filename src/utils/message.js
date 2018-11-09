import { Message, MessageBox } from 'element-ui'

/**
 * function CreateMessage 创建消息弹窗
 * @DateTime 2018-10-23
 * @param    {[type]}   message  弹窗内容
 * @param    {[type]}   type     弹窗类型：success/warning/info/error
 * @param    {[type]}   duration 弹窗显示时间
 */
export function CreateMessage (message, type, duration) {
  Message({
    message,
    type,
    duration,
  })
}