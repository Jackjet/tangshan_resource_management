import moment from 'moment'

export function formatTime (time, format) {
  if (!time) {
    return null
  }
  let formatStr = format || 'YYYY-MM-DD'
  return moment(time).format(formatStr)
}

export function toShareType (type) {
  if (!type) {
    return null
  }
  if (type === '01') {
    return '无条件共享'
  }
  if (type === '02') {
    return '有条件共享'
  }
  return type
}

export function uppercase (value) {
  return value.toUpperCase()
}
