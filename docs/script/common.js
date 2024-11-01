$(function(){
    var mainSwiper = new Swiper(".mainSwiper", {
        slidesPerView: 1.2,  // 화면에 보여질 슬라이드 수
        spaceBetween: 20,  // 슬라이드 사이의 간격 (px 단위)
        centeredSlides: false,  // 현재 슬라이드를 가운데 배치
        loop: true,  // 슬라이드 반복
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
              slidesPerView: 1.5,    // 768px 이상에서 3.2개 슬라이드, 다음 슬라이드 일부 노출
              spaceBetween: 20,
              centeredSlides: true, 
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
      });

    $(".header_left ul li").click(function(){
        const index = $(this).index();

        $(this).addClass("view").siblings().removeClass("view");
    });

    $(".widget").click(function(){
        $(this).find(".w_cont").show();  // 현재 클릭된 .widget 내의 .w_cont만 보이게 함
    });
    
    $(".w_close").click(function(event){
        event.stopPropagation();  // 이벤트 버블링을 막음
        $(this).closest(".w_cont").hide();  // 클릭된 .w_close 가장 가까운 .w_cont를 찾아 숨김
    });

    $(".h_icon").click(function(event) {
        event.preventDefault();  // 기본 동작 중지
        // 이미지 경로 체크 및 변경
        var currentImage = $(this).css('background-image');
        if (currentImage.indexOf('icon_heart.png') !== -1) {
            $(this).css('background-image', 'url(../img/icon_heart-b.png)');
        } else {
            $(this).css('background-image', 'url(../img/icon_heart.png)');
        }
    });

    // main-c_list
    var customSwiper;
        function initSwiper() {
        var screenWidth = window.innerWidth;
        
        if (screenWidth <= 1024) {
            // 1024px 이하일 때 Swiper 초기화
            if (!customSwiper) { // 여기서 customSwiper로 변수명을 사용해야 합니다.
            customSwiper = new Swiper('.customSwiper', {
                slidesPerView: 2.2,        // 기본 슬라이드가 2.2개 보이도록 설정 (다음 슬라이드 일부 노출)
                spaceBetween: 20,          // 슬라이드 간격
                loop: true,                // 반복
                centeredSlides: false,     // 슬라이드가 중앙에 오지 않고 왼쪽에 배치
                breakpoints: {
                640: {
                    slidesPerView: 2.2,    // 640px 이상에서 2.2개 슬라이드
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3.2,    // 768px 이상에서 3.2개 슬라이드, 다음 슬라이드 일부 노출
                    spaceBetween: 30,
                }
                }
            });
            }
        } else {
            // 1024px 이상일 때 Swiper 해제
            if (customSwiper) {
            customSwiper.destroy(true, true); // Swiper 해제
            customSwiper = undefined;

            // swiper-slide에 남아있는 인라인 스타일 제거
            document.querySelectorAll('.customSwiper .swiper-slide').forEach(function(slide) {
                slide.style.marginRight = ''; // margin-right 스타일 초기화
            });
            }
        }
        }

        // 초기 실행 및 화면 크기 변경 시 Swiper 적용
        window.addEventListener('load', initSwiper);
        window.addEventListener('resize', initSwiper);

    //localCampaign
    $(".text > ul").click(function(){
        $(".submenu").slideToggle();
    });

    let localBtn = $(".local_menu > ul > li");
    let localCont = $(".local_cont > ul");

    // 처음 페이지 로드 시 첫 번째 컨텐츠만 보이도록 설정
    localCont.hide().eq(0).show();

    localBtn.click(function(){
        const index = $(this).index();

        // '전체' 메뉴를 클릭했을 때 모든 local_cont를 보여줌
        if (index === 0) {
            // 모든 localCont 보여줌
            localCont.show();
        } else {
            // 클릭된 메뉴의 콘텐츠만 보여주고 나머지는 숨김
            localCont.hide().eq(index).show();
        }

        // 클릭된 버튼에 active 클래스 추가, 나머지에서는 제거
        $(this).addClass("active").siblings().removeClass("active");
    });

    $(".img_btn").click(function(){
        var imgElement = $('.img');
            if (imgElement.css('max-height') === 'none') {
                imgElement.css('max-height', '300px');  // 다시 클릭하면 원래대로 300px
            } else {
                imgElement.css('max-height', 'none');  // 처음 클릭 시 전체 이미지 보이기
            }
        $(this).toggleClass("view");
    });

    // 처음에는 9개만 보이도록 설정
    $(".review_grid > ul").hide().slice(0, 8).show();

    // 버튼 클릭 시 4개씩 추가로 보이게 하기
    let itemsToShow = 8; // 처음에 보여주는 아이템 개수
    const increment = 4; // 클릭할 때마다 추가로 보여줄 아이템 개수

    $(".review_btn").click(function() {
    itemsToShow += increment; // 4개씩 추가
    $(".review_grid > ul").slice(0, itemsToShow).show(); // 현재 보여줄 개수만큼 li 보이기

    // 더 이상 보일 li가 없으면 버튼 숨기기
    if ($(".review_grid > ul:hidden").length === 0) {
        $(this).hide();
    }
    });

    // active 클래스가 있는 li의 인덱스를 가져옴
    var activeIndex = $(".info_menu > li.active").index();

    // active 클래스가 있는 li와 해당하는 div만 보이게 설정
    if (activeIndex !== -1) { // active 클래스가 있는 경우
        $(".info_tab > div").hide();
        $(".info_tab > div").eq(activeIndex).show();
    } else { // active 클래스가 없는 경우, 첫 번째 li와 div가 보이게
        $(".info_menu > li").eq(0).addClass("active");
        $(".info_tab > div").hide();
        $(".info_tab > div").eq(0).show();
    }

    // li 클릭 시 해당 div 보이게 설정
    $(".info_menu > li").on("click", function() {
        // 클릭한 li의 인덱스를 가져옴
        var index = $(this).index();

        // 모든 li에서 active 클래스 제거 후 클릭된 li에 추가
        $(".info_menu > li").removeClass("active");
        $(this).addClass("active");

        // 모든 div 숨기고, 클릭한 li에 해당하는 div만 보이게
        $(".info_tab > div").hide();
        $(".info_tab > div").eq(index).fadeIn(); // 애니메이션으로 보이게
    });


    //mypage
    let mypageBtn = $(".mypage_right_tabmenu > li");
    let mypageCont = $(".mypage_right_tabcont > ul");

    // 처음 페이지 로드 시 첫 번째 컨텐츠만 보이도록 설정
    mypageCont.hide().eq(0).show();

    mypageBtn.click(function(){
        const index = $(this).index();

        // // '전체' 메뉴를 클릭했을 때 모든 local_cont를 보여줌
        // if (index === 0) {
        //     // 모든 localCont 보여줌
        //     mypageCont.show();
        // } else {
        //     // 클릭된 메뉴의 콘텐츠만 보여주고 나머지는 숨김
        //     mypageCont.hide().eq(index).show();
        // }

        // 클릭된 메뉴의 콘텐츠만 보여주고 나머지는 숨김
        mypageCont.hide().eq(index).show();
        $(this).addClass("active").siblings().removeClass("active");
    });

    //mypage_point
    let pointBtn = $(".point_menu > li");
    let pointCont = $(".point_cont");

    pointCont.hide().eq(0).show();

    pointBtn.click(function(){
        const index = $(this).index();

        $(this).addClass("active").siblings().removeClass("active");
        pointCont.hide().eq(index).show();
    });

    //mypage_cs
    $(".cs_grid > ul").not(".cs_grid_txt").each(function(index) {
        // 각 ul의 첫 번째 li에 게시글 순번을 부여
        $(this).find("li:first").text($(".cs_grid > ul").not(".cs_grid_txt").length - index); // 역순으로 번호 부여
    });

    //mypage_notice
    $(".notice_list").each(function(index) {
        // 각 ul의 첫 번째 li에 게시글 순번을 부여
        $(this).find("li:first").text($(".notice_list").length - index); // 역순으로 번호 부여
    });


    //join
    let joinBtn = $(".join_menu > li");
    let joinCont = $(".join_cont");

    joinBtn.click(function(){
        const index = $(this).index();

        $(this).addClass("active").siblings().removeClass("active");
        joinCont.hide().eq(index).fadeIn().show();
    });

    //admin-member01
    // $("member_list").on("click",function(){
            
    //     const check = $(this).hasClass("view");
        
    //     $("member_list").removeClass("view");
        
    //     if(!check){
    //         $(this).addClass("view");
    //     }
    // });
    function handleResize() {
        if (window.innerWidth < 1024) {
            // 화면 크기가 1024px 미만일 때만 클릭 이벤트 적용
            $('.member_list').off('click').on('click', function() {
                // 다른 리스트가 열려 있으면 닫기
                $('.member_sub_list').not($(this).find('.member_sub_list')).slideUp();
    
                // 현재 클릭한 리스트 토글 (열기/닫기)
                $(this).find('.member_sub_list').slideToggle();
            });
        } else {
            // 화면 크기가 1024px 이상이면 클릭 이벤트 제거
            $('.member_list').off('click');
            $('.member_sub_list').slideUp();  // 메뉴를 모두 닫음
        }
    }
    
    // 초기 화면 크기 체크
    handleResize();
    
    // 창 크기가 변경될 때마다 크기 체크
    $(window).resize(function() {
        handleResize();
    });
    
    let reportBtn = $(".report_btn");
    let reportCont = $(".report_popup");
    let reportClose = $(".report_close");

    reportCont.hide();

    reportBtn.click(function(){
        reportCont.show();
    });

    reportClose.click(function(){
        reportCont.hide();
    })
});