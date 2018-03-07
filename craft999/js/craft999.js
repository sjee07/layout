$(function(){
  var $devWidth;
  var $limitSize=767;

  // 반응형 부분 추가
  $(window).resize(function(){
    $devWidth=$('body').width();
  }).resize();

  //main slide
  var swiper = new Swiper('.main', {
  spaceBetween: 5,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

// 네비게이션 (사이즈별 적용 수정) *******
$('.gnb-nav').on('mouseenter focusin',function(){
  if($devWidth < $limitSize) return false;
  $('header').addClass('on');
  $('header .gnb-nav li ul').stop().fadeIn(500);
}).on('mouseleave focusout',function(){
  if($devWidth < $limitSize) return false;
  $('header').removeClass('on');
  $('header .gnb-nav li ul').stop().fadeOut(200);
})

//모바일 토글메뉴
$('.toggle-menu').on('click', function(){
  $('header').toggleClass('open');
})


//검색창
$('.right-nav .wrap #btn-search-open').on('click',function(){
  $('.search-form').toggle();
  $(this).find('i').toggleClass('icon-search icon-plus');
})

//서브 네비 열기/닫기 적용 ****
$('.right-nav #btn-menu-open').on('click',function(){
  $('.right-nav').toggleClass('active');
  $('.right-nav.active .wrap > button.btn-search-open').remove();
  $(this).toggleClass('icon-angle-double-left icon-angle-double-right');
})

//로그인 팝업
$('#btn-login').on('click',function(){
  $('.popup-login').slideDown();
  //팝업 백그라운드를 깔아준다.
  $('body').append('<div class="popup-bg"></div>');
})


// offline accordion
  $('#accordion li > a').click(function(e){
    e.preventDefault();
    $(this).next('.list').slideToggle(); //find는 자식을 찾을때
    $(this).find('i').toggleClass('icon-angle-double-down icon-angle-double-up');
  })

})

//구글 지도
function initMap(latVal, lngVal) {
  //console.log('구글지도위치값:',latVal, lngVal);
  //위도경도의 값이 정의되지 않았을 때 기본값을 저장하도록 설정
  if(latVal==undefined && lngVal==undefined){
    latVal=37.560770;
    lngVal=126.984815;
  }

  var uluru = {lat: latVal, lng: lngVal};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });

  //마커를 클릭했을 때
  marker.addListener('click', function() {
    popupStore();
    //console.log('마커를 클릭함');
  });
}
