$(function(){
  var swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
    mousewheel: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//navigation
$('.home-ul > li').on('mouseenter', function(){
  $(this).find('ul').stop().slideDown();
}).on('mouseleave', function(){
  $(this).find('ul').stop().slideUp();
})
})
