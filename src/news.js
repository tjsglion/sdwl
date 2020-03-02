import './img/news-img.png';
import './img/news-default.png';
import './img/eye.png';
import './img/prize.png';
import './img/wx-ad.png';
import './img/sj-ad.png';
import './sass/news.scss';
import './btn-group';
import './vendors/loading'
import $ from 'jquery';
import {changeScreen, mobileSlider, operateNav, loadingAnimate, removeLoading, noData, getQueryString} from './utils/urlFilter';
import * as CONST from './utils/const';
import api from './fetch/api';
import moment from 'moment';
import { tap } from './utils/tap';

(function ($) {
  let maps = CONST.monthMaps;
  let pageObj = {
    pageNo: 1,
    pageSize: 5,
    allPage: 1
  }
  // 获取后台新闻
  let newsData = [];
  let pushNews = null;
  let tabIndex = -1;
  // 实例化列数据
  let tab = +getQueryString('tab') || -1
  let initLi = function (obj, isPush) {
    let result = ``;
    if (obj) {
      let pubtime = moment(obj.date).format('YYYY-MM-DD').split('-');
      let month = pubtime[1];
      let monthEN = maps[parseInt(month)];
      let newsAbstract = obj.newsAbstract;
      let cssClass = isPush ? 'news-info-item active' : 'news-info-item';
      let img_url = obj.url || './img/news-default.png'
      result += `
        <li class="${cssClass}" data-img="${img_url}" data-id="${obj.id}">
          <div class="news-info-img">
            <img class="news-img" src="${img_url}"/>
          </div>
          <div class="news-info-wrap">
              <div class="news-info-common news-time">
                <span class="news-month">${monthEN}</span>
                <span class="news-day">${pubtime[2]}</span>
                <span class="news-year">${pubtime[0]}</span>
              </div>
              <div class="news-info-common news-info-desc">
                <div class="news-title">${obj.title}</div>
                <div class="news-sub mobile-hide">
                  <span style="no-margin">浏览次数:<span class="numb">${obj.count || 0}</span></span>
                </div>
                <div class="new-detail mobile-hide">${newsAbstract}</div>
              </div>
              <div class="news-load-more mobile-show">
                <i class="icon font_family icon-gengduo"></i>
              </div>
          </div>
        </li>
      `
    }
    return result;
  }
  // 初始化返回数据
  let initData = function (newsData) {
    // 获取置顶
    // let isPush = false
    let pushIndex = -1
    for (let k in newsData) {
      let el = newsData[k]
      if (el.isPush) {
        pushNews = el
        pushIndex = +k
        break
      }
    }
    // 移除至顶新闻
    if (pushIndex > -1) newsData.splice(pushIndex, 1)
    // 组装数据
    let result = ``

    if (pushNews && (pageObj.pageNo - 1) === 1) result = initLi(pushNews, true)
    result += newsData.map(news => {
      return initLi(news)
    }).join('')

    if (pageObj.pageNo === 1) $('.news-info-list').empty().append(result)
    else $('.news-info-list').append(result)
  }
  let fetchNews = function (type) {
    loadingAnimate();
    if (type) {
      api.GetAllNewsByTypeAndPage({pageNo: pageObj.pageNo, pageSize: pageObj.pageSize, type: type}).then(res => {
        removeLoading();
        let {pageNo, pageSize, list, pages} = res
        // newsData = newsData.concat(list)
        newsData = list;
        pageObj.pageNo = pageNo + 1
        pageObj.pageSize = pageSize || 5
        pageObj.allPage = pages
        initData(newsData)
      }).catch(err => {
        removeLoading();
        return false;
      })
    } else {
      api.GetAllNewsByPage({pageNo: pageObj.pageNo, pageSize: pageObj.pageSize}).then(res => {
        removeLoading();
        let {pageNum, pageSize, list, pages} = res
        newsData = list;
        pageObj.pageNo = pageNum + 1
        pageObj.pageSize = pageSize
        pageObj.allPage = pages
        initData(newsData)
      }).catch(err => {
        removeLoading();
        return false;
      })
    }
  }

  fetchNews(tab === -1 ? '' : tab);

  // $('.news-info-list').on('click', '.news-info-item', function () {
  //   let dataId = $(this).attr('data-id');
  //   window.location.href=`news-detail.html?id=${dataId}`
  // })
  tap('.news-info-list', '.news-info-item', function ({target}) {
    let dataId = target.attr('data-id');
    window.location.href=`news-detail.html?id=${dataId}`
  })
  // loadNews(1);

  let newsMap = CONST.newsMaps
  $('.btn-group').on('click', '.btn', function () {
    let tab = +$(this).attr('data-tab');
    tabIndex = tab;
    let txt = tab === -1 ? '新闻动态' : newsMap[tab];
    $('.crumb-text').text(txt);
    // loadNews(tab);
    pageObj.pageNo = 1;
    $('.news-info-list').empty()
    tab === -1 ? fetchNews() : fetchNews(tab);
  });

  // 加载更多
  tap('.search-btn-info', function ({target}) {
    if (pageObj.pageNo > pageObj.allPage) {
      noData()
      return false
    }
    tabIndex > 0 ? fetchNews(tabIndex) : fetchNews()
  })
  // 改变变屏幕尺寸
  changeScreen();
  // 移动端侧边栏
  mobileSlider();
  // 导航栏
  operateNav();
  $('.news-btn-group').btnGroup({index: tab === -1 ? 0 : tab});
})($);
