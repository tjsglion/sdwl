import './sass/dangjian-detail.scss';
import $ from 'jquery';
import api from './fetch/api';
import {getQueryString, notNull, getDateInfo} from './utils/urlFilter'
import './vendors/loading'
import {changeScreen, mobileSlider, operateNav, loadingAnimate, removeLoading} from './utils/urlFilter';
import moment from 'moment';
import * as CONST from './utils/const'
import './vendors/jquery.nice-scroll'
import { tap } from './utils/tap';

$(function () {

  let maps = CONST.dangjianMaps
  let loadData = function () {
    let id = +getQueryString('id');
    if (notNull(id)) {
      let curParty = null;
      loadingAnimate()
      api.GetPartyById({partyBuildId: id}).then(res => {
        removeLoading()
        curParty = res
        if (curParty) {
          let pubtime = moment(curParty.date).format('YYYY-MM-DD')
          let times = getDateInfo(pubtime);
          let dj_type = curParty.partyBuildType;
          let djTypeText = maps[dj_type];
          $('.second-crumb, .item-tab-common').text(djTypeText);
          let relativeArr = [];

          api.GetPartyByType({pageNumber: 1, pageSize: 6, partyBuildType: dj_type}).then(res => {
            let {list = []} = res
            list.map(item => {
              if (relativeArr.length <= 5 && item.id !== id) relativeArr.push(item)
            })

            let relativeStr = relativeArr.map(arr => {
              let pubtime = moment(arr.date).format('YYYY-MM-DD')
              return `
                  <div class="tab-ctx-desc" data-id="${arr.id}">
                    <span class="desc-info">
                        ${arr.title}
                    </span>
                    <span class="desc-time">${pubtime}</span>
                  </div>
              `
              }).join('');
              $('.item-tab-ctx').empty().append(relativeStr);
              tap('.second-crumb, .item-tab .more', function () {
                window.location.href=`dangjian-list.html?tab=${dj_type}`
              })
              tap('.item-tab-ctx', '.tab-ctx-desc', function ({target}) {
                let id = target.attr('data-id')
                window.location.href = `dangjian-detail.html?id=${id}`
              })
            })

          let result = `
            <div class="news-date dj-date mobile-hide">
                <div class="day">${times.day}</div>
                <div class="month">${times.month}</div>
                <div class="year">${times.year}</div>
              </div>
              <div class="news-like">
                <div class="news-like-wrap">
                  <div class="detail-title">${curParty.title}</div>
                  <div class="sub-title">
                    <span class="sub-tite-common">浏览次数: <span class="scale-time">${curParty.viewTimes}</span></span>
                  </div>
                </div>
                <div class="detail-ctx">
                    ${curParty.content}
                </div>
              </div>
          `;
          $('.new-recommand-info').empty().append(result)
          $(".news-like .detail-ctx").niceScroll({cursorborder:"",cursorcolor:"#position: relative;"});
        }
      })
    }
  }
  loadData();
  // 改变变屏幕尺寸
  changeScreen();
  // 移动端侧边栏
  mobileSlider();
  // 导航栏
  operateNav();
})
