// mobile
window.gullUtils = {
    isMobile: function isMobile() {
        return window && window.matchMedia("(max-width: 767px)").matches;
    },
    changeCssLink: function changeCssLink(storageKey, fileUrl) {
        localStorage.setItem(storageKey, fileUrl);
        location.reload();
    }
};

// Perfect scrollbar
$(document).ready(function () {
    $(".perfect-scrollbar, [data-perfect-scrollbar]").each(function (index) {
        var $el = $(this);
        var ps = new PerfectScrollbar(this, {
            suppressScrollX: $el.data("suppress-scroll-x"),
            suppressScrollY: $el.data("suppress-scroll-y")
        });
    });
});


// calendar date
$(function () {
    //Сменим язык календаря на русский
    $.datepicker.setDefaults(
        {
            closeText: 'Закрыть',
            prevText: '',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        });
    //Добавим код календаря
    var dateFormat = "mm/dd/yy",
        from = $(".datepicker1")
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
        to = $(".datepicker2").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1
        })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }
});

// timer
function makeTimer() {

    var endTime = new Date("11 February 2021 00:00:00 GMT+01:00");
    endTime = (Date.parse(endTime) / 1000);

    var now = new Date();
    now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") {
        hours = "0" + hours;
    }
    if (minutes < "10") {
        minutes = "0" + minutes;
    }
    if (seconds < "10") {
        seconds = "0" + seconds;
    }

    $(".days").html(days);
    $(".hours").html(hours);
    $(".minutes").html(minutes);
    $(".seconds").html(seconds);

}

setInterval(function () {
    makeTimer();
}, 1000);

// datetimepicker
$.datetimepicker.setLocale('ru');

$('.datetimepicker').datetimepicker({
    i18n: {
        de: {
            months: [
                'Январь', 'Февраль', 'Март', 'Апрель',
                'Май', 'Июнь', 'Июль', 'Август',
                'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
            ],
            dayOfWeek: [
                "Пн", "Вт", "Ср", "Чт",
                "Пт", "Сб", "Вс",
            ]
        }
    },
    timepicker: true
});

$('.dropDown-item').click(function () {
    $(this).toggleClass('open').siblings('.dropDown').fadeToggle();
});

$('.links-dropDown').hover(function () {
    $(this).toggleClass('active').find('.dropDown-subMenu').fadeToggle();
});

// модальные окна (несколько)
$(document).ready(function () {
    var overlay = $('.overlay');
    var open_modal = $('.open_modal');
    var close = $('.modal__close, .overlay');
    var modal = $('.modal__div');

    open_modal.click(function (event) {
        event.preventDefault();
        var div = $(this).attr('href');
        overlay.fadeIn(400,
            function () {
                $(div)
                    .css('display', 'flex')
                    .animate({
                        opacity: 1,
                        top: '50%'
                    }, 200);
            });
    });

    close.click(function () {
        modal
            .animate({
                    opacity: 0,
                    top: '45%'
                }, 200,
                function () {
                    $(this).css('display', 'none');
                    overlay.fadeOut(400);
                }
            );
    });
});
//end

// tab
$('ul.tabs__caption').on('click', 'li:not(.active)', function () {
    $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
});

// input file
$(document).ready(function () {
    let fields = document.querySelectorAll('.field__file');
    Array.prototype.forEach.call(fields, function (input) {
        let label = input.nextElementSibling,
            labelVal = label.querySelector('.field__file-fake').innerText;

        input.addEventListener('change', function (e) {
            let countFiles = '';
            if (this.files && this.files.length >= 1)
                countFiles = this.files.length;

            if (countFiles)
                label.querySelector('.field__file-fake').innerText = 'Выбрано файлов: ' + countFiles;
            else
                label.querySelector('.field__file-fake').innerText = labelVal;
        });
    });
});

// clone block
// $('.add-contract').on('click', function(e) {
//     e.preventDefault();
//     $('.contract-wrapper:first').clone().prependTo('.form-contract');
// });



