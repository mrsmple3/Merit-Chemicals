(function ($) {
	$(function () {
		gsap.registerPlugin(
			ScrollTrigger,
			ScrollSmoother,
			TextPlugin,
			Flip,
			Observer
		);

		function size(px) {
			const conversionFactor = 23;
			const index = window.innerWidth * 0.01 + window.innerHeight * 0.01;
			return (px / conversionFactor) * index;
		}

		if (ScrollTrigger.isTouch !== 1) {
			ScrollSmoother.create({
				wrapper: '.wrapper',
				content: '.content',
				smooth: 1.2,
				effects: true,
			});
		}

		//!Header
		//Sticky
		const $header = $('.header');
		const $headerSticky = $('.header_sticky');
		const $headerTop = $('header .top');
		const $headerTopHeight = $('header .top').outerHeight();
		console.log($headerTop.outerHeight());
		const headerOffsetTop = $headerSticky.offset().top;

		function handleScroll($top) {
			const scrollTop = $(window).scrollTop();
			if (scrollTop >= headerOffsetTop) {
				$header.css('top', `-${$headerTopHeight}px`);
				$header.css('top', $top);
			} else {
				$header.css('top', '0');
			}
		}

		if (ScrollTrigger.isTouch !== 1) {
			$(window).on('scroll', handleScroll);

			Observer.create({
				target: window,
				type: 'wheel,touch,scroll,pointer',
				onUp: () => {
					handleScroll('0');
				},
				onDown: () => {
					handleScroll(`-${$headerTopHeight}px`);
				},
			});
		}

		//navbar hover
		const $submenuLink = $('.navbar-link.submenu-link');
		const $submenu = $('.submenu');
		const $heightSubmenu = $submenu.outerHeight() + size(48);

		deactiveSubmenu($submenu);

		function activeSubmenu($element, $height = null) {
			if ($height !== null) {
				$element.css('height', $height);
			}
			$element.addClass('active');
		}

		function deactiveSubmenu($element) {
			$element.css('height', '0px');
			$element.removeClass('active');
		}

		let submenuTimeout;
		let submenuCategoryTimeout;

		function startTimeout($submenu, $link) {
			submenuTimeout = setTimeout(() => {
				deactiveSubmenu($submenu);
				$link.removeClass('active');
			}, 800);
		}

		function startTimeout2($submenuCategory, $link) {
			submenuCategoryTimeout = setTimeout(() => {
				$submenuCategory.removeClass('active');
				$link.removeClass('active');
			}, 800);
		}

		$submenuLink.hover(
			function () {
				clearTimeout(submenuTimeout);
				$(this).addClass('active');
				activeSubmenu($submenu, $heightSubmenu);
			},
			function () {
				startTimeout($submenu, $(this));
			}
		);

		$('.submenu').hover(
			function () {
				clearTimeout(submenuTimeout);
			},
			function () {
				startTimeout($submenu, $submenuLink);
			}
		);

		// Categories
		$('.container-navbar-submenu-title').hover(
			function () {
				var category = $(this).data('category');

				$('.container-navbar-submenu-title').removeClass('active');
				$('.submenu-categories').removeClass('active');

				$(this).addClass('active');

				$('.submenu-categories').each(function () {
					if ($(this).data('category') === category) {
						// if ($(this).hasClass('active')) {
						clearInterval(submenuCategoryTimeout);
						// }
						$(this).addClass('active');
					}
				});
			},
			function () {
				const link = $(this);
				const category = $(this).data('category');

				$('.submenu-categories').each(function () {
					if ($(this).data('category') === category) {
						startTimeout2($(this), link);
					}
				});
			}
		);

		$('.submenu-categories').hover(
			function () {
				var category = $(this).data('category');

				$('.container-navbar-submenu-title').each(function () {
					if ($(this).data('category') === category) {
						clearTimeout(submenuCategoryTimeout);
						clearTimeout(submenuTimeout);
					}
				});
			},
			function () {
				const submenu = $(this);
				var category = $(this).data('category');

				$('.container-navbar-submenu-title').each(function () {
					if ($(this).data('category') === category) {
						startTimeout2(submenu, $(this));
					}
				});

				startTimeout($submenu, $submenuLink);
			}
		);

		//!Search
		const container_big_search = $('.form-big-search');
		const state = Flip.getState(container_big_search);

		// При фокусировке на input внутри form-search
		$('.form-search .search').focus(function () {
			$(this).closest('.form-search').addClass('noactive');
			container_big_search.addClass('active');
			container_big_search.find('input.search').focus();
		});

		$('.form-search .icon-search').click(function () {
			$(this).closest('.form-search').addClass('noactive');
			container_big_search.addClass('active');
			container_big_search.find('input.search').focus();
		});

		function noactivateSearch(container_big_search) {
			$('.form-search').removeClass('noactive');
			container_big_search.removeClass('active');
		}

		// При потере фокуса
		$('.icon-search-close').click(function () {
			noactivateSearch(container_big_search);
		});

		container_big_search.find('.search').blur(function () {
			noactivateSearch(container_big_search);
		});

		//!Scroll
		const tl = gsap.timeline({
			defaults: { duration: 0.5, ease: 'easeInQuad' },
			scrollTrigger: {
				trigger: '.content-benefit',
				start: 'top center',
				end: 'top 20%',
				scrub: true,
			},
		});

		tl.fromTo('.n-1', { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0 })
			.fromTo('.n-2', { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0 })
			.fromTo('.n-3', { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0 })
			.fromTo(
				'.n-4',
				{ opacity: 0, yPercent: 50 },
				{ opacity: 1, yPercent: 0 }
			);

		const contentHeight = $('.content').outerHeight();
		const windowHeight = $(window).height();
		const headerHeight = $('header').outerHeight();
		const swiperHeight = $('.swiper.container-fon-mainPage').outerHeight();
		const mainPageHeight = swiperHeight - headerHeight;
		const aboutHeight = $('.replacer-about').outerHeight();
		const topAbout = windowHeight + aboutHeight;
		const partnersHeight = $('.container-partner').outerHeight();
		const galaryHeight = $('.container-pics').outerHeight();

		gsap.to('.linear-header', {
			background: '#010d2a',
			scrollTrigger: {
				trigger: '.linear-header',
				duration: 0.3,
				start: 'center top',
				end: 'bottom top',
				scrub: true,
			},
		});

		gsap.to('.container-about', {
			// position: 'relative',
			visibility: 'visible',
			scrollTrigger: {
				trigger: '.container-about',
				pin: true,
				start: 'bottom center',
				end: topAbout,
				scrub: 1,
			},
		});

		gsap.fromTo(
			'.logo-about',
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 0.5,
				scrollTrigger: {
					trigger: '.container-offer-product',
					start: 'bottom center',
					scrub: true,
				},
			}
		);

		gsap.to('.container-benefit', {
			position: 'relative',
			scrollTrigger: {
				trigger: '.container-benefit',
				pin: true,
				start: 'top top',
				end: 'bottom top',
				scrub: true,
			},
		});

		gsap.to('.main-container-benefit', {
			background:
				'linear-gradient(180deg, rgba(1, 13, 42, 0.70) 0%, rgba(1, 13, 42, 0.70) 100%)',
			scrollTrigger: {
				trigger: '.container-benefit',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
			},
		});

		gsap.to('.container-logistic', {
			position: 'relative',
			scrollTrigger: {
				trigger: '.container-logistic',
				pin: true,
				start: 'top top',
				scrub: true,
			},
		});

		gsap.to('.main-container-logistic', {
			background:
				'linear-gradient(0deg,rgba(1, 13, 42, 0.4) 0%,rgba(1, 13, 42, 0.4) 100%)',
			scrollTrigger: {
				trigger: '.container-logistic',
				start: 'top top',
				scrub: true,
			},
		});

		//!Main-slider
		// function changeVideoSource(newSource) {
		// 	var video = $('#mainVideo');
		// 	var source = video.find('source');

		// 	source.attr('src', newSource);
		// 	video[0].load(); // Перезагрузить видео с новым источником
		// }

		// // Пример использования функции для изменения видео
		// changeVideoSource('/img/fon-mainSlider-1.mp4');

		//! Функция для установки класса active на соответствующий .icon-marker
		// const tlMap = gsap.timeline({
		// 	defaults: { duration: 0.5, ease: 'easeInQuad' },
		// 	scrollTrigger: {
		// 		trigger: '.interactive-map',
		// 		markers: true,
		// 		start: 'top top',
		// 		end: 'top 20%',
		// 		scrub: true,
		// 	},
		// });

		// tlMap
		// 	.fromTo(
		// 		'.part.ru',
		// 		{
		// 			opacity: 0,
		// 		},
		// 		{ opacity: 1 }
		// 	)
		// 	.fromTo(
		// 		'.part.uz',
		// 		{
		// 			opacity: 0,
		// 		},
		// 		{ opacity: 1 }
		// 	)
		// 	.fromTo(
		// 		'.part.kz',
		// 		{
		// 			opacity: 0,
		// 		},
		// 		{ opacity: 1 }
		// 	)
		// 	.fromTo(
		// 		'.part.tad',
		// 		{
		// 			opacity: 0,
		// 		},
		// 		{ opacity: 1 }
		// 	)
		// 	.fromTo(
		// 		'.part.ar',
		// 		{
		// 			opacity: 0,
		// 		},
		// 		{ opacity: 1 }
		// 	);

		function setActiveClass(element) {
			if ($('.icon-marker .content-marker').hasClass('active')) {
				return; // Если да, выходим из функции
			}
			var $el = $(element);
			var iconClass = '';

			if ($el.hasClass('ru')) {
				iconClass = 'ru';
			} else if ($el.hasClass('uz')) {
				iconClass = 'uz';
			} else if ($el.hasClass('ar')) {
				iconClass = 'ar';
			} else if ($el.hasClass('kz')) {
				iconClass = 'kz';
			} else if ($el.hasClass('tad')) {
				iconClass = 'tad';
			}

			// Удаляем класс active у всех иконок
			// $(".icon-marker").removeClass("active");
			stopAllActiveClasses($('.icon-marker, .content-marker, .part'));

			// Добавляем класс active к соответствующей иконке
			$('.icon-marker.' + iconClass).addClass('active');
			$('.part.' + iconClass).addClass('active');
		}

		// Hover-эффект для .part и .icon-marker
		$('.part, .icon-marker').hover(
			function () {
				setActiveClass(this);
			},
			function () {}
		);

		$('.part, .icon-marker').click(function (e) {
			if (
				$('.icon-marker .content-marker').hasClass('active') &&
				!$(e.target).closest('.part.active, .icon-marker.active').length
			) {
				stopAllActiveClasses($('.icon-marker, .content-marker, .part'));
				return; // Если да, выходим из функции
			}
			e.stopPropagation(); // Останавливаем всплытие события клика
			var $el = $(this);
			var iconClass = '';

			if ($el.hasClass('ru')) {
				iconClass = 'ru';
			} else if ($el.hasClass('uz')) {
				iconClass = 'uz';
			} else if ($el.hasClass('ar')) {
				iconClass = 'ar';
			} else if ($el.hasClass('kz')) {
				iconClass = 'kz';
			} else if ($el.hasClass('tad')) {
				iconClass = 'tad';
			}

			$el.addClass('active');
			$('.part.' + iconClass).addClass('active');

			const $iconMarker = $('.icon-marker.' + iconClass);
			$iconMarker.addClass('active');

			const $contentMarker = $iconMarker.find('.content-marker');
			if ($contentMarker.length) {
				$contentMarker.addClass('active');
			}
		});

		// Убираем класс active при клике вне элементов .part и .icon-marker
		$(document).click(function () {
			stopAllActiveClasses($('.icon-marker, .content-marker, .part'));
		});

		// Останавливаем всплытие клика на .icon-marker, чтобы не убирать класс active
		function stopAllActiveClasses(elements) {
			elements.each(function () {
				$(this).removeClass('active');
			});
		}
		function startAllActiveClasses(elements) {
			elements.each(function () {
				$(this).addClass('active');
			});
		}

		//!
		const title_container = $('.news-title');
		const title_img = $('.img-news');
		const title_container_else = $('.news-title-else');

		const title_container_activeHeight =
			title_container.outerHeight() + size(32);

		const title_container_noactiveHeight =
			title_container_activeHeight -
			title_container_else.outerHeight() -
			size(26) -
			size(32);

		//Defaults
		title_container.css('height', title_container_noactiveHeight + 'px');

		title_container.each(function (index) {
			$(this).hover(
				function () {
					title_container_else.removeClass('active');
					title_container.css('height', title_container_noactiveHeight + 'px');
					title_container.removeClass('active');
					title_img.removeClass('active');

					$(this).css('height', title_container_activeHeight + 'px');
					$(this).addClass('active');
					$(this).find('.news-title-else').addClass('active');
					$(`.img-news.img-${index + 1}`).addClass('active');
				},
				function () {}
			);
		});
	});

	// Run right away
})(jQuery);

const input = document.querySelector('#input-phone');

// initialise plugin
const iti = window.intlTelInput(input, {
	initialCountry: 'auto',
	strictMode: true,
	geoIpLookup: function (success, failure) {
		$.get('https://ipinfo.io', function () {}, 'jsonp').always(function (resp) {
			var countryCode = resp && resp.country ? resp.country : '';
			success(countryCode);
		});
	},
	separateDialCode: true,
	containerClass: 'i-phone',
	preferredCountries: ['uz', 'kz', 'ru', 'us', 'tr'],
	utilsScript:
		'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js',
});

//!
function format_number(x) {
	return x.toString();
}

const elements = document.querySelectorAll('.numerical');

elements.forEach(function (counter) {
	var value = { val: parseInt(counter.innerText) };

	// Function to start the animation
	function startAnimation() {
		gsap.from(value, {
			duration: 3,
			ease: 'circ.out',
			val: 0,
			roundProps: 'val',
			onUpdate: function () {
				counter.innerText = format_number(value.val);
			},
		});
	}

	// Create an Intersection Observer instance
	var observer = new IntersectionObserver(
		function (entries) {
			if (entries[0].isIntersecting) {
				startAnimation();
				observer.disconnect(); // Stop observing after the animation starts
			}
		},
		{ threshold: 0.5 } // Adjust this value to determine when the animation should start
	);

	// Start observing the counter element
	observer.observe(counter);
});
