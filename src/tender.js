import './sass/tender.scss';
import './btn-group';
import $ from 'jquery';
import "./sass/vendors/perfect-scrollbar.css";
import './sass/vendors/myPagination.css';
import Page from './vendors/myPagination';
import PerfectScrollbar from 'perfect-scrollbar';
import api from './fetch/api';
import './vendors/loading'
import {changeScreen, mobileSlider, operateNav, loadingAnimate, removeLoading, noData} from './utils/urlFilter';
import moment from 'moment';
import {tap} from './utils/tap'
$(function () {
  // let pid = '';
  let cityId = '';
  let tenderDatas = [];
  let pageObj = {
    pageNo: 1,
    pageSize: 10,
    pages: 1,
    count: 1
  }
  let initPages = function () {
    new Page({
      id: 'pagination',
      curPage: pageObj.pageNo, //初始页码
      pageTotal: pageObj.pages, //总页数
      pageAmount: pageObj.pageSize, //每页多少条
      dataTotal: pageObj.count, //总共多少条数据
      pageSize: 5, //可选,分页个数
      showPageTotalFlag: false, //是否显示数据统计
      showSkipInputFlag: true, //是否支持跳转
      prev: '上一页',
      next: '下一页',
      first_last_flag: false,
      getPage: function(page) {
        pageObj.pageNo = page
        fetData();
      }
    });

  }
  // 初始化页面
  let refreshData = function (datas, index) {
    if (datas.length === 0) {
      $('.contact-list').empty()
      $('.contact-right-container').empty()
      $('.no-data-tip').show()
      return false
    }
    $('.no-data-tip').hide()
    let result = datas.map(item => {
    let pubtime = moment(item.publishDate).format('YYYY-MM-DD');
    let cityName = item.cityName ? `[${item.cityName}]` : ''
    return `
      <li class="contact-item" data-id="${item.id}">
        <div class="contact-desc">${cityName}${item.title}</div>
        <span class="contact-pub-time mobile-hide">${pubtime}</span>
        <i class="icon font_family icon-gengduo mobile-show"></i>
      </li>
    `
    }).join('')

    $('.contact-list').empty().append(result);
    let el = datas[index];
    let desc = el.content;
    let pubtime = moment(el.publishDate).format('YYYY-MM-DD');
    let count = el.watchTimes || 0;
    let title = el.title;
    let loadUrls = []
    let {url1, url2, url3, url4, url5} = el
    let urlObj = function (url) {
      let obj = {};
      obj.url = url;
      obj.name = url.substring(url.lastIndexOf('/') + 1);
      return obj;
    }
    if (url1) loadUrls.push(urlObj(url1))
    if (url2) loadUrls.push(urlObj(url2))
    if (url3) loadUrls.push(urlObj(url3))
    if (url4) loadUrls.push(urlObj(url4))
    if (url5) loadUrls.push(urlObj(url5))
    let downLoadLi = loadUrls.map(url => {
      return `
        <li class="download-item">
          <a href="${decodeURI(url.url)}" title="${url.name}">${url.name}</a>
        </li>
      `
    })
    let downLoadClass = loadUrls.length > 0 ? 'result-wrap result-wrap-download' : 'result-wrap'

    let ctxstr = `
      <div class="right-title">
        <div class="right-title-h2">${title}</div>
        <div class="sub-title">
          <span>发布时间:<span class="sub-title-time">${pubtime}</span></span>
          <span>浏览次数:<span class="numb">${count}</span></span>
        </div>
      </div>
      <div class="${downLoadClass}">
        <div class="result-desc" style="font-size: 16px;">
          ${desc}
        </div>
      </div>
    `;
    if (downLoadLi.length > 0) {
      ctxstr += `
        <div class="download-word mobile-hide">
          <div class="download-icon">
            <i class="icon font_family icon-xiazai1"></i>
            <span class="download-txt">附件下载</span>
          </div>
          <div class="download-list-wrap">
              <ul class="download-list">
                ${downLoadLi}
              </ul>
          </div>
        </div>
      `
    }
    $('.contact-right-container').empty().append(ctxstr);
    $('.contact-list .contact-item').eq(index).addClass('active').siblings().removeClass('active');
    new PerfectScrollbar('.contact-right-container .result-wrap');
    new PerfectScrollbar('.download-list-wrap .download-list');
  }
  // 分页获取招标信息
  let fetData = function () {
    loadingAnimate()
    api.GetTenderByPage({pageNo: pageObj.pageNo, pageSize: pageObj.pageSize, cityId: cityId}).then(res => {
      removeLoading()
      if (res) {
        tenderDatas = res.list || []
        // pageObj.pageNo += 1;
        $('.area-info').hide()
        if (tenderDatas.length === 0) {
          pageObj.pages = 0
          pageObj.count = 0
          $('#pagination').hide()
        } else {
          pageObj.pages = res.pages
          pageObj.count = res.count
          $('#pagination').show()
          initPages()
        }
        refreshData(res.list, 0)
      }
    })
  }
  fetData();
  // 切换招标信息
  tap('.contact-list', '.contact-item', function ({target}) {
    $('.area-info').hide()
    let index = target.index()
    if ($('.mobile-right-hide')) $('.mobile-right-hide').animate({left: 0}, 300)

    refreshData(tenderDatas, index)
  })

  let provDatas = [];
  let cityDatas = [];

  let initCity = function () {
    let cityStr = cityDatas.map(city => {
        return `
          <li class="city-item" data-id="${city.cid}" data-name="${city.city}">
            <span>${city.city}</span>
            <span class="close">x</span>
          </li>
        `;
    }).join('');
    // 设置默认值与样式
    $('.city-list').empty().append(cityStr);
    // 点击事件
    tap('.city-list', '.city-item', function ({event, target}) {
      event.preventDefault()
      event.stopPropagation()
      $('.area-info').toggle()
      target.addClass('active').siblings().removeClass('active')
      let cityName = target.attr('data-name')
      $('.area-btn .area-txt').text(cityName)
      let temp_id = target.attr('data-id')
      cityId = temp_id
      fetData()
    })

    tap('.city-item', '.close', function ({event, target}) {
      event.preventDefault()
      event.stopPropagation()
      target.parent().removeClass('active')
      $('.area-btn .area-txt').text($('.area-btn .area-txt').attr('data-txt'))
      cityId = ''
      fetData()
    })
    new PerfectScrollbar('.city .city-list');
  }
  // 获取城市信息
  let getAllCity = function (pId) {
    // 获取城市信息
    api.GetAllCityInfo({pid: pId}).then(res => {
      // console.log('城市信息', res);
      if (res) {
        // console.log(res)
        cityDatas = res
        initCity()
      }
    })
  }
  // 获取省份信息

  let getAllProv = function () {
    api.GetAllProvince().then(res => {
      // console.log('所有省份信息', res)
      let pId = ''
      if (res) {
        res.map(pro => {
          if (pro.provincial === '山东省') {
            provDatas.unshift(pro)
            pId = pro.pid
          } else {
            provDatas.push(pro)
          }
        })

        let provStr = ``;
        provDatas.map((prov, index) => {
          provStr += `<li class="prov-item" data-id="${prov.pid}">${prov.provincial}</li>`;
        });
        $('.prov-list').empty().append(provStr).find('.prov-item').eq(0).addClass('active').siblings().removeClass('active');

        tap('.prov-list', '.prov-item', function ({event, target}) {
          event.stopPropagation()
          event.preventDefault()
          $('.area-btn .area-txt').text($('.area-btn .area-txt').attr('data-txt'))
          $('.city-list').empty()
          let pid = target.attr('data-id')
          target.addClass('active').siblings().removeClass('active')
          getAllCity(pid)
        })
        getAllCity(pId)
        new PerfectScrollbar('.area-wrap .prov-list');
      }
    })
  }
  getAllProv();

  tap('.area-btn', function ({event}) {
    event.stopPropagation()
    event.preventDefault()
    $('.area-info').toggle()
  })

  tap('.mobile-right-hide .close-detail', function () {
    $('.mobile-right-hide').animate({left: '100%'}, 300);
  })

  tap(document, function () {
    $('.area-info').hide()
  })
  // 更多详情
  tap('.search-btn-info', function ({target}) {
    pageObj.pageNo += 1
    if (pageObj.pageNo > pageObj.pages) {
      noData()
      return false
    }
    fetData()
  })
  // 改变变屏幕尺寸
  changeScreen();
  // 移动端侧边栏
  mobileSlider();
  // 导航栏
  operateNav();
});
