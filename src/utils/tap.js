import $ from 'jquery'
let isMobile = function () {
  return navigator.userAgent.match(/(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i);
}

export function tap (el, targetEl, cb) {
  // 获取回调函数
  let fn = ''
  let hasProxy = false
  let tag = 0
  if (typeof targetEl === 'function') {
    fn = targetEl
  } else {
    hasProxy = true
    fn = cb
  }
  if (isMobile()) {
    let startY = 0;
    let endY = 0;
    if (hasProxy) {
      $(el).on('touchstart', targetEl, function (event) {
        let touch = event.originalEvent
        startY = touch.changedTouches[0].pageY
      }).on('touchmove', targetEl, function () {
      }).on('touchend', targetEl, function (e) {
        let touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]
        endY = touch.pageY
        let disY = endY - startY
        if (disY === 0) {
          fn && fn({event: e, target: $(this)})
        }
      })
    } else {
      $(el).on('touchstart', function (event) {
        let touch = event.originalEvent
        startY = touch.changedTouches[0].pageY
      }).on('touchmove', function () {
      }).on('touchend', function (e) {
        let touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]
        endY = touch.pageY
        let disY = endY - startY
        if (disY === 0) {
          fn && fn({event: e, target: $(this)})
        }
      })
    }
  } else {
    if (hasProxy) {
      $(el).on('click', targetEl, function (event) {
        fn && fn({event: event, target: $(this)})
      })
    } else {
      $(el).on('click', function (event) {
        fn && fn({event: event, target: $(this)})
      })
    }
  }
}
