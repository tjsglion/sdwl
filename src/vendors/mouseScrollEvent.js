import $ from 'jquery';
function MouseScrollEvent (scrollCon, scrollBody, scrollItem, name) {
  this.tabLeft = 0;
  this.index = 0;
  this.parentIndex = 0;
  this.name = name;
  this.scrollCon = scrollCon;
  this.scrollBody = scrollBody;
  this.scrollItem = scrollItem;
}

MouseScrollEvent.prototype = {
  constructor: MouseScrollEvent,
  init: function (cb) {
    let allItem = $(this.scrollBody).find(this.scrollItem);
    let self = this;
    allItem.each(function () {
      let name = $(this).attr('data-name');
      if (name === self.name) {
        $(this).addClass('active').siblings().removeClass('active');
        self.moveToTab($(this).get(0), cb);
      }
    });
  },
  handleScroll: function (e) {
    // debugger;
    let type = e.type;
    let delta = 0; // 滚动距离
    if (type === 'DOMMouseScroll' || type === 'mousewheel') { // 滚动一下 移动120px
      delta = (e.wheelDelta ? e.wheelDelta / 3 : -(e.delta || 0)) * 40;
    }
    let left = 0;
    if (delta > 0) { // 滚动条向左走
      left = Math.min(0, this.tabLeft + delta);
    } else {
      // 获取容器宽度
      let scrollConWidth = $(this.scrollCon).get(0).offsetWidth;
      let scrollBodyWidth = $(this.scrollBody).get(0).offsetWidth;
      if (scrollConWidth - 100 < scrollBodyWidth) { // 当滚动区域 小于内容滚动区域时， 可滚动
        if (this.tabLeft < -(scrollBodyWidth -scrollConWidth + 100)) {
          left = this.tabLeft;
        } else {
          left = Math.max(this.tabLeft + delta, scrollConWidth - scrollBodyWidth - 100);
        }
      } else {
        left = 0;
      }
    }
    this.tabLeft = left;
    this.startMove();
  },
  moveToTab: function (tab, cb) {
    let scrollConWidth = $(this.scrollCon).get(0).offsetWidth;
    if (tab.offsetLeft < -this.tabLeft) {
      this.tabLeft = -tab.offsetLeft + 10
    } else if (tab.offsetLeft + 10 > -this.tabLeft &&
      tab.offsetLeft + tab.offsetWidth < -this.tabLeft + scrollConWidth - 100) { // 当前标签在可视区内
      this.tabLeft = Math.min(0, scrollConWidth - 100 - tab.offsetWidth - tab.offsetLeft)
    } else { // 当前标签在可视区右侧
      this.tabLeft = -(tab.offsetLeft - (scrollConWidth - 100 - tab.offsetWidth));
    }
    this.startMove(cb);
  },
  startMove: function (cb) {
    $(this.scrollBody).stop();
    $(this.scrollBody).animate({left: this.tabLeft}, 100);
    cb && cb(this.index);
  },
  setName: function (name) {
    this.name = name;
  },
  setIndex: function (index) {
    this.index = index;
  },
  setParentIndex: function (index) {
    this.parentIndex = index;
  }
}

module.exports = MouseScrollEvent;