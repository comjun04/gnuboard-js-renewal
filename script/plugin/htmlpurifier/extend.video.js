module.exports = function extendVideoRun(data = {}) {
  data.config.allowedAttributes.iframe = ['allowfullscreen', 'webkitAllowFullScreen', 'mozallowfullscreen']
  
  data.config.transformTags.iframe = (tagName, attribs) => {
    let youtubeMatch = /^https?:\/\/www\.youtube(?:-nocookie)?\.com\/embed\/([^" >]+)/i.match(attribs.src)
    let vimeoMatch = /^https?\/\/player\.vimeo\.com\/video\/([^" >]+)/i.match(attribs.src)
    let facebookMatch = /^https?:\/\/www\.facebook\.com\/plugins\/([^" >]+)/i.match(attribs.src)

    if(youtubeMatch || vimeoMatch || facebookMatch) {
      attribs.frameborder = 0
      attribs.allowfullscreen = ''
      if(vimeoMatch) {
        attribs.webkitAllowFullScreen = ''
        attribs.mozallowfullscreen = ''
      }
    }

    return {
      tagName: 'iframe',
      attribs
    }
  }
}
