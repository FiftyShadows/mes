export default {
  // 用于获取当前时间 'yyyy-mm-dd hh:MM:ss:'
  getNowFormatTime () {
    let time = new Date();
    let seperator1 = ':';
    let seperator2 = ' ';
    let hours = this.changeDouble(time.getHours());
    let minutes = this.changeDouble(time.getMinutes());
    let seconds = this.changeDouble(time.getSeconds());
    let currentTime = this.getNowFormatDate() + seperator2 + hours + seperator1 + minutes + seperator1 + seconds;
    return currentTime
  },
  // 用于获取当前日期0点和24点
  getCurrentFormatDateSE () {
    let currentObject = {
      startTime: this.getNowFormatDate() + ' 00:00:00',
      endTime: this.getNowFormatDate() + ' 24:00:00'
    };
    return currentObject
  },
  // 用于获取当前日期
  getNowFormatDate () {
    let time = new Date();
    let seperator = '-';
    let year = time.getFullYear();
    let month = this.changeDouble(time.getMonth() + 1);
    let date = this.changeDouble(time.getDate());
    let currentDate = year + seperator + month + seperator + date;
    return currentDate
  },
  // 不足两位自动补0
  changeDouble (num) {
    if (num >= 0 && num <= 9) {
      num = '0' + num
    }
    return num
  }
}
