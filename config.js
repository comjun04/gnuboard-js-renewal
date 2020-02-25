const numeral = require('numeral')

module.exports = function configRun(req, data = {}) {
  let returnData = {}

  returnData.PORT = 4444

  // Line 42
  /*
   www.sir.kr 과 sir.kr 도메인은 서로 다른 도메인으로 인식합니다. 쿠키를 공유하려면 .sir.kr 과 같이 입력하세요.
   이곳에 입력이 없다면 www 붙은 도메인과 그렇지 않은 도메인은 쿠키를 공유하지 않으므로 로그인이 풀릴 수 있습니다.
   */
  returnData.cookieDomain = ''

  if(req) {
    // Line 46
    // 여기서 전역 상수로 설정
    req.userData.cookieDomain = returnData.cookieDomain

    // Line 50
    req.userData.adminDir = 'adm'
    // Line 
    req.userData.bbsDir = 'bbs'
    // Line 52
    req.userData.cssDir = 'src/css'
    // Line 56
    req.userData.jsDir = 'src/js'

    // Line 76
    // URL 은 브라우저상에서의 경로 (도메인으로 부터의)
    if(req.userData.domain) {
      req.userData.url = req.userData.domain
    } else {
      if(data.g5_path.url) {
        req.userData.url = data.g5_path.url
      } else {
        req.userData.url = ''
      }
    }

    // Line 92
    req.userData.adminURL = req.userData.url + '/' + req.userData.adminDir
    //
    req.userData.bbsURL = req.userData.url + '/' + req.userData.bbsDir
    // Line 94
    req.userData.cssURL = req.userData.url + '/' + req.userData.cssDir
    // Line 97
    req.userData.jsURL = req.userData.url + '/' + req.userData.jsDir

    // Line 142
    // 시간 상수
    // 서버의 시간과 실제 사용하는 시간이 틀린 경우 수정하세요.
    // 하루는 86400 초입니다. 1시간은 3600초
    // 6시간이 빠른 경우 time() + (3600 * 6);
    // 6시간이 느린 경우 time() - (3600 * 6);

    const datenow = new Date()

    req.userData.serverTime = Math.floor(Date.now() / 1000) // TODO
    req.userData.timeYMDHIS = datenow.getFullYear()
      + '-' + numeral(datenow.getMonth() + 1).format('00')
      + '-' + numeral(datenow.getDate()).format('00')
      + ' ' + numeral(datenow.getHours()).format('00')
      + ':' + numeral(datenow.getMinutes()).format('00')
      + ':' + numeral(datenow.getSeconds()).format('00')
  }

  return returnData
}
