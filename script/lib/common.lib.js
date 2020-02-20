// Line 2476
exports.HTMLProcess = class HTMLProcess {
  constructor() {
    this.css = []
    this.js = []
  }

  // Line 2480
  mergeStylesheet(stylesheet, order) {
    let links = this.css
    let isMerge = true

    let loop = true
    links.forEach((link) => {
      if(loop) {
        if(link[1] === stylesheet) {
          isMerge = false
          loop = false
        }
      }
    })

    if(isMerge) {
      this.css.push([order, stylesheet])
    }
  }

  // Line 2496
  mergeJavascript(javascript, order) {
    let scripts = this.js
    let isMerge = true

    let loop = true
    scripts.forEach((script) => {
      if(loop) {
        if(script[1] == javascript) {
          isMerge = false
          loop = false
        }
      }
    })

    if(isMerge) {
      this.js.push([order, javascript])
    }
  }
}

// Line 847
// 관리자인가?
exports.isAdmin = function isAdmin(mb_id, data = {}) {
  if (!mb_id) return ''

  let is_authority = '';

  if (data.config.cf_admin === mb_id){
    is_authority = 'super'
  } else if (data.group.gr_admin && data.group.gr_admin === mb_id){
    is_authority = 'group'
  } else if (data.board.bo_admin && data.board.bo_admin === mb_id){
    is_authority = 'board'
  }

  //return run_replace('is_admin', is_authority, mb_id)
  return is_authority
}

// Line 1444
// TEXT 형식으로 변환
// TEXT 형식으로 변환
exports.getText = function getText(str, html = 0, restore = false) {
  if(restore) {
    str = str.replace(/</g, '&lt;')
    str = str.replace(/>/g, '&gt;')
    str = str.replace(/"/g, '&#034;')
    str = str.replace(/'/g, '&#039;')
  }
  
  // 3.31
  // TEXT 출력일 경우 &amp; &nbsp; 등의 코드를 정상으로 출력해 주기 위함
  if (html == 0) {
    str = htmlSymbol(str)
  }

  if (html) {
    str = str.replace(/\\n/g, '<br/>')
  }

  return str
}

// Line 1484
// 3.31
// HTML SYMBOL 변환
// &nbsp; &amp; &middot; 등을 정상으로 출력
exports.htmlSymbol = function htmlSymbol(str) {
  return str.replace(/\&([a-z0-9]{1,20}|\#[0-9]{0,3});/i, "&#038;\\1;")
}

// Line 2460
exports.addStylesheet = function addStylesheet(stylesheet, order = 0, htmlProcess) {
  if(stylesheet.trim() && typeof htmlProcess.mergeStylesheet === 'function') {
    htmlProcess.mergeStylesheet(stylesheet, order)
  }
}

// Line 2468
exports.addJavascript = function addJavascript(javascript, order = 0, htmlProcess)
{
  if(javascript.trim() && typeof htmlProcess.mergeJavascript === 'function') {
    htmlProcess.mergeJavascript(javascript, order)
  }
}
// Line 3000
// XSS 관련 태그 제거
exports.cleanXSSTags = function cleanXSSTags(str, checkEntities = 0) {
    let str_len = str.length
    
    let i = 0
    while(i <= str_len) {
      let result = str.replace(/<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|i(?:frame|layer)|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|title|xml)[^>]*>/i, '')
      /**/ // stop vim rendering multi-line comments
        
      if(checkEntities) {
        result = result.replace(/&colon;|&lpar;|&rpar;|&NewLine;|&Tab;/g, '')
      }

      if(result === str) break

      str = result
      i++
    }

    return str
}
