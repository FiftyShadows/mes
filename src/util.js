export default {
  // 用于获取当前时间 'yyyy-mm-dd hh:MM:ss:'
  getNowFormatTime () {
    let time = new Date()
    let seperator1 = ':'
    let seperator2 = ' '
    let hours = this.changeDouble(time.getHours())
    let minutes = this.changeDouble(time.getMinutes())
    let seconds = this.changeDouble(time.getSeconds())
    let currentTime = this.getNowFormatDate() + seperator2 + hours + seperator1 + minutes + seperator1 + seconds
    return currentTime
  },
  // 用于获取当前日期0点和24点
  getCurrentFormatDateSE () {
    let currentObject = {
      startTime: this.getNowFormatDate() + ' 00:00:00',
      endTime: this.getNowFormatDate() + ' 24:00:00'
    }
    return currentObject
  },
  // 用于获取当前日期
  getNowFormatDate () {
    let time = new Date()
    let seperator = '-'
    let year = time.getFullYear()
    let month = this.changeDouble(time.getMonth() + 1)
    let date = this.changeDouble(time.getDate())
    let currentDate = year + seperator + month + seperator + date
    return currentDate
  },
  // 日期格式化
  formatDate (time, fmt) {
    if (time) {
      let date = new Date(time)
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
    } else {
      fmt = ''
    }
    return fmt
  },
  // 补零
  padLeftZero (str) {
    return ('00' + str).substr(str.length)
  },
  // 不足两位自动补0
  changeDouble (num) {
    if (num >= 0 && num <= 9) {
      num = '0' + num
    }
    return num
  },
  // 深克隆
  deepClone (source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    for (const keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {}
          targetObj[keys] = this.deepClone(source[keys])
        } else {
          targetObj[keys] = source[keys]
        }
      }
    }
    return targetObj
  },
  sumCallBack (x, y) {
    return x + y
  },
  timestampToTime (timestamp) {
    var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    return Y + M + D + h + m + s
  },
  divideArray (array) {
    let result = []
    // 当前循环节点
    let start = 0
    // 当前循环的下一个节点
    let end = 0
    // 分界点
    let flag = array[0].item
    array.forEach((item, index) => {
      if (index < array.length - 1) {
        start = item.item
        end = array[index + 1].item
        if (end - start !== 1) {
          result.push(flag + '——' + start)
          flag = end
        }
      } else {
        result.push(flag + '——' + item.item)
      }
    })
    return result
  }
}
