import $ from 'jquery';
(function ($) {
  $.fn.scroll = function (opt) {
    let params = {
      container: '.car-logo-list', // 可见区域容器
      target: '.logo-list', // 滚动元素容器
      prev: '.prev', // 上一上
      next: '.next', // 下一个
      item: '.logo-item', // 滚动容器中的列表
      cb: null // 回调函数
    }
    let opts = $.extend({}, params, opt);
    let $container = $(opts.container);
    let $target = $(opts.target);
    let $prev = $container.find(params.prev);
    let $next = $container.find(params.next);;
    let $item = $(opts.item);


    let itemWidth = ($item.get(0) && $item.get(0).offsetWidth) || 0;
    let itemLen = $item.length;
    // 总宽度
    let allWidth = itemWidth * itemLen;
    $target.css({'width': allWidth});
    // 获取容器的宽度
    let conWidth = $container.width();

    // 是否显示切换按钮
    if (allWidth > conWidth) {
      $prev.show();
      $next.show()
    } else {
      $prev.hide();
      $next.hide();
    }
    // 获取移动距离
    let prevFlag = true;
    let nextFlag = true;
    $prev.on('click', function () {
      // debugger;
      if (!prevFlag) return;
      prevFlag = false;
      let marginLeft = Math.abs(parseInt($target.css('margin-left'))) || 0;
      if (allWidth - (conWidth + marginLeft) > 0) {
        let dis = marginLeft + itemWidth;
        // $container.css({'margin-left': - dis});
        $target.animate({'margin-left': - dis}, 300, function () {
          prevFlag = true;
          nextFlag = true;
        });
      }
    });
    $next.on('click', function () {
      if (!nextFlag) return;
      nextFlag = false;
      let marginLeft = Math.abs(parseInt($target.css('margin-left'))) || 0;
      if (marginLeft > 0) {
        let dis = marginLeft - itemWidth;
        $target.animate({'margin-left': - dis}, 300, function () {
          nextFlag = true;
          prevFlag = true;
        });
      }
    });
    $target.on('click', opts.item, function () {
      let index = $(this).index();
      $(this).addClass('active').siblings().removeClass('active');
      // 点击当前列时，是否需要移动
      let itemWidth = ($item.get(0) && $item.get(0).offsetWidth) || 0;
      let itemLen = $item.length;
      // 总宽度
      let allWidth = itemWidth * itemLen;
      let indexWidth = index * itemWidth;
      let halfWidth = conWidth / 2;
      if ((allWidth - indexWidth) > halfWidth) {
        // console.log(1111);
      } else {
        // console.log(222);
      }
      opts.cb && opts.cb(index);
    });

    opts.cb && opts.cb(0);
  }
})($);