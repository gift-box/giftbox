"use strict";

function stubYouTubeEmbeds() {

  // Extract the YouTube video ID.
  function extractId(src) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (src.match(p) ? RegExp.$1 : undefined);
  }

  $('iframe').each(function (i, e) {
    var $elem = $(e),
        src = $elem.attr('src');

    if (!(src && src.match(/http(s)?:\/\/www\.youtube\.com/))) {
      return;
    }

    var id = extractId(src);
    if (!id) {
      return;
    }

    // Position `play' button to the center.
    var w = parseInt($elem.attr('width')),
        h = parseInt($elem.attr('height')),
        pw = Math.ceil((w - 77) / 2),
        ph = Math.ceil((h + 77) / 2);

    var sId = "'" + id + "'";
    var code = '<div style="width:' + w + 'px; height:' + h + 'px; margin:0 auto">' +
        '<a href="#" onclick="loadOnPreview(' + sId + ',' + w + ',' + h + ');return false;" id="youtube-stub-' + id + '">' +
        '<img src="http://i.ytimg.com/vi/' + id + '/hqdefault.jpg" style="width:' + w + 'px; height:' + h + 'px;" />' +
        '<div class="youtube-stub-play" style="margin-left:' + pw + 'px; margin-top:-' + ph + 'px;">' +
        '</div>' +
        '</a>' +
        '</div>';

    // Replace the existing iframe with the image code.
    $elem.after(code);
    $elem.remove();
  });
}

function loadOnPreview(vidId, w, h) {
  var code =
      '<iframe src="https://www.youtube.com/embed/' + vidId + '/?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1" width="' + w + '" height="' + h + '" frameborder=0 allowfullscreen style="border:1px solid #ccc;" >' +
          '</iframe>';

  // Again, replace stub with the original iframe.
  var $elem = $("#youtube-stub-" + vidId);
  $elem.after(code);
  $elem.remove();
}