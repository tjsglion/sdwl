import './sass/search.scss';
import $ from 'jquery';
import './vendors/loading'
import {changeScreen, mobileSlider, operateNav, loadingAnimate, removeLoading, noData} from './utils/urlFilter';
import {getQueryString} from './utils/urlFilter'
import api from './fetch/api';
import { tap } from './utils/tap';
$(function () {

  let title = getQueryString('title')
  let pagesObj = {
    pageNo: 1,
    pageSize: 5,
    total: 1,
    pages: 1
  }
  $('.search-key, .crumb-key').text(title)
  let datas = []
  let fetchData = function () {
    loadingAnimate()
    api.GetAllNewsByPage({pageNo: pagesObj.pageNo, pageSize: pagesObj.pageSize, title: title}).then(res => {
      removeLoading()
      if (res) {
        let {list, pageNum, pageSize, pages, total} = res
        datas = datas.concat(list)
        if (datas.length === 0) {
          $('.no-data-tip').show()
          return false
        }
        $('.no-data-tip').hide()
        pagesObj.pageNo = pageNum
        pagesObj.pageSize = pageSize
        pagesObj.pages = pages
        pagesObj.total = total
        $('.search-numb').text(total)
        let str = datas.map(data => {
          let txt = data.title.replace(title, `<span style="color: #04a450">${title}</span>`)
          return `
            <li class="search-item" data-id="${data.id}">
              <h2 class="search-h2">${txt}</h2>
              <div class="search-result-desc mobile-hide">${data.newsAbstract}</div>
              <i class="icon font_family icon-gengduo mobile-show"></i>
            </li>
          `
        })

        $('.search-list-result').empty().append(str)
      }
    })
  }

  tap('.search-list-result', '.search-item', function ({target}) {
    let id = target.attr('data-id')
    window.location.href = `news-detail.html?id=${id}`
  })
  // 加载更多
  tap('.search-btn-info', function () {
    pagesObj.pageNo += 1
    if (pagesObj.pageNo > pagesObj.pages) {
      noData()
      return false
    }
    fetchData()
  })
  changeScreen();
  // 移动端侧边栏
  mobileSlider();
  // 导航栏
  operateNav();
  fetchData()
});
