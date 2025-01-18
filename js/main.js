$(function() {

    // $('.slider_block_wr').each(function(){
    //     const slider = $(this).find('.swiper');
    //     const sliderId = slider.data('id');
    //     const sliderClass = '.' + sliderId;
    //     const arrow = slider.data('arrow');    

    //     const newProductsSwiper = new Swiper(sliderClass, {
    //      loop: true,
    //      slidesPerView: 1,
    //      loopedSlides: 1,
    //      navigation: {
    //          nextEl: '.next.swiper-' + arrow + '-btn',
    //          prevEl: '.prev.swiper-' + arrow + '-btn',
    //      },
    //      effect: "fade",
    //      lazy: true
    //     });
    // })

    var $body = $(document.body),
        $html = $(document.documentElement);

    function formPopup($btn, $wrap) {

        var closeForm = $('.formExtraWrapper .close-form'),
            formWrap = $($wrap),
            formBtn = $($btn),
            formOpened = 'opened',
            overflowHidden = 'oveflowHidden';

        closeForm.on('click', function() {
            formWrap.removeClass(formOpened);
            $html.removeClass(overflowHidden);
        });
        formBtn.on('click', function(event) {
            formWrap.addClass(formOpened);
            $html.toggleClass(overflowHidden);
            event.preventDefault();
        });

        $html.on('keyup', function(event) {
            if (formWrap.hasClass(formOpened) && event.keyCode == 27) {
                formWrap.removeClass(formOpened);
                $html.removeClass(overflowHidden);
            }
        });
        $body.on('click touchstart', function(a) {
            if ($(a.target).closest('.formExtraWrapper').length || $(a.target).closest(formBtn).length) return;
            if (formWrap.hasClass(formOpened)) {
                formWrap.removeClass(formOpened);
                $html.removeClass(overflowHidden);
            }
        });
    }

    formPopup('.form_btn', '.form_popup');



    var menuBtn = $('.burger'),
        menuWrapper = $('.menu_burger'),
        menuClose = $('.menuClose'),
        openedMenu = 'opened',
        overflowHidden = 'oveflowHidden';

    menuBtn.on("click", function(event) {
        menuWrapper.toggleClass(openedMenu);
        menuBtn.toggleClass(openedMenu);
        $html.toggleClass(overflowHidden);
        $html.toggleClass('open_menu');
    });
    menuClose.on("click", function(event) {
        menuWrapper.removeClass(openedMenu);
        menuBtn.removeClass(openedMenu);
        $html.removeClass(overflowHidden);
        $html.removeClass('open_menu');
    });

    $(document).on('click touchstart', function(e) {
        if ($(e.target).closest(menuBtn).length || $(e.target).closest(menuWrapper).length)
            return;
        if (menuBtn.hasClass(openedMenu)) {
            menuWrapper.removeClass(openedMenu);
            menuBtn.removeClass(openedMenu);
            $html.removeClass(overflowHidden);
            $html.removeClass('open_menu');
        }
    });

    const menu = ['ПЛАНИРОВКА', 'ГОСТИННАЯ', 'СПАЛЬНЯ', 'КУХНЯ', 'САНУЗЕЛ', 'ГОСТЕВАЯ'];

    const selectBlockSlider = document.querySelector('.select_block_slider');

    if (selectBlockSlider) {
        const nameSelect = document.querySelector('.name_select');

        const mySwiperPagination = new Swiper('.mySwiper_ext', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function(index, className) {
                    return '<span class="' + className + '">' + menu[index] + '</span>';
                },
            },
            on: {
                init: function() {
                    // Устанавливаем текст активного буллита при инициализации слайдера
                    nameSelect.textContent = menu[0];
                },
                slideChange: function() {
                    // Обновляем текст в `.name_select` при смене слайда
                    nameSelect.textContent = menu[this.activeIndex];
                    // Удаляем класс opened при смене слайда
                    selectBlockSlider.classList.remove('opened');
                },
            },
        });

        // Обработчик клика на name_select
        nameSelect.addEventListener('click', () => {
            selectBlockSlider.classList.add('opened');
        });

        // Обработчик клика на буллиты
        selectBlockSlider.addEventListener('click', (event) => {
            if (event.target.closest('.swiper-pagination span')) {
                selectBlockSlider.classList.remove('opened');
            }
        });
    }

    const video = document.getElementById("custom-video");
    if (video) {
        const playPauseBtn = document.getElementById("play-pause-btn");
        const overVideo = document.querySelector('.video-overlay');

        playPauseBtn.addEventListener("click", function() {
            if (video.paused) {
                video.play();
                overVideo.classList.add("paused"); // Меняем кнопку на "Pause"
            } else {
                video.pause();
                overVideo.classList.remove("paused"); // Меняем кнопку на "Play"
            }
        });
    }

    $('.mySwiper_images_block').each(function() {
        const slider = $(this).find('.swiper');
        const sliderId = slider.data('id');
        const sliderClass = '.' + sliderId;

        const newProductsSwiper = new Swiper(sliderClass, {
            slidesPerView: "auto",
            spaceBetween: 29,
            lazy: true,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });

        lightGallery(document.querySelector(sliderClass), {
            animateThumb: false,
            zoomFromOrigin: false,
            allowMediaOverlap: true,
            toggleThumb: false,
            selector: 'a'
        });

    })


    $('.column').on('mouseenter', function() {
        $(this).removeClass('narrow').addClass('hovered');
        $(this).siblings().removeClass('hovered').addClass('narrow');
    });
    $('.column').on('mouseleave', function() {
        $(this).removeClass('narrow').removeClass('hovered');
        $(this).siblings().removeClass('hovered').removeClass('narrow');
    });

    var tmenu = $('.header_top'),
        tmenuOffset = tmenu.offset();
    $(window).scroll(function() {
        if (($(window).scrollTop() > tmenuOffset.top)) {
            if (($(window).scrollTop() > tmenuOffset.top)) {
                tmenu.addClass('fixed');
            };
        } else {
            tmenu.removeClass('fixed');
        };
    });
});


document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    // Получаем все элементы для анимации
    const elements = gsap.utils.toArray('.text-main-anim');

    // Создаем timeline для последовательной анимации
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: elements[0], // Первый элемент как триггер
            start: "top 80%", // Начинаем когда верх элемента достигает 80% высоты viewport
            end: "+=300", // Заканчиваем через 300px прокрутки
            toggleActions: "play none none reverse"
        }
    });

    // Добавляем каждый элемент в timeline с задержкой
    elements.forEach((element, index) => {
        tl.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power1.inOut"
        }, index * 0.3); // Задержка между элементами
    });
});