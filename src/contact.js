import './sass/contact.scss';
import './btn-group';
import $ from 'jquery';
import "./sass/vendors/perfect-scrollbar.css";
import './sass/vendors/myPagination.css';
import Page from './vendors/myPagination';
import PerfectScrollbar from 'perfect-scrollbar';
import api from './fetch/api';
import './vendors/loading'
import {changeScreen, mobileSlider, operateNav, loadingAnimate, removeLoading} from './utils/urlFilter';
import moment from 'moment';
import {tap} from './utils/tap'
(function ($) {


  $('.contact-us-btn-group').btnGroup({
    cb: function (index) {
      $('.tab-item').eq(index).show().siblings('.tab-item').hide();
    }
  });

  let pageObj = {
    pageNo: 1,
    pageSize: 10,
    pages: 1,
    count: 0
  }
  let initPages = function () {
    new Page({
      id: 'contactPage',
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
        // console.log(page);
        pageObj.pageNo = page
        fetData();
      }
    });

  }
  let contactDatas = []
  // 渲染数据
  let refreshData = function (datas, index = 0) {
    // let datas = getJoinUs();
    let result = datas.map(item => {
      let pubtime = moment(item.publishDate).format('YYYY-MM-DD');
      return `
        <li class="contact-item" data-id="${item.id}">
          <div class="contact-desc">${item.title}</div>
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
    let contactStr = `
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
      contactStr += `
        <div class="download-word mobile-hide">
          <div class="download-icon">
            <i class="icon font_family icon-xiazai1"></i>
            <span class="download-txt">.附件下载</span>
          </div>
          <div class="download-list-wrap">
              <ul class="download-list">
                ${downLoadLi}
              </ul>
          </div>
        </div>
      `;
    }
    $('.contact-right-container').empty().append(contactStr);
    // $('.result-desc').html(desc);
    // $('.sub-title-time').text(pubtime);
    // $('.numb').text(count);
    $('.contact-list .contact-item').eq(index).addClass('active').siblings().removeClass('active');

    new PerfectScrollbar('.contact-right-container .result-wrap');
    new PerfectScrollbar('.download-list-wrap .download-list');
  }
  // refreshData();

  let fetData = function () {
    loadingAnimate()
    api.GetAllConnectUs({pageNo: pageObj.pageNo, pageSize: pageObj.pageSize}).then(res => {
      removeLoading()
      if (res) {
        contactDatas = res.list || []
        if (contactDatas.length === 0) return
        pageObj.pages = res.pages
        pageObj.count = res.count
        refreshData(res.list, 0)
        initPages()
      }
    })
  }
  fetData();

  let fetchCommunication = function () {
    // 查找公司信息
    api.GetAllCompanyName({companyName: ''}).then(res => {
      // this.companies = res
      let companys = res
      let maps = {}
      companys.map(item => {
        let obj = {
          name: item.companyName,
          address: item.detailAddress
        }
        maps[item.id] = obj
      })
      api.GETALLBUSINESSCONTACTS({pageNumber: 1, pageSize: 500, companyId: ''}).then(res => {
        let contacts = res.list
        let str = contacts.map(item => {
          let company = maps[item.businessScopeId]
          // console.log(item.businessScopeId, '!!!!!', company);
          let {phone1, phone2, phone3, phone4, phone5} = item
          let phones = []
          if (phone1) phones.push(phone1)
          if (phone2) phones.push(phone2)
          if (phone3) phones.push(phone3)
          if (phone4) phones.push(phone4)
          if (phone5) phones.push(phone5)
          let phoneStr = phones.map(p => {
            return `
              <a class="tel" href="tel: ${p}">
                <i class="icon font_family icon-dianhua"></i>${p}
              </a>
            `
          }).join(' ')
          let temp = `
            <div class="commun-item">
              <div class="item-company">
                <span class="company-txt">${company.name || ''}</span>
                 <i class="icon icon-arrow font_family icon-xiala mobile-show"></i>
              </div>
              <div class="item-info mt">
                  <span class="item-sub letter-space">
                    <span>地</span>
                    <span>址</span>
                  </span>
                <span class="item-desc">${company.address || ''}</span>
              </div>
              <div class="item-info">
                  <span class="item-sub letter-space">
                    <span>联</span>
                    <span>系</span>
                    <span>人</span>
                  </span>
                <span class="item-desc">${item.name || ''}</span>
              </div>
              `;
          if (item.email) {
            temp += `
              <div class="item-info">
                <span class="item-sub letter-space">
                  <span>电</span>
                  <span>子</span>
                  <span>邮</span>
                  <span>件</span>
                </span>
                <span class="item-desc">${item.email || ''}</span>
              </div>
            `;
          }
          temp += `
            <div class="item-info">
              <span class="item-sub letter-space mobile-hide">
                <span>电</span>
                <span>话</span>
              </span>
              <span class="item-desc mobile-hide">${phones.join(', ')}</span>
              <span class="item-desc mobile-show">
                ${phoneStr}
              </span>
            </div>
          </div>`
          return temp;

        }).join('');
        $('.cummun-list').empty().append(str);

        tap('.cummun-list', '.icon', function ({target}) {
          let parent = target.parents('.commun-item')
          if (parent.hasClass('active')) {
            parent.removeClass('active')
            target.addClass('icon-xiala').removeClass('icon-top')
          } else {
            parent.addClass('active').siblings().removeClass('active')
            target.addClass('icon-top').removeClass('icon-xiala')
            parent.siblings().find('.icon-arrow').removeClass('icon-top').addClass('icon-xiala')
          }
        })
      })
    })
  };
  fetchCommunication();

  tap('.contact-list', '.contact-item', function ({target}) {
    let index = target.index();
    if ($('.mobile-right-hide')) $('.mobile-right-hide').animate({left: 0}, 300);
    refreshData(contactDatas, index);
  })
  // 关闭事件

  tap('.mobile-right-hide .close-detail', function ({target}) {
    $('.mobile-right-hide').animate({left: '100%'}, 300)
  })
  // 更多详情
  tap('.search-btn-info', function () {
    pageObj.pageNo += 1
    fetData()
  })
  tap('.tab-mobile-breadcrumb', '.tab-mobile-item', function ({target}) {
    target.addClass('active').siblings().removeClass('active')
    let index = target.index()
    $('.tab-item').eq(index).show().siblings('.tab-item').hide()
  })
  // 改变变屏幕尺寸
  changeScreen();
  // 移动端侧边栏
  mobileSlider();
  // 导航栏
  operateNav();
})($);
