require('js/vendor')
require('js/main')
require('lightslider')
require('jquery-zoom')

;(function() {
  $('#light-slider').lightSlider({
    gallery: true,
    item: 1,
    loop:true,
    slideMargin: 0,
    thumbItem: 7,
    vThumbWidth: 150,
    onSliderLoad: function (el) {
      el.find('li').zoom()
    }
  });
})();
