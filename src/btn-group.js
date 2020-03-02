import $ from 'jquery';
(function ($) {
  $.fn.btnGroup = function (opt) {
    let params = {
      btnGroup: '.btn-group',
      targetBtn: '.btn',
      btnBg: '.btn-active-bg',
      index: 0,
      cb: null
    };
    params = $.extend({}, params, opt);
    let btnGroup = $(params.btnGroup);
    let btnBg = $(params.btnBg);
    let cb = params.cb;
    /** 获取按钮组的宽度及left值 */
    let map = {};
    btnGroup.find('.btn').each(function (i) {
      let _this = $(this);
      let width = this.offsetWidth;
      let text = _this.attr('data-title') || _this.text();
      let left = 0;
      if (i > 0) {let el = map[i - 1]; left = el.left + el.width;}
      map[i] = {width: width, left: left, text: text};
    });
    // 移动函数
    let startAnimate = function (i) {
      if (i < 0) return false;
      let temp = map[i];
      btnBg.animate({width: temp.width, left: temp.left}, 200, 'linear', function () {
        $(this).text(temp.text);
      });
    };

    startAnimate(params.index);
    btnGroup.on('click', params.targetBtn, function () {
      btnBg.text('');
      let index = $(this).index();
      startAnimate(index);
      cb && cb(index);
    });
  }
})($);

