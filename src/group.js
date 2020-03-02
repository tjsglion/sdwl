import './sass/group.scss';
import './img/dsj.png';
import $ from 'jquery';
import './btn-group';
import './vendors/flexslider';
import {changeScreen, mobileSlider, operateNav, getQueryString} from './utils/urlFilter';
import api from './fetch/api';
(function ($) {
  // let flexslider = {vars: {}};
  let tab = +getQueryString('tab');
  $('.tab-item').eq(tab).show().siblings('.tab-item').hide();
  let result = ''
  let initEventInfo = function () {
    $('.event-slides').append(result);
    $('.event-flexslider').flexslider({
      animation: "slide",
      animationLoop: true,
      itemWidth: 210,
      itemMargin: 40,
      // minItems: 3,
      maxItems: 4,
      directionNav: true,
      controlNav: false,
      prevText: '<i class="icon font_family icon-zuojiantou"></i>',
      nextText: '<i class="icon font_family icon-youjiantou"></i>'
    });
  }
  let loadData = function (cb) {
    api.GetAllEvents({year: ''}).then(res => {
      if (res) {
        let maps = {}
        for (let key in res) {
          let el = res[key]
          if (!maps[el.year]) maps[el.year] = []
          maps[el.year].push(el.events)
        }

        let initData = function (datas) {
          let yearStr = ``;
          for (let key in datas) {
            yearStr += `
              <li class="event-item">
                <div class="item-info">
                  <div class="event-title">
                    <span class="span-title">${key}</span>
                  </div>
                <div class="month-event-list">
            `

            let events = datas[key].map(event => {
              return `
                  <span class="span-item">${event}</span>
              `
            }).join(' ')
            yearStr += `
                    <div class="month-event-item">
                      ${events}
                    </div>
                  </div>
                </div>
              </li>
            `
          }
          return yearStr
        }
        result = initData(maps)
        if (tab === 1) {
          initEventInfo()
        }
      }
    });
  }

  loadData();

  // $('.group-btn-group').btnGroup({
  //   index: tab,
  //   cb: function (index) {
  //     $('.tab-item').eq(index).show().siblings('.tab-item').hide();
  //     if (index === 0) {
  //     } else if (index === 1) {
  //       initEventInfo()
  //     }
  //   }
  // });

  let showOrHide = function (target, index) {
    target.eq(index).addClass('show').siblings().removeClass('show')
  }
  /** 移动端点击详情 */
  $('.content-load-more').on('click', '.load-more-common', function () {
    $(this).removeClass('show').siblings().addClass('show')
    let index = $(this).index()
    let ctxComm = $(this).parents('.content-wrap').find('.content-common');
    showOrHide(ctxComm, index);
  })

  changeScreen();
  mobileSlider();
  operateNav()
})($);
