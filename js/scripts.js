"use strict";

var page = {

  init: function ($carousel) {

    var $arrowRight = $carousel.find('a.carousel-control.right'),
        $arrowLeft = $carousel.find('a.carousel-control.left');

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

    var toggleArrows = function () {
      var idx = $carousel.find('.carousel-inner .item.active').index();

      $arrowLeft.toggle(idx != 0);
      $arrowRight.toggle(idx != 4);
    };

    $carousel.bind('slid.bs.carousel', updateHash);
    $carousel.bind('slid.bs.carousel', toggleArrows);
    $(window).bind('hashchange', updateHash);

    toggleArrows();

    // Bind keyboard events.

    $(document).bind('keydown', function (e) {
      if (e.keyCode == 39)          $arrowRight.trigger('click');
      else if (e.keyCode == 37)     $arrowLeft.trigger('click');
    });
  },

  calcTotalRevenue: function (nFriends, giftBoxValue) {
    var successRate = 0.3;
    if (giftBoxValue == 1000) {
      successRate = 0.2;
    } else if (giftBoxValue == 5000) {
      successRate = 0.1;
    } else if (giftBoxValue == 10000) {
      successRate = 0.1;
    }

    return {
      perEach: parseInt(giftBoxValue * 0.7),
      total: parseInt(nFriends * giftBoxValue * successRate * 0.7)
    }
  },

  formatMoney: function (value) {
    return value.toString().replace(/\d(?=(\d{3})+$)/g, '$& ');
  },

  asMoney: function (val) {
    return isNaN(val) ? '' : this.formatMoney(val);
  }
};