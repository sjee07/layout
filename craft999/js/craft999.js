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
var searchFlag=true;
$('.right-nav .wrap #btn-search-open').on('click', function(){
  if(searchFlag){
    $(this).find('span').text('통합검색창닫기');
    searchFlag=false;
  }else{
    $(this).find('span').text('통합검색창열기');
    $('.search-form input').val('');
    searchFlag=true;
  }
  $(this).find('i').toggleClass('icon-search icon-plus');
  $('.search-form').toggle();
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

//offline accordion 리스트 클릭후 리스트 닫히는거
//a 클릭후 .list가 slideup(a의 엄마)되어야 하므로 parent(엄마)를 선택함
  $('.accordion.list > a').click(function(e){
    e.preventDefault();
    $(this).parent().slideUp();
  })


// accordion e.preventDefault하는 방법
//처음에 보여지고 있는 #accordion을 선택후, 보이지 않는(사실상 e.preventDefault해야하는)
//'.accordion a'를 따로 선택후 e.preventDefault를 먹혀줘야 함.
  $('#accordion').on('click', '.accordion a', function(e){
    e.preventDefault();
  })

  selectIndex=0;
  $('.accordion.list a').on('click', function(){
    $('.accordion.list a').removeClass('active');
    $(this).addClass('active');
    selectIndex=$(this).index();
    // console.log('선택한리스트');
    initMap(storeInfo[selectIndex].lat, storeInfo[selectIndex].lng);
  })


})

//매장검색======================================
storeInfo=[{
  name:'BY ET TOL(롯데백화점 월드타워점)',
  addr:'서울 강남1',
  tel:'02-123-4567',
  lat:37.513378,
  lng:127.101529,
},{
  name:'BY ET TOL(롯데백화점 강남점)',
  addr:'서울 강남2',
  tel:'02-890-1234',
  lat:37.496919,
  lng:127.053259,
},{
  name:'IT Hysan place',
  addr:'서울 서대문구 1',
  tel:'02-567-8910',
  lat:37.528352,
  lng:127.040191,
}];

storeInfo



//구글 지도
function initMap(latVal, lngVal) {
  //console.log('구글지도위치값:',latVal, lngVal);
  //위도경도의 값이 정의되지 않았을 때 기본값을 저장하도록 설정
  if(latVal==undefined && lngVal==undefined){
    latVal=37.513378;
    lngVal=127.101529;
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

  // 정보 더보기
  var contentString =
  '<dl>'
  +'  <dt>매장주소</dt>'
  +'  <dd>'+storeInfo[selectIndex].addr+'</dd>'
  +'  <dt>전화번호</dt>'
  +'  <dd>'+storeInfo[selectIndex].tel+'</dd>'
  +'</dl>'
;


  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  //마커를 클릭했을 때
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
    //console.log('마커를 클릭함');
}
