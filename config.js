module.exports = function configRun(req, data = {}) {
  let returnData = {}

  returnData.PORT = 4444

  if(req) {
    // Line 50
    req.userData.adminDir = 'adm'
    // Line 52
    req.userData.cssDir = 'css'

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
    // Line 94
    req.userData.cssURL = req.userData.url + '/' + req.userData.cssDir
  }

  return returnData
}
