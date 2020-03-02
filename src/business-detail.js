import './sass/business-detail.scss';
import $ from 'jquery';
import './img/yq.png';
import api from './fetch/api';
import './vendors/loading'
import {operateNav, loadingAnimate, removeLoading} from './utils/urlFilter';

// 详情页
$(function () {
   /** 计算右边距离 */
   // 导航栏操作
   function initCalc () {
     let navC = $('.child-list').offset().left;
     let disWid = $(window).width() - navC;
     $('.child-list').css({width: disWid});
   }
   $(window).on('resize', function () {
    initCalc();
  });
   initCalc();

   // 导航栏操作
   operateNav()

  let maps = {
    0: '综合物流产业园',
    1: '标准运输',
    2: '商贸流通',
    3: '平行车产业链',
    4: '港口经营'
  };
  let types = {
    0: '物流+产业 汇聚优势资源',
    1: '前沿探索 引领行业标准',
    2: '大宗商品一体化 赋能供应链',
    3: '行业领先的汽车供应链平台',
    4: '临海扬帆 港通天下'
  }

  let search = this.location.search;
  let params = search.substring(1).split('&');
  let id = params[0].split('=')[1];
  let tab = params[1].split('=')[1];
  function fetchData ({id}) {
    let subTitle = types[tab]; // 子标题
    let title = maps[tab];
    $('.second-crumb').text(title);
    loadingAnimate()
    api.GetBusinessById({id}).then(res => {
      removeLoading()
      let companyName = res.companyName;
      let img = res.companyImage;
      let person = res.companyPrincipals.map((person, i) => {
        let temp = i > 0 ? `<div class="phone-info phone-second">` : `<div class="phone-info phone-second">`;
        temp += `
            <div class="phone-common">${person.name}</div>
            <div class="phone-common">${person['phone1']}</div>
          </div>
        `;
        return temp;
      }).join('')

      let result = `
        <div class="business-item">
          <div class="cel-common">
              <div class="business-title">
                <span class="h3-title h3-normal">${subTitle}</span>
                <span class="h2-title">${companyName}</span>
              </div>
              <img class="business-img" src="${img}">
              <div class="business-phone">
                <div class="phone-desc">业务洽谈</div>
                ${person}
              </div>
          </div>
        </div>

        <div class="business-item">
          <div class="cel-common cel-common-txt">
              <span class="txt-info">${res.companyDetail}</span>
          </div>
        </div>
      `;
     $('.business .main-wrap').empty().append(result);
    })
  }
  fetchData({id})

  $('.second-crumb').click(function () {
    window.location.href=`business.html?tab=${tab}`;
  });
  $('.first-crumb').click(function () {
    window.location.href=`business.html`;
  });
});
