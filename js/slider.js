let adaptLoop = window.innerWidth < 768 ? false : true;
window.addEventListener('resize', function () {
	adaptLoop = window.innerWidth < 768 ? false : true;
});

function size(px) {
	const conversionFactor = 27;
	const index = window.innerWidth * 0.01 + window.innerHeight * 0.01;
	return (px / conversionFactor) * index;
}

const swiperOffer = new Swiper('.swiper.container-fon-mainPage', {
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	speed: 300,
	// simulateTouch: true,
	slidesPerView: 1,
	initialSlide: 0,
	// effect: "fade",
	fadeEffect: {
		crossFade: true,
	},
	autoHeight: true,
	// allowTouchMove: true,
	loop: true,
	// autoplay: {
	//   delay: 4000,
	//   disableOnInteraction: false,
	//   pauseOnMouseEnter: true,
	// },
});

const swiperTitleOffer = new Swiper('.swiper.offer-title', {
	// simulateTouch: adaptLoop,
	slidesPerView: 1,
	initialSlide: 0,
	autoHeight: true,
	loop: true,
});

const swiperSubOffer = new Swiper('.swiper.offer-sub', {
	// simulateTouch: adaptLoop,
	slidesPerView: 1,
	initialSlide: 0,
	autoHeight: true,
	loop: true,
});

swiperTitleOffer.controller.control = swiperOffer;
swiperSubOffer.controller.control = swiperOffer;

swiperOffer.controller.control = [swiperTitleOffer, swiperSubOffer];

const partnerSlider = new Swiper('.swiper.slider-partenrs', {
	navigation: {
		nextEl: '.swiper-partner-next',
		prevEl: '.swiper-partner-prev',
	},
	slidesPerView: 7,
	spaceBetween: size(40),
	loop: true,
	simulateTouch: adaptLoop,
	speed: 600,
	autoHeight: true,
	grabCursor: true,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
});

const sertificatsSlider = new Swiper('.slider-sertificats.swiper', {
	pagination: {
		el: '.swiper-sertificats-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.btn-sertificats-next',
		prevEl: '.btn-sertificats-prev',
	},
	slidesPerView: 4,
	spaceBetween: size(120),
	simulateTouch: adaptLoop,
	loop: true,
	autoHeight: true,
	grabCursor: true,
});
