import './sass/index.scss';
import $ from 'jquery';
import './vendors/flexslider';
import './img/b1.png';
import './img/news-img.png';
import './img/oybl.jpg';
import './img/news-default.png';
import './img/float_ad.png';
import './img/oybl-mobile.png';
import './vendors/loading'
import './img/zhaopin.jpg';
// import BrowserDetect from './vendors/browserDetect'
// 移动端改变html字体大小
import {changeScreen, mobileSlider, operateNav, loadingAnimate, removeLoading, getBrowserInfo} from './utils/urlFilter';
import moment from 'moment';
import {tap} from './utils/tap'
import api from './fetch/api'
$(function () {
  // 加载新闻
  let loadNewsByType = function ({pageNo, pageSize, type, isPush}, cb) {
    loadingAnimate();
    api.GetAllNewsByTypeAndPage({pageNo, pageSize, type, isPush}).then(res => {
      removeLoading();
      if (res.list) cb && cb(res.list)
    })
  };
  // 加载集团新闻2条
  loadNewsByType({pageNo: 1, pageSize: 2, type: 1}, function (data) {
    let notices = data.map(item => {
      return `
        <li class="news-item" data-id="${item.id}">
            <a href="news-detail.html?id=${item.id}" style="color: #fff;">
              <span class="item-desc">${item.title}</span>
              <span class="item-link">
                <span class="link-info mobile-hide">详细</span><i class="icon font_family icon-gengduo"></i></span>
            </a>
          </li>
        `;
      }).join('');
    $('.news-list').empty().append(notices);
  });
  // 推送新闻
  loadNewsByType({pageNo: 1, pageSize: 1, type: 1, isPush: true}, function (data) {
    let tops = data.map(item => {
      let img_info = item.url || './img/news-default.png'
      let abstract = $('html, boyd').get(0).offsetWidth <= 750 ?
        (item.newsAbstract.length > 50 ? item.newsAbstract.substring(0, 50) + '...' : item.newsAbstract)
        : (item.newsAbstract.length > 300 ? item.newsAbstract.substring(0, 300) + '...' : item.newsAbstract.substring(0, 300) );
      $('.news-img .push-img').attr({src: img_info})
      $('.news-img .img-link').attr({href: `news-detail.html?id=${item.id}`})
      return `
        <h2 class="news-title">
          <a href="news-detail.html?id=${item.id}">${item.title}</a>
        </h2>
        <div class="news-info">
          <span class="news-info-span">
            ${abstract}
          </span>
        </div>
      `;
    }).join('');
    $('.index-news-wrap .news-desc').empty().append(tops)
  });
  // 加载集团新闻
  loadNewsByType({pageNo: 1, pageSize: 6, type: 1, isPush: false}, function (data) {
    let orgs = data.map((item, index) => {
      let pubtime = moment(item.date).format('YYYY-MM-DD')
      let className = 'tab-body-item';
      if (index < 3) {
        className = `tab-body-item font_family new-news`;
      }
      return  `
      <li class="${className}" data-id="${item.id}">
        <a class="link-color"  href="javascript:;">
          <span class="item-time">${pubtime}</span>
          <span class="item-desc">${item.title}</span>
        </a>
      </li>
      `;
    }).join('');
    $('.jtxw').empty().append(orgs);
  });
  // 加载行业动态
  loadNewsByType({pageNo: 1, pageSize: 6, type: 2, isPush: false}, function (data) {
    let orgs = data.map(item => {
      let pubtime = moment(item.date).format('YYYY-MM-DD')
      return  `
      <li class="tab-body-item" data-id="${item.id}">
        <a class="link-color"  href="javascript:;">
          <span class="item-time">${pubtime}</span>
          <span class="item-desc">${item.title}</span>
        </a>
      </li>
      `;
    }).join('');
    $('.mtxw').empty().append(orgs);
  });
  (function () {
    api.GetAllNewsByPage({pageNo: 1, pageSize: 4}).then(res => {
      const list = res.list || [];
      const news = list.map((item, index) => {
        if (index < 3) {
          return `
            <li class="news-mobile-item" data-id="${item.id}">
              <p class="news-mobile-item-ctx">
                ${item.title}
              </p>
              <i class="icon font_family icon-new"></i>
            </li>
          `
        } else {
          return `
            <li class="news-mobile-item" data-id="${item.id}">
              <p class="news-mobile-item-ctx">
                ${item.title}
              </p>
            </li>
          `
        }
      }).join('')
      $('.news-mobile-list').empty().append(news);
      tap('.news-mobile-list', '.news-mobile-item', function ({target}) {
        window.location.href=`news-detail.html?id=${target.attr('data-id')}`
      })
    });
  })()
  // 新闻
  tap('.tab-header', '.tab-header-title', function ({target}) {
    target.addClass('active').siblings().removeClass('active');
    let index = target.index()
    $('.tab-body').eq(index).show().siblings('.tab-body').hide()
  })
  // 业务
  tap('.business-wrap', '.business-item', function ({event, target}) {
    let index = target.index()
    if (index === 5) {
      window.open('http://47.105.190.85/oybl/index.html', '_blank');
    } else {
      window.location.href = `business.html?tab=${index}`
    }
  })
  tap('#blPageMobile', '.bl-close', function () {
    $('#blPageMobile').removeClass('oyblShow')
  })
  // 大事件
  let bigEvents = function (cb) {
    // api.GetBigEvents({pageNo: 1, pageSize: 100, simple: true}).then(res => {
    //   if (res.list) cb && cb(res.list)
    // })
  }
  bigEvents(function (data) {
    let maps = {}
    for (let key in data) {
      let el = data[key]
      if (!maps[el.year]) maps[el.year] = []
      if (maps[el.year].length <= 4) maps[el.year].push(el.events)
    }

    var initData = function (datas) {
      let yearStr = ``;
      let eventStr = ``;
      for (let key in datas) {
        yearStr += `
          <li class="year-item"><span>${key}</span></li>
        `;
        let eventInfo = (datas[key] && datas[key].map(event => {
          return `
            <span class="span-item">${event}</span>
          `;
        }));

        let temp = eventInfo.join(' ');
        let eventResult = `
          <li class="data-item">
            <div class="data-item-desc">${temp}</div>
          </li>
        `;
        eventStr += eventResult;
      }

      $('.year-list').append(yearStr);
      $('.data-list').append(eventStr);
      $('.year-flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 120,
        asNavFor: '.data-flexslider',
        minItems:2,
        directionNav: false
      });

      $('.data-flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: true,
        slideshow: true,
        sync: ".year-flexslider",
        directionNav: false
      });
    }
    initData(maps)
  });
  // 计算欧亚班例宽度
  (function ($) {
    function initCalc () {
      let trainLeft = $('.logistic-train').offset().left;
      let docW = $(document).width();
      let dis = docW - trainLeft;
      $('.logistic-train').css({width: dis});
    }
    $(window).on('resize', function () {
      initCalc();
    });
    initCalc();
  })($);

  // 返回顶部
  let backToTop = function () {
    $(window).scroll(function(){
      var scroTop = $(window).scrollTop();
      if(scroTop>50){
        $('.back-top').fadeIn(500);
      }else{
        $('.back-top').fadeOut(500);
      }
    });
    tap('.back-top', function () {
      $("html,body").animate({scrollTop:0},"fast");
    })
  }
  backToTop();

  // 搜索操作
  (function ($) {
    $('.header-search').on('mouseover', '.fa-icon', function () {
      $('.search-input').animate({height: 75}, .2);
    })
  })($);

  /** banner 动画 */
  (function ($) {
    $('.index-banner.flexslider').flexslider({
      directionNav: true,
      pauseOnAction: false,
      slideshowSpeed: 5000
    });
  })($);

  tap('.tab-body', 'li', function ({target}) {
    let id = target.attr('data-id');
    window.location.href=`news-detail.html?id=${id}`;
  });
  // 更多新闻
  tap('.tab-header-more', function () {
    window.location.href = 'news.html?tab=1'
  })

  function FloatAd(selector, disX, disY, delay) {
    let offsetWidth = $('html, boyd').get(0).offsetWidth;
    if (offsetWidth <= 750) return;
    var obj = $(selector);
    if (obj.find(".item").length == 0) return;//如果没有内容，不执行
    var windowHeight = $(window).height();//浏览器高度
    var windowWidth = $(window).width();//浏览器宽度
    var dirX = disX || -1.5;//每次水平漂浮方向及距离(单位：px)，正数向右，负数向左，如果越大的话就会看起来越不流畅，但在某些需求下你可能会需要这种效果
    var dirY = disY || -1;//每次垂直漂浮方向及距离(单位：px)，正数向下，负数向上，如果越大的话就会看起来越不流畅，但在某些需求下你可能会需要这种效果

    var delay = delay || 30;//定期执行的时间间隔，单位毫秒
    obj.css({ left: windowWidth / 2 - obj.width() / 2 + "px", top: windowHeight / 2 - obj.height() / 2 + "px" });//把元素设置成在页面中间
    obj.show();//元素默认是隐藏的，避免上一句代码改变位置视觉突兀，改变位置后再显示出来
    var handler = setInterval(move, delay);//定期执行，返回一个值，这个值可以用来取消定期执行

    obj.hover(function() {//鼠标经过时暂停，离开时继续
        clearInterval(handler);//取消定期执行
    }, function() {
        handler = setInterval(move, delay);
    });

    obj.find(".ad-close").click(function(e) {//绑定关闭按钮事件
      e.preventDefault();
      close();
    });
    $(window).resize(function() {//当改变窗口大小时，重新获取浏览器大小，以保证不会过界（飘出浏览器可视范围）或漂的范围小于新的大小
        windowHeight = $(window).height();//浏览器高度
        windowWidth = $(window).width();//浏览器宽度
    });

    obj.on('click', function () {
      $(this).hide()
    });
    function move() {//定期执行的函数，使元素移动
        var currentPos = obj.position();//获取当前位置，这是JQuery的函数，具体见：http://hemin.cn/jq/position.html
        var nextPosX = currentPos.left + dirX;//下一个水平位置
        var nextPosY = currentPos.top + dirY;//下一个垂直位置

        if (nextPosX <= 0 || nextPosX >= windowWidth - obj.width()) {//如果达到左边，或者达到右边，则改变为相反方向
            dirX = dirX * -1;//改变方向
            nextPosX = currentPos.left + dirX;//为了不过界，重新获取下一个位置
        }
        if (nextPosY <= 0 || nextPosY >= windowHeight - obj.height() - 5) {//如果达到上边，或者达到下边，则改变为相反方向。
            dirY = dirY * -1;//改变方向
            nextPosY = currentPos.top + dirY;//为了不过界，重新获取下一个位置
        }
        obj.css({ left: nextPosX + "px", top: nextPosY + "px" });//移动到下一个位置
    }

    function close() {//停止漂浮，并销毁漂浮窗口
      clearInterval(handler);
      obj.remove();
    }
  }

  function scrollToTrget () {
    let el =  $('.business-wrap').get(0);
    let offsetTop = 0;
    let currentEl = el;
    while (currentEl.offsetParent) {
      offsetTop += currentEl.offsetTop;
      currentEl = currentEl.offsetParent;
    };
    $('html, body').stop();
    let offsetWidth = $('html, boyd').get(0).offsetWidth;
    if (offsetWidth > 1190) {
      $('html, body').animate({scrollTop: offsetTop + 25}, 1000);
    } else if (offsetWidth > 750 && offsetTop <= 1190) {
      $('html, body').animate({scrollTop: offsetTop + 76}, 1000);
    } else if (offsetWidth > 480 && offsetTop <= 750){
      $('html, body').animate({scrollTop: offsetTop - 200}, 1000);
    } else {
      $('html, body').animate({scrollTop: offsetTop - 350}, 1000);
    }
  }
  scrollToTrget();
  changeScreen();
  mobileSlider();
  operateNav();

  FloatAd('#floatAd');
  // FloatAd('#floatAd2', 3, 2, 50);
});
