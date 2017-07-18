$(document).ready(function() {


    //Навигация по страничкам сайта
    $('body').append(
        '<div style="position: fixed; z-index: 9999; bottom: 0; right: 0; background: #fff; border: solid 1px #000; width: 250px;"> \
            <a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px;position:relative;z-index:20;" onclick="$(this).parent().hide()">Закрыть X</a> \
        <ol> \
            <li><a href="./text.html" style="color:#000;">Текстовая</a></li> \
            <li><a href="./index.html" style="color:#000;">Главная</a></li> \
        </ol> \
    </div>');

    //Svg polyfill
    (function() {
        svg4everybody({
            polyfill: true
        });
    }());

    //Слайдер на главной
    (function() {
        if ($('.main-slider__slides').length > 0) {
            $('.main-slider__slides').slick({
                dots: true,
                arrows: false,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 1,
                slidesToScroll: 1

            });
        };
    }());

    (function() {

    }());


    //Запрещаем ввод букв в поле конвертации валюты
    (function() {
        //Разрешаем вводить только цифрыi
        $('.exchange__input').keydown(function(event) {
            // Разрешаем: backspace, delete, tab и escape
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
                event.keyCode == 173 || event.keyCode == 32 || event.keyCode == 107 ||
                // Разрешаем: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // Разрешаем: Ctrl+V
                (event.keyCode == 86 && event.ctrlKey === true) ||
                // Разрешаем: Shift + plus
                (event.keyCode == 61 && event.shiftKey === true) ||
                // Разрешаем: Shift + (
                (event.keyCode == 57 && event.shiftKey === true) ||
                // Разрешаем: Shift + )
                (event.keyCode == 48 && event.shiftKey === true) ||
                // Разрешаем: home, end, влево, вправо
                (event.keyCode >= 35 && event.keyCode <= 39)) {

                return;
            } else {
                // Убеждаемся, что это цифра, и останавливаем событие keypress
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        });

    }());

    (function() {
       
    }());

    //Слайдер на главной (сервисы)
    (function() {
        if ($('.services__slides').length > 0) {
            $('.services__slides').slick({
                dots: false,
                arrows: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1
                    }
                }]
            });

            $('.services__control--prev').click(function() {
                $('.services__slides').slick('slickPrev');
            });

            $('.services__control--next').click(function() {
                $('.services__slides').slick('slickNext');
            });

            $('.services__slide-content').matchHeight({
                byRow: true,
                property: 'min-height',
                target: null,
                remove: false
            })
        };
    }());

    //Стилизация селектов
    (function() {
        if ($('.page-select').length > 0) {
            setTimeout(function() {
                $('.page-select').styler();
                $('.jq-selectbox__dropdown ul').mCustomScrollbar({
                    axis: "y"
                });
            }, 100);
        };

        if ($('.exchange__select').length > 0) {
            setTimeout(function() {
                $('.exchange__select').styler();
                $('.jq-selectbox__dropdown ul').mCustomScrollbar({
                    axis: "y"
                });
            }, 100);
        };

        //Конвертация валют табы
        $('.conversation__controls-link').on('click', function(e) {
            e.preventDefault();

            var item = $(this).closest('.conversation__controls-item'),
                contentItem = $('.conversation__item'),
                itemPosition = item.index();

            contentItem.eq(itemPosition)
                .add(item)
                .addClass('active')
                .siblings()
                .removeClass('active');
        });

        $('.conversation .page-select').on('change', function() {
            var selestedItem = $(this).find(':selected'),
                contentItem = $('.conversation__item'),
                itemPosition = selestedItem.index();

            contentItem.eq(itemPosition)
                .add(selestedItem)
                .addClass('active')
                .siblings()
                .removeClass('active');

        });
    }());


    //Пример вызова попапа
    (function() {
        var $popup = $('.popup'),
            $overlay = $('.overlay');

        $('.btn--popup').on('click', function(e) {
            e.preventDefault();
            $popup.addClass('show');
            $overlay.addClass('show');
        })

        $('.popup__close, .overlay').on('click', function(e) {
            e.preventDefault();
            $popup.removeClass('show');
            setTimeout(function() {
                $overlay.removeClass('show');
            }, 500);

        });
    }());


    //Поиск
    (function() {
        var $submitIcon = $('.search__icon'),
            $inputBox = $('.search__input'),
            $searchBox = $('.search'),
            $submit = $('.search__submit'),
            $lastLi = $('.page-nav__item:last'),
            $lastLiWidth = $lastLi.width();

        var $isOpen = false,
            $null = 0;


        $submitIcon.on('click', function() {
            if ($isOpen == false) {
                $searchBox.addClass('open');
                $('.search__wrap').width($lastLiWidth);
                $submit.removeClass('hide');
                $submit.addClass('open');
                $submitIcon.removeClass('open');
                $submitIcon.addClass('hide');
                $inputBox.focus();
                $isOpen = true;
            } else {
                $searchBox.removeClass('open');
                $submit.removeClass('hide');
                $submitIcon.addClass('open');
                $inputBox.focusout();
                $isOpen = false;
            }
        });


        $(document).on('click', function(e) {
            if (!$(e.target).closest(".search").length) {
                $searchBox.removeClass('open');
                $('.search__wrap').width($null);
                $submit.removeClass('open');
                $submit.addClass('hide');
                $submitIcon.removeClass('hide');
                $submitIcon.addClass('open');
                $inputBox.focusout();
                $isOpen = false;
            }
            e.stopPropagation();
        });


    }());

    //Мобильное меню
    (function() {
        var $mobileMenu = $('.mobile-nav'),
            $wrapper = $('.page-wrapper'),
            $trigger = $('.finance-trigger'),
            $financeNav = $('.finance-menu');

        $('.burger-menu').on('click', function() {
            if (!$mobileMenu.hasClass('open')) {
                $mobileMenu.removeClass('close');
                $mobileMenu.addClass('open');
                $trigger.css('display', 'none');
                $wrapper.add($financeNav).removeClass('is-visible');

            } else {
                $mobileMenu.removeClass('open');
                $trigger.css('display', 'block');
            }
        });

        $('.mobile-nav__close').on('click', function() {

            $mobileMenu.addClass('close');

            setTimeout(function() {
                $mobileMenu.removeClass('open');
                $trigger.css('display', 'block');
            }, 500);



        });

    }());

});

// Липкое меню
(function() {
    $(window).on('load resize', function() {
        var $windowWidth = $(window).width(),
            $headerHeight = $('.page-header').height(),
            $wrapper = $('.page-wrapper'),
            $financeNav = $('.finance-menu');

        function stickyNav() {
            $(window).on('scroll', function() {
                if ($(this).scrollTop() >= $headerHeight - 58) {
                    $('.finance-menu').addClass('fixed');
                } else {
                    $('.finance-menu').removeClass('fixed');
                };
            });
        };

        stickyNav();

        function showNav() {
            if ($windowWidth < 1300) {
                $(window).off('scroll');

                $('.finance-trigger').on('click', function() {
                    $wrapper.add($financeNav).toggleClass('is-visible');
                });

                $('.finance-trigger').css({
                    top: $headerHeight
                });
            };
        };

        showNav()
    });


}());
