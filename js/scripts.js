"use strict";

var page = {

  init: function ($carousel) {

    // Check URL hash and open the corresponding tab.

    var url = document.location.toString();
    if (url.match('#')) {
      var tag = url.split('#')[1];
      var $selectedItem = $('.carousel-inner .item').filter(function (i, e) {
        return $(e).find('div.tag').text() == tag;
      });

      if ($selectedItem.length) $carousel.carousel($selectedItem.index());
      else                      $carousel.carousel(0);

    } else {
      $carousel.carousel(0);
    }

    // Update hash on carousel switch.

    var updateHash = function () {
      var $item = $carousel.find('.carousel-inner .item.active');
      var tag = $item.find('.tag').text();
      window.location.hash = "#" + tag;
    };

    $carousel.bind('slid.bs.carousel', updateHash);
    $(window).bind('hashchange', updateHash);
  },

  calcTotalRevenue: function (nFriends, giftBoxValue, successRate) {
    return {
      perEach: parseInt(giftBoxValue * 0.7),
      total: parseInt(nFriends * giftBoxValue * successRate * 0.7)
    }
  },

  formatMoney: function (value) {
    return value.toString().replace(/\d(?=(\d{3})+$)/g, '$& ');
  },

  asMoney: function (val) {
    if (isNaN(val)) {
      return '';
    } else {
      return this.formatMoney(val);
    }
  }
};