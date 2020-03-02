import './sass/dangjian-list.scss';
import $ from 'jquery';
import './btn-group';
import Page from './vendors/myPagination';
import api from './fetch/api';
import * as CONST from './utils/const'
import './vendors/loading'
import {changeScreen, mobileSlider, operateNav, loadingAnimate, removeLoading, noData, getQueryString} from './utils/urlFilter';
import moment from 'moment';
import { tap } from './utils/tap';

$(function () {

  $('.group-btn-group').btnGroup({
    index: +getQueryString('tab') - 1
  });
  let pagesObj = {
    pageNumber: 1,
    pageSize: 10,
    count: 1,
    pages: 1
  }
  // 分页插件
  new Page({
    id: 'pagination',
    curPage: 1, //初始页码
    pageTotal: pagesObj.pages, //总页数
    pageAmount: pagesObj.pageSize, //每页多少条
    dataTotal: pagesObj.count, //总共多少条数据
    pageSize: pagesObj.pageNumber, //可选,分页个数
    showPageTotalFlag: false, //是否显示数据统计
    showSkipInputFlag: true, //是否支持跳转
    prev: '上一页',
    next: '下一页',
    first_last_flag: false,
    getPage: function(page) {
        pagesObj.pageNumber = page
    }
  });

  let maps = CONST.dangjianMaps
  // 分类加载内容
  let tab = +getQueryString('tab')
  let fetchData = function () {
    let tab = +getQueryString('tab');
    let djTypeText = maps[tab];
    $('.dj-h2, .crumb-text').text(djTypeText);
    let initData = function (tab) {
      let dataArr = [];
      loadingAnimate()
      api.GetPartyByType({pageNumber: pagesObj.pageNumber, pageSize: pagesObj.pageSize, partyBuildType: tab}).then(res => {
        removeLoading()
        let {count, pageNo, pages, list} = res
        pagesObj.pageNumber = pageNo
        pagesObj.pages = pages
        pagesObj.count = count
        dataArr = list
        let str = dataArr.map(party => {
          let pubtime = moment(party.date).format('YYYY-MM-DD')
          return `
            <li class="dj-item" data-id="${party.id}">
              <div class="item-desc">${party.title}</div>
              <span class="item-time mobile-hide">${pubtime}</span>
              <div class="dj-load-more mobile-show">
                <i class="icon font_family icon-gengduo"></i>
              </div>
            </li>
          `;
        }).join('');
        $('.dj-list').empty().append(str);
      })
    }

    $('.btn-group .btn').each(function () {
      let title = $(this).attr('data-title');
      if (title === djTypeText) {
        $(this).addClass('active').siblings().removeClass('active');
      }
    });

    initData(tab);
    // $('.btn-group').on('click', '.btn', function () {
    //   let index = $(this).index();
    //   let txt = $(this).attr('data-title');
    //   $('.dj-h2, .crumb-text').text(txt);
    //   initData(index+1);
    // });
    tap('.btn-group', '.btn', function ({target}) {
      let index = target.index();
      let txt = target.attr('data-title');
      $('.dj-h2, .crumb-text').text(txt);
      initData(index+1);
    });
  }
  fetchData()

  // $('.dj-list').on('click', '.dj-item', function () {
  //   let id = $(this).attr('data-id');
  //   window.location.href = `dangjian-detail.html?id=${id}`
  // })
  tap('.dj-list', '.dj-item', function ({target}) {
    let id = target.attr('data-id');
    window.location.href = `dangjian-detail.html?id=${id}`
  })

  tap('.news-search-btn', function () {
    if (pagesObj.pageNumber >= pagesObj.pages) {
      noData()
      return false
    }
    fetchData()
  })
  // 改变变屏幕尺寸
  changeScreen();
  // 移动端侧边栏
  mobileSlider();
  // 导航栏
  operateNav();
})
