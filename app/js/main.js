@@include("_config.js");

$(document).ready(function () {
  // wow.js
  new WOW().init();

  // header_slider
  var header_slider = ".header_slider";
  $(header_slider).slick({
    infinite: true,
    dots: true,
    asNavFor: null,
    autoplay: false,
    autoplaySpeed: 2000,
    easing: "ease-in-out",
    speed: 1800,
  });

  // галлерея
  $(".works_galery").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Загрузка изображения #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError:
        '<a href="%url%">The image #%curr%</a> упс... что-то пошло не так.',
      titleSrc: function (item) {
        return item.el.attr("title") + "<small>Наши работы</small>";
      },
    },
  });

  // салайдер из галлереи
  $(".works_galery_slider").slick({
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: true,
    touchMove: true,
    swipe: true,
    touchThreshold: 100,
    swipeToSlide: true,
    nextArrow:
      '<div class="slick-next custom_slick_arrow"><span> </span><span></span></div>',
    prevArrow:
      '<div class="slick-prev custom_slick_arrow"><span> </span><span></span></div>',
    autoplay: 1,
    autoplaySpeed: 2000,
    speed: 800,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 533,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // доставка + Оплата
  $(".shipping_area_tab").click(function (e) {
    var _type = $(this).data("type");
    $(".shipping_area_tab").removeClass("__active_tab");
    $(".shipping_area_tab_content").hide();
    $(".area_" + _type).show();
    $(this).addClass("__active_tab");
    e.preventDefault();
  });

  //  попап картинок
  $(".popup__img").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    mainClass: "mfp-img-mobile",
    image: {
      verticalFit: true,
    },
  });
  // слайдер отзывов
  $(".reviews_slider").slick({
    nextArrow:
      '<div class="slick-next custom_slick_arrow"><span> </span><span></span></div>',
    prevArrow:
      '<div class="slick-prev custom_slick_arrow"><span> </span><span></span></div>',
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    touchMove: true,
    swipe: true,
    touchThreshold: 100,
    swipeToSlide: true,
    // centerMode: true,
    centerPadding: "0px",
    asNavFor: null,
    easing: "ease-in-out",
    speed: 800,
    responsive: [
      {
        breakpoint: 1029,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
        },
      },
    ],
  });

  // burger menu
  $(".burger_menu").on("click", function () {
    $(".burger_menu").toggleClass("__change");
    $("._m_menu").toggleClass("__active");
  });
  $("._m_menu a").click(function (e) {
    var $href = $(this).attr("href");
    $(".burger_menu").toggleClass("__change");
    $("._m_menu").toggleClass("__active");
    window.location = $href;
    e.preventDefault();
  });

  // scroll обработка
  $(window).scroll(function () {
    $(".burger_menu").removeClass("__change");
    $("._m_menu").removeClass("__active");
  });
  // show_form_download
  $(".download_btn").click(function (e) {
    $("._def_title").hide();
    $("._download_title").show();
    $("#poupup_name").hide();
    $(".poupup_btn").text("Скачать");

    e.preventDefault();
  });
  // show_form
  $(".show_form_btn").click(function (e) {
    $(".poupup_wrap").fadeIn();
    $(".overley").fadeIn();
    $("body").addClass("no-scroll");
    e.preventDefault();
  });

  // hide form
  $(".poupup_form_close").click(function (e) {
    $("body").removeClass("no-scroll");
    $(".poupup_wrap").fadeOut();
    $(".poupup_more_wrap").fadeOut();
    $(".quize_poupup_wrap").fadeOut();
    $(".overley").fadeOut();
    function show_def() {
      $(".content_step").hide();
      $(".content_step_1").delay(500).show();
      $(".quize_bg").hide();
      $(".navigation").delay(500).show();
      $("li.step").removeClass("_active_step");
      $(".step_1").delay(500).addClass("_active_step");
      $("._download_title").hide();
      $(".poupup_btn").text("Перезвоните мне");
      $("#poupup_name").show();
      $("._def_title").show();
    }
    setTimeout(show_def, 1000);
    e.preventDefault();
  });
  $("._exit").click(function (e) {
    $(".poupup_form_close").click();
    e.preventDefault();
  });
  $(".overley").click(function (e) {
    $(".poupup_form_close").click();
    e.preventDefault();
  });
  $(document).keyup(function (e) {
    if (e.keyCode === 27) $(".poupup_form_close").click(); // esc
  });

  $(window).on("load", function () {
    var $preloader = $("#p_prldr"),
      $svg_anm = $preloader.find(".svg_anm");
    $svg_anm.fadeOut();
    $preloader.delay(500).fadeOut("slow");
  });
  // мобильное меню товаров
  if ($(window).width() <= 600) {
    $(".aside").addClass("animate__animated  animate__backInDown");
  }
  $(".product__menu").click(function (e) {
    $(this).toggleClass("__change");
    $(".aside").is(":visible")
      ? $(".aside").addClass("animate__backOutUp").delay(500).hide("slow")
      : $(".aside").removeClass("animate__backOutUp").show();
    e.preventDefault();
  });

  // переключенире между товарами
  $(".product__label").click(function (e) {
    var _id = $(this).data("id");
    $(".product__label").removeClass("_clicked");
    $(this).addClass("_clicked");
    $(".products").removeClass("_open");
    $("#" + _id).addClass("_open");
    e.preventDefault();
  });

  //
});
document.addEventListener("DOMContentLoaded", () => {
  // Custom JS
});
