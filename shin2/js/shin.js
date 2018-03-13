$(function(){
  //main slide
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  //navigation
  $('.home-ul > li').on('mouseenter', function(){
    $(this).find('ul').stop().slideDown();
  }).on('mouseleave', function(){
    $(this).find('ul').stop().slideUp();
  })

  //모바일 메뉴토글
$('#btn-menu').on('click',function(){
  $('header').toggleClass('on');
  var icon=$(this).find('svg').attr('data-icon');
  if(icon=='bars'){
    $('#btn-menu svg').attr('data-icon','times');
    $('body').append('<div class="bg"></div>');
  }else{
    $('#btn-menu svg').attr('data-icon','bars');
    $('.bg').remove();
  }
})

//모바일의 2depth메뉴
  var $devWidth;
  var $limitSize=767; //모바일 구분사이즈
 $(window).resize(function(){
   $devWidth=$('body').width();
   if($devWidth < $limitSize){
      return false;
    }else{ // pc일 때
      swiper.on('slideChange', function(){
        console.log('페이지 전환됨');
        // 페이지 전환시 안내문구 제거
        var activeIndex=swiper.activeIndex;
        // console.log(activeIndex)

        if(activeIndex==0){
          $('nav').removeClass('color');
          $('.logo img').attr('src', 'img/logo.png');
        }
        else if(activeIndex==2){
          $('nav').removeClass('color');
          $('.logo img').attr('src', 'img/logo.png');
        }
        else if(activeIndex==4){
          $('nav').removeClass('color');
          $('.logo img').attr('src', 'img/logo.png');
        }
        else{
        $('nav').addClass('color');
        $('.logo img').attr('src', 'img/logo2.png');
        }
      })
    }
}).resize();

  swiper.on('slideChange', function(){
    console.log('페이지 전환됨');
    // 페이지 전환시 안내문구 제거
    var activeIndex=swiper.activeIndex;
    // console.log(activeIndex)

    if(activeIndex==0){
      $('.insta').removeClass('isns');
    }else if(activeIndex==4){
      $('.insta').removeClass('isns');
    }else{
      $('.insta').addClass('isns');
    }
  })


  // 동영상 재생
  $('.slide2-video a').on('click', function(){
    $('.popup-video').fadeIn();
    $('body').append('<div class="bg"></div>');
  })

  $('.popup-video a').on('click', function(){
    $('.popup-video').fadeOut();
    $('.bg').remove();
  })
  // new WOW().init();
  })

  // maps
  function initMap() {
    var uluru = {lat: -33.851090, lng: 151.040106};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });

  }
