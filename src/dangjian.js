import './sass/dangjian.scss';
import $ from 'jquery';
import api from './fetch/api';
import './vendors/loading'
import {changeScreen, mobileSlider, operateNav, loadingAnimate, removeLoading} from './utils/urlFilter';
import moment from 'moment';
import {tap} from './utils/tap'

$(function () {

  let fetchData = function () {
    loadingAnimate()
    api.GetPartyIndex().then(res => {
      removeLoading()
      let dj = [];
      let dz = [];
      let sj = [];
      let zb = [];
      let lz = [];
      res.map(item => {
        if (item.partyBuildType === 1) {
          dj.push(item)
        } else if (item.partyBuildType === 2) {
          dz.push(item)
        } else if (item.partyBuildType === 3) {
          sj.push(item)
        } else if (item.partyBuildType === 4){
          zb.push(item)
        } else {
          lz.push(item)
        }

        let appendData = function (target, data) {
          let strs = data.map(d => {
            let pubtime = moment(d.date).format('YYYY-MM-DD')
            const className = d.partyBuildType === 5 ? 'item-list flex-lzpd-item' : 'item-list';
            return `
              <div class="${className}" data-id="${d.id}" style="cursor: pointer;">
                <div class="item-desc">${d.title}</div>
                <div class="item-time mobile-hide">${pubtime}</div>
                <div class="item-load-more mobile-show"><i class="icon font_family icon-gengduo"></i></div>
              </div>
            `;
          })
          $(target).empty().append(strs);
        }

        appendData('.djdt', dj);
        appendData('.sjjs', sj);
        appendData('.szxg', dz);
        appendData('.zbfc', zb);
        appendData('.lzpd', lz);
      })
    })
  }
  fetchData()
  // 加载党建信息
  tap('.load-more', function () {
    window.location.href = 'dangjian-list.html';
  })
  tap('.flex-item', '.item-list', function ({target}) {
    let id = target.attr('data-id')
    if (!id) return false
    let url = `dangjian-detail.html?id=${id}`
    window.location.href = url
  })
  changeScreen();
  changeScreen();
  mobileSlider();
  operateNav();
});
