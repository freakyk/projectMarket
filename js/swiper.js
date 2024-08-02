// prdList banner
const prd_swiper = new Swiper('.prd_swiper', {
    loop: true,
    pagination: {
      el: '.prd_pag',
    },
    navigation: {
      nextEl: '.prd_btn_next',
      prevEl: '.prd_btn_prev',
    },
    autoplay: {
        delay: 2500,
    },
    speed : 1000,
});