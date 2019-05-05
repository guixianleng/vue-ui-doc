/**
 * Created by LenGxin on 19/04/22.
 */

/**
 * 格式化时间
 * @param time 标准时间或时间戳
 * @param cFormat 转化格式
 */
export function formatTime (time: any, cFormat: string) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 深拷贝
 * @param source 拷贝的资源
 */
export function deepClone (source: any) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys: any) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 将驼峰命名转为中横杠例如：PlInputGroup --> pl-input-group
 * @param str 
 */
export function toMiddleLine (str: any) {
  let temp = str.replace(/[A-Z]/g,
  function (match: any) {
    return '-' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '-') { // 如果首字母是大写，执行replace时会多一个-，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}

/**
 * 月份处理
 * @param dealDate 处理的日期
 * @param num 增加还是减少月份
 */
export function dealMonth (dealDate: any, num: any) {
  num = parseInt(num)

  let sYear = dealDate.getFullYear()
  let sMonth = dealDate.getMonth() + 1
  let sDay = dealDate.getDate()

  let eYear = sYear
  let eMonth = sMonth + num
  let eDay = sDay

  // 当月份数大于12时，为一月份， 年数 +1
  if (eMonth > 12) {
    eYear++
    eMonth -= 12
  }
  let eDate: any = new Date(eYear, eMonth - 1, eDay)

  // if (eDate.getMonth() !== eMonth - 1) {
  //   eDay--
  //   eDate = new Date(eYear, eMonth - 1, eDay)
  // }
  return eDate
}
