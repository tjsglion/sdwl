import $ from 'jquery';
import './sass/business.scss';
import './img/business-1.png';
import './img/business-2.png';
import './img/business-3.png';
import './img/business-4.png';
import './img/business-5.png';
import './img/business-6.png';
import './img/business-7.png';
import './img/business-8.png';
import './img/business-9.png';
import {getQueryString} from './utils/urlFilter'
import api from './fetch/api';
// import './vendors/loading'
import {changeScreen, mobileSlider, operateNav} from './utils/urlFilter';
import {tap} from './utils/tap'
(function ($) {

   /** 计算右边距离 */
   // 导航栏操作
   function initCalc () {
     if (!$('.child-list').offset()) return;
     let navC = $('.child-list').offset().left;
     let disWid = $(window).width() - navC;
     $('.child-list').css({width: disWid});

     let left = $('.tab-right-bg').offset().left;
     $('.tab-right-bg').css({
       right: -left
     });
   }
   $(window).on('resize', function () {
    initCalc();
  });
   initCalc();

   function startMove (index, target) {
      target.addClass('active').siblings().removeClass('active');
      $('body > .business-tab .tab-header').eq(index).addClass('active').siblings().removeClass('active');
      let trans_top = index > 0 ? arr[index] - 80 : 0;
      $('html , body').animate({scrollTop: trans_top}, 300);
      index > 0 ? $('body > .business-tab').css({top: 0}) : $('body > .business-tab').css({top: -200});
    }

  let tab1 = $('.tab-1');
  let tab2 = $('.tab-2');
  let tab3 = $('.tab-3');
  let tab4 = $('.tab-4');
  let tab5 = $('.tab-5');
  let tab1_top = tab1.offset().top;
  let tab2_top = tab2.offset().top;
  let tab3_top = tab3.offset().top;
  let tab4_top = tab4.offset().top;
  let tab5_top = tab5.offset().top;
  let arr = [tab1_top, tab2_top, tab3_top, tab4_top, tab5_top];

  let cloneCache = null;
  if (!cloneCache) cloneCache = $('.business-tab').clone(true);
  $('body').append($(cloneCache)).addClass('clone-tab');
  $('.business-tab .tab-header').on('click', function () {
    let index = $(this).index();
    startMove(index, $(this));
  });

  $(window).scroll(function () {
    let scrollTop = $(document).scrollTop();
    let target = 355;
    if (scrollTop > target) {
      $('body > .business-tab').css({top: 0});
    } else {
      $('body > .business-tab').css({top: -200});
    }
    // 为滚动添加样式
    let index = 0;
    let dis = scrollTop + tab1_top;
    if (dis > tab5_top) {
      index = 4;
    } else if (dis > tab4_top) {
      index = 3;
    } else if (dis > tab3_top) {
      index = 2;
    } else if (dis > tab2_top) {
      index = 1;
    } else {
      index = 0;
    }
    $('.business-tab .tab-header').eq(index).addClass('active').siblings().removeClass('active');
    $('body > .business-tab .tab-header').eq(index).addClass('active').siblings().removeClass('active');
  });

  $('html , body').animate({scrollTop: 0},300);

  // 获取地址栏参数
  let currentTab = getQueryString('tab');
  if ((currentTab !== undefined && currentTab !== null)) {
    startMove(currentTab, $('.business-tab .tab-header'));
  }
  function initTabTop () {
    // 更多详情
    $('.block-btn, .desc-btn').on('click', function () {
      let tab = $(this).attr('data-tab');
      let id = $(this).attr('data-id');
      let reg = /^true$/;
      let carDetail = reg.test($(this).attr('data-car'));
      if (carDetail)  window.location.href = `business-car.html?id=${id}&tab=${tab}`;
      else window.location.href = `business-detail.html?id=${id}&tab=${tab}`;
    })

    // 播放视频
    $('.play-model').on('click', function () {
      $('#play').animate({top: 0}, 300);
    })
    $('#play .close-video').on('click', function () {
      $('#myVideo').get(0).pause();
      $('#play').animate({top: '-100%'}, 300);
    })

    tap('.show-detail .icon', function ({target}) {
      !target.hasClass('icon-top') ? target.addClass('icon-top') : target.removeClass('icon-top')
      let parent = target.parents('.block-info')
      let childTarget = parent.find('.block-img, .desc')
      childTarget.hasClass('mobile-toggle-show') ? childTarget.removeClass('mobile-toggle-show') :
      childTarget.addClass('mobile-toggle-show')
    })

  }

  function initPerson (person, type) {
    if (!person) return false;
    let personInfo = person.companyPrincipals.map((phone, index) => {
      if (index > 0) return ''
      let phoneArr = []
      if (phone.phone1) phoneArr.push(phone.phone1)
      if (phone.phone2) phoneArr.push(phone.phone2)
      let pc = ``;
      let mobile = ``;
      phoneArr.map(p => {
        pc += `<span class="number">${p}</span>`
        mobile += `
          <span class="phone-number-span">
            <a class="number" href="tel: ${p}"><i class="icon font_family icon-dianhua"></i>${p}</a>
          </span>
        `
      })
      return `
        <div class="block-service mobile-hide">
          <span class="block-scale">${type}</span>
          <div class="block-phone">
            <span class="name">${phone.name}</span>
            <span class="phone-numb">
                ${pc}
            </span>
          </div>
        </div>
        <div class="block-service mobile-show">
            <span class="block-scale">${type}</span>
            <div class="block-phone">
              <span class="name">${phone.name}</span>
              <span class="phone-numb">
                 ${mobile}
              </span>
            </div>
        </div>`
    }).join('')
    return personInfo;
  }
  /**
   *
   * @param {*} target 目标对象
   * @param {*} arr 公司数组
   * @param {*} tabType 标签类型 0, 1, 2, 3, 4
   * @param {*} businessType 业务类型: 业务洽谈|业务客服
   * @param {*} moreInfo 更多: 园区详情|更多详情
   */
  function initCompany (target, arr, tabType, businessType, moreInfo) {
    let oneObj = arr[0]
    let twoObj = arr[1]
    let personOneInfo = initPerson(oneObj, businessType)
    let personTwoInfo = twoObj && initPerson(twoObj, businessType)
    let regx1 = '青岛西海岸港口'
    let oneImg = ``
    let companyOneClazz = oneObj.companyName.length > 15 ? 'company-name company-name-more' : `company-name`
    let companyTwoClazz = twoObj && twoObj.companyName.length > 15 ? 'company-name company-name-more' : 'company-name'
    if (oneObj.companyName.match(regx1)) {
      oneImg = `
        <img src="${oneObj.companyImage}" />
        <div class="play-model">
          <i class="icon font_family icon-bofang"></i>
        </div>
      `
    } else {
      oneImg = `<img src="${oneObj.companyImage}" />`
    }
    let one = `
      <div class="block-info">
        <div class="block-title">
          <span class="${companyOneClazz}">${oneObj.companyName}</span>
          <span class="show-detail mobile-show">
            <i class="icon font_family icon-xiala"></i>
          </span>
        </div>
        <div class="block-img mobile-toggle-hide">
            ${oneImg}
        </div>
        <div class="desc mobile-toggle-hide">
          ${oneObj.companyAbstract}
        </div>
        <div class="block-btn mobile-hide" data-tab="${tabType}" data-id="${oneObj.id}">${moreInfo} 》</div>
        ${personOneInfo}
      </div>
    `
    let carDetail = false;
    let regx = '奥维俊杉'
    if (twoObj && twoObj.companyName.match(regx)) {
      carDetail = true;
    } else {
      carDetail = false;
    }
    let two = ``;
    if (twoObj) {
      two = `
        <div class="block-info title-another">
          <div class="block-title">
            <span class="${companyTwoClazz}">${twoObj.companyName}</span>
            <span class="show-detail mobile-show">
                <i class="icon font_family icon-xiala"></i>
              </span>
          </div>
          <div class="block-img mobile-toggle-hide">
            <img src="${twoObj.companyImage}" />
          </div>
          <div class="desc mobile-toggle-hide">
            ${twoObj.companyAbstract}
          </div>
          <div class="block-btn"  data-tab="${tabType}" data-id="${twoObj.id}" data-car="${carDetail}">${moreInfo} 》</div>
          ${personTwoInfo}
        </div>
      `
    }
    console.log('====one:', one);
    console.log('====two:', two);
    (two && two.length > 0) ? $(target).empty().append(one).append(two) : $(target).empty().append(one);
  }
  function initTab1 (arr) {
    initCompany('.tab-1 .tab-body-right', arr, 0, '业务洽谈', '园区详情')
  }
  function initTab2 (arr) {
    initCompany('.tab-2 .tab-body-right', arr, 1, '业务客服', '更多详情')
  }
  function initTab3 (arr) {
    initCompany('.tab-3 .tab-body-right', arr, 2, '业务洽谈', '更多详情')
  }
  function initTab4 (arr) {
    initCompany('.tab-4 .tab-body-right', arr, 3, '业务洽谈', '更多详情')
  }
  function initTab5 (obj) {
    let pcPerson = ``,
        mobilePerson = ``;
    obj.companyPrincipals.map((person, index) => {
      let bT = index === 0 ? '业务洽谈' : '生产洽谈'
      pcPerson += `
        <div class="server-common">
          <span class="block-scale">${bT}</span>
          <div class="block-phone">
            <span class="name">${person.name}</span>
            <span class="number">${person.phone1}</span>
          </div>
        </div>
      `
      mobilePerson += `
        <div class="block-service">
          <span class="block-scale">${bT}</span>
          <div class="block-phone">
            <span class="name">${person.name}</span>
            <span class="phone-number-span">
              <a class="number" href="tel: ${person.phone1}"><i class="icon font_family icon-dianhua"></i>${person.phone1}</a>
            </span>
            <!-- <span class="number">${person.phone1}</span> -->
          </div>
      </div>
      `
    });
    let personInfo = `
      <div class="right-server mobile-hide">
        ${pcPerson}
      </div>
      <div class="right-server mobile-show">
        ${mobilePerson}
      </div>
    `;
    let ctx = `
      <div class="right-title">
        <span class="title-span">${obj.companyName}</span>
      </div>
      <div class="gk-img mobile-hide">
        <img class="block-img-8" src="${obj.companyImage}" />
      </div>
      <div class="right-desc mobile-hide">
        <span class="desc-info">
          ${obj.companyAbstract}
        </span>
        <span class="desc-btn mobile-hide" data-tab="4" data-id="${obj.id}">更多详情 》</span>
      </div>
      ${personInfo}
    `

    $('.tab-5 .tab-body-right').empty().append(ctx);
  }

  function fetchData () {
    // loadingAnimate();
    api.GetAllBusiness({pageNumber: 1, pageSize: 999}).then(res => {
      // removeLoading();
      let tab1Temp = []
      let tab2Temp = []
      let tab3Temp = []
      let tab4Temp = []
      let tab5Temp = []
      let {list = []} = res;
      if (list.length > 0) {
        list.map(item => {
          switch (+item.companyType) {
            case 1:
              tab1Temp.push(item);
              break;
            case 2:
              tab2Temp.push(item);
              break;
            case 3:
              tab3Temp.push(item);
              break;
            case 4:
              let reg = '奥维俊杉'
              if (item.companyName.match(reg)) {
                tab4Temp[1] = item
              } else {
                tab4Temp[0] = item
              }
              break;
            case 5:
              tab5Temp.push(item);
              break;
          }
        })
      }
      initTab1(tab1Temp)
      initTab2(tab2Temp)
      initTab3(tab3Temp)
      initTab4(tab4Temp)
      initTab5(tab5Temp[0])
      initTabTop();
    })
  }
  fetchData();
  changeScreen();
  mobileSlider();
  operateNav();
  // fetchData();
})($);
