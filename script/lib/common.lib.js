const fs = require('fs')
const path = require('path').resolve()
const sanitizeHtml = require('sanitize-html')

const extendVideo = require('../plugin/htmlpurifier/extend.video')

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

// Line 217
// way.co.kr 의 wayboard 참고
function urlAutoLink(str, cf_link_target) {
  let attrNoFollow = checkHtmlNoFollow('url_auto_link')

  let strReplaceFrom = ["&lt;", "&gt;", "&amp;", "&quot;", "&nbsp;", "&#039;"]
  let strReplaceTo = ["\t_lt_\t", "\t_gt_\t", "&", "\"", "\t_nbsp_\t", "'"]
  for(let i = 0; i < strReplaceFrom.length; i++) {
    str = str.replace(new RegExp(strReplaceFrom[i], 'g'), strReplaceTo[i])
  }

  str = str.replace(/(?<!(?:(?:href|src)\s*=\s*(?:\"|'|)))((http|https|ftp|telnet|news|mms):\/\/[^\"'\s()]+)/gi, `<a href="$1" target="${cf_link_target}">$1</a>`)
  /*
  str = sanitizeHtml(str, {
    textFilter: (text) => {
      return text.replace(/((http|https|ftp|telnet|news|mms):\/\/[^\"'\s()]+)/, `<a href="$1" target="${cf_link_target}">$1</a>`)
    }
  })
  */

  str = str.replace(/(^|["'\s(])(www\.[^"'\s()]+)/gi, `$1<a href="http://$2" target="${cf_link_target}" ${attrNoFollow}>$2</a>`)
  str = str.replace(/[0-9a-z_-]+@[a-z0-9._-]{4,}/gi, `<a href="mailto:$0" ${attrNoFollow}>$0</a>`)
  for(let i = 0; i < strReplaceTo.length; i++) {
    str = str.replace(new RegExp(strReplaceTo[i], 'g'), strReplaceFrom[i])
  }

  //return run_replace('url_auto_link', $str);
  return str
}

// Line 511
// 내용을 변환
exports.convContent = function convContent(content, html, filter = true, url) {
  //global $config, $board;

  if (html) {
    let source = []
    let target = []

    source.push("//")
    target.push("")

    if (html == 2) { // 자동 줄바꿈
      source.push("/\n/")
      target.push("<br/>")
    }

    // 테이블 태그의 개수를 세어 테이블이 깨지지 않도록 한다.
    let tableBeginCount = content.match(new RegExp("<table", 'gi')) || [].length
    let tableEndCount = content.match(new RegExp("</table", 'gi')) || [].length
    for (let i = tableEndCount; i < tableBeginCount; i++) {
      content += "</table>"
    }

    for(let i = 0; i < source.length; i++) {
      content = content.replace(new RegExp(source[i], 'g'), target[i])
    }

    if(filter) {
      content = htmlPurifier(content, url)
    }
  }
  else { // text 이면
    // & 처리 : &amp; &nbsp; 등의 코드를 정상 출력함
    content = htmlSymbol(content)

    // 공백 처리
    //$content = preg_replace("/  /", "&nbsp; ", $content);
    content = content.replace(/  /g, "&nbsp; ")
    content = content.replace(/\n /g, "\n&nbsp;")

    content = getText(content, 1)
    content = urlAutoLink(content)
  }

  return content
}

// Line 559
function checkHtmlLinkNoFollow(type = '') {
  return true
}

// Line 563
function htmlPurifier(html, myURL) {
  let f = require('../plugin/htmlpurifier/safeiframe')
  let domains = []
  f.forEach((domain) => {
    domain = domain.trim()
    if(domain) domains.push(domain)
  })
  // 내 도메인도 추가
  domains.push(myURL + '/')

  let config = {
    allowedIframeHostnames: domains,
    transformTags: {},
    allowedAttributes: {
      a: sanitizeHtml.defaults.allowedAttributes.a.concat([
        {
          name: 'target',
          values: ['_blank']
        }
      ])
    }
  }

  if(checkHtmlLinkNoFollow('html_purifier')) {
    config.transformTags.a = (tagName, attribs) => {
      return {
        attribs: {
          rel: 'nofollow'
        }
      }
    }
  }

  //유튜브, 비메오 전체화면 가능하게 하기
  extendVideo({config, defaults: sanitizeHtml.defaults})

  return sanitizeHtml(html, config)
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
