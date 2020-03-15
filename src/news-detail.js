import './img/news-img.png';
import './img/eye.png';
import './img/prize.png';
import './img/wx-ad.png';
import './img/sj-ad.png';
import './sass/news-detail.scss';
import $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';
import {getQueryString} from './utils/urlFilter'
// import {getNews} from './fetch/news'
// import {getDateInfo} from './utils/urlFilter'
import {changeScreen, mobileSlider, operateNav} from './utils/urlFilter';
import * as CONST from './utils/const';
import api from './fetch/api';
import moment from 'moment';

(function ($) {

  let newsMap = CONST.newsMaps;
  let id = +getQueryString('id');
  let newsType = 0;
  let curNews = null;
  let likeNews = null;
  let likeNewsArr = []

  let initData = function (obj) {
    let {type, publisher, count, title, content, date} = obj
    let times = moment(date).format('YYYY-MM-DD').split('-');
    let typeTxt = newsMap[type]
    let result = `
      <div class="news-date mobile-hide">
        <div class="day">${times[2]}</div>
        <div class="month">${CONST.monthMaps[+times[1]]}</div>
        <div class="year">${times[0]}</div>
      </div>
      <div class="detail-right">
        <div class="detail-title-wrap">
          <div class="detail-title">${title}</div>
          <div class="sub-title">
            <span class="sub-tite-common">发布者: <span class="pub-name">${publisher || '物流集团'}</span></span>
            <span class="sub-tite-common ml">浏览次数: <span class="scale-time">${count}</span></span>
          </div>
        </div>

        <div class="detail-ctx">
            ${content}
        </div>
      </div>
    `;
    $('.news-detail').empty().append(result);
    $('.second-crumb').text(typeTxt);
    // new PerfectScrollbar('.detail-right .detail-ctx');
  }
  let fetchData = function (id) {
    api.GetNewsDetailById({id}).then(res => {
      curNews = res
      initData(curNews)
      fetchLikeNews(curNews)
    })
  }

  let initLikeNews = function (obj) {
    let {id, publisher, count, title, newsAbstract, date} = obj
    let times = moment(date).format('YYYY-MM-DD').split('-');
    let lideNewsStr = `
      <div class="new-recommand-info">
        <div class="news-date">
          <div class="day">${times[2]}</div>
          <div class="month">${CONST.monthMaps[+times[1]]}</div>
          <div class="year">${times[0]}</div>
        </div>
        <div class="news-like">
          <div class="detail-title">${title}</div>
          <div class="sub-title">
            <span class="sub-tite-common">发布者: <span class="pub-name">${publisher || '物流集团'}</span></span>
            <span class="sub-tite-common ml">浏览次数: <span class="scale-time">${count}</span></span>
          </div>
          <div class="like-new-desc" style="font-size: 12px; line-height: 1.5; margin-top: 10px; max-height: 140px; min-height: 80px;">
            ${newsAbstract}
          </div>
        </div>
      </div>
      <div class="news-eyes" data-id="${id}">
        <i class="font_family icon-xinwenxiangxi"></i>
      </div>
    `;

    $('.news-recommand-left').empty().append(lideNewsStr);
    $('.news-eyes').on('click', function () {
      let id = $(this).attr('data-id');
      window.location.href = `news-detail.html?id=${id}`
    });
    // new PerfectScrollbar('.new-recommand-info .detail-ctx');
  }

  let recommandNews = function (arr) {
    let recStrs = arr.map(news => {
      let pubtime = moment(news.date).format('YYYY-MM-DD')
      return `
        <li class="news-recommand-item" data-id="${news.id}">
          <span class="news-recommand-item-date">${pubtime}</span>
          <span class="news-recommand-item-desc">${news.title}</span>
        </li>
      `;
    }).join('');

    $('.news-recommand-list').empty().append(recStrs);
    $('.news-recommand-list').on('click', '.news-recommand-item', function () {
      let id = $(this).attr('data-id');
      window.location.href = `news-detail.html?id=${id}`
    })
  }
  let fetchLikeNews = function ({type}) {
    api.GetAllNewsByTypeAndPage({pageNo: 1, pageSize: 8, type, isPush: ''}).then(res => {
      let list = res.list || [];
      for (let k in list) {
        let el = list[k]
        if (el.id === curNews.id) continue;
        if (!likeNews) likeNews = el
        else likeNewsArr.push(el);
      }
      initLikeNews(likeNews);
      recommandNews(likeNewsArr);
    })
  }
  fetchData(id)

  // 改变变屏幕尺寸
  changeScreen();
  // 移动端侧边栏
  mobileSlider();
  // 导航栏
  operateNav();
})($);
