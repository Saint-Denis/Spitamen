$(document).ready(function() {


    //Навигация по страничкам сайта
    $('body').append(
        '<div style="position: fixed; z-index: 9999; bottom: 0; right: 0; background: #fff; border: solid 1px #000; width: 250px;"> \
            <a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px;position:relative;z-index:20;" onclick="$(this).parent().hide()">Закрыть X</a> \
        <ol> \
            <li><a href="./text.html" style="color:#000;">Текстовая</a></li> \
            <li><a href="./index.html" style="color:#000;">Главная</a></li> \
            <li><a href="./contacts.html" style="color:#000;">Контакты</a></li> \
            <li><a href="./management.html" style="color:#000;">Правление</a></li> \
            <li><a href="./reports.html" style="color:#000;">Отчеты</a></li> \
            <li><a href="./news.html" style="color:#000;">Новости</a></li> \
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


    //Карта на странице контактов
    (function() {
        if ($('.map__area').length > 0) {

            //Координаты 2 точек (филиалов)
            var locations = [
                ["filial-1", 38.577563, 68.748248],
                ["filial-2", 38.568085, 68.754414]
            ];

            //Настройки карты
            var map_options = {
                center: new google.maps.LatLng(0, 0),
                zoom: 10,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                pane: "mapPane",
                scrollwheel: false

            }

            //Инит карты
            var map = new google.maps.Map(document.querySelector('.map__area'), map_options);

            //Иконка маркеров
            var icon = {
                url: './assets/img/svg/pointer.svg',
                size: new google.maps.Size(25, 35),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 32)
            };

            //Создаем обьект LatLngBounds()
            var latlngbounds = new google.maps.LatLngBounds(),
                marker,
                i;


            //Добавление маркеров по адресам
            for (i = 0; i < locations.length; i++) {
                var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);

                //Добавляем координаты маркера в область
                latlngbounds.extend(myLatLng);

                marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    visible: true,
                    animation: google.maps.Animation.DROP,
                    icon: icon
                });

                //Центрируем маркеры
                map.setCenter(latlngbounds.getCenter(), map.fitBounds(latlngbounds));

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infoWindow.setContent(infoWindowContent[i][0]);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));

            };


            //Добавление иконок зума и уменьшения
            function CustomZoomControl(controlDiv, map) {
                var controlZoomIn = document.querySelector('.map__icon--plus'),
                    controlZoomOut = document.querySelector('.map__icon--minus');


                controlDiv.append(controlZoomIn);
                controlDiv.append(controlZoomOut);

                google.maps.event.addDomListener(controlZoomIn, 'click', function() {
                    map.setZoom(map.getZoom() + 1);
                });


                google.maps.event.addDomListener(controlZoomOut, 'click', function() {
                    map.setZoom(map.getZoom() - 1);
                });

            }

            var zoomControlDiv = document.createElement('div');
            zoomControlDiv.className = "zoom-wrapper";
            var zoomControl = new CustomZoomControl(zoomControlDiv, map);
            map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);




            //Рисуем разметку лейбла
            var infoWindowContent = [
                [
                    '<div class="contact-label">' +

                    '<div class="contact-label__container">' +
                    '<div class="contact-label__title">Отделение "Спитамен Банк" в Тезгар</div>' +
                    '<div class="contact-label__field">' +
                    '<div class="contact-label__what">Адрес</div>' +
                    '<div class="contact-label__desc">г. Душанбе, ул. Шамси</div>' +
                    '</div>' +
                    '<div class="contact-label__field">' +
                    '<div class="contact-label__what">Телефоны</div>' +
                    '<div class="contact-label__desc">' +
                    '<a href="tel:4(+99244)640-65-65">4 (+ 992 44) 640-65-65</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="contact-label__field">' +
                    '<div class="contact-label__what">Время работы</div>' +
                    '<div class="contact-label__schedule">' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '</div>' +
                    '<div class="contact-label__desc">' +
                    '<span>09:00–20:00 пн–пт</span>' +
                    '<span>10:00–18:00 сб</span>' +
                    '<span>Выходной вс</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                ],
                [
                    '<div class="contact-label">' +
                    '<div class="contact-label__container">' +
                    '<div class="contact-label__title">Отделение "Спитамен Банк" в Тезгар</div>' +
                    '<div class="contact-label__field">' +
                    '<div class="contact-label__what">Адрес</div>' +
                    '<div class="contact-label__desc">г. Душанбе, ул. Шерализода</div>' +
                    '</div>' +
                    '<div class="contact-label__field">' +
                    '<div class="contact-label__what">Телефоны</div>' +
                    '<div class="contact-label__desc">' +
                    '<a href="tel:4(+99244)640-65-65">4 (+ 992 44) 640-65-65</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="contact-label__field">' +
                    '<div class="contact-label__what">Время работы</div>' +
                    '<div class="contact-label__schedule">' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item in-work"></div>' +
                    '<div class="contact-label__schedule-item"></div>' +
                    '<div class="contact-label__schedule-item"></div>' +
                    '</div>' +
                    '<div class="contact-label__desc">' +
                    '<span>09:00–20:00 пн–пт</span>' +
                    '<span>10:00–18:00 сб</span>' +
                    '<span>Выходной вс</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                ]
            ];

            //Создаем настройки для лейбла (плагин InfoBox)
            var options = {
                content: infoWindowContent,
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(50, -200),
                zIndex: null,
                closeBoxMargin: "12px 12px 2px 2px",
                closeBoxURL: "./assets/img/svg/map-cancel.svg",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            };

            var infoWindow = new InfoBox(options);

            //Центровка карты по центру при ресайзе
            google.maps.event.addDomListener(window, 'resize', function() {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);

                if ($(window).width() < 767) {
                    infoWindow.setOptions({ pixelOffset: new google.maps.Size(center) });
                } else {
                    infoWindow.setOptions({ pixelOffset: new google.maps.Size(50, -200) });
                }

            });

            //Центровка карты по центру при загрузке
            google.maps.event.addDomListener(window, 'load', function() {
                var center = map.getCenter();
                google.maps.event.trigger(map, "load");
                map.setCenter(center);

                if ($(window).width() < 767) {
                    infoWindow.setOptions({ pixelOffset: new google.maps.Size(center) });
                } else {
                    infoWindow.setOptions({ pixelOffset: new google.maps.Size(50, -200) });
                }

            });


            //Скрыть и показаь карту
            $('.hide-link').on('click', function(e) {
                e.preventDefault();

                var $map = $('.map'),
                    $mapArea = $('.map__area'),
                    $hideLink = $(this);

                if (!$map.hasClass('is-hided')) {
                    $mapArea.slideUp({
                        complete: function() {
                            setTimeout(function() {
                                $map.removeClass('is-opened').addClass('is-hided');
                            }, 100);
                            $hideLink.text('Показать карту');
                        }
                    });

                } else {
                    $mapArea.slideDown({
                        complete: function() {
                            setTimeout(function() {
                                $map.removeClass('is-hided').addClass('is-opened');
                            }, 100);
                            $hideLink.text('Скрыть карту');
                        }
                    });

                }
            });

        };
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
