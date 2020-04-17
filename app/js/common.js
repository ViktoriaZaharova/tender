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
    "use strict";
    $(".perfect-scrollbar, [data-perfect-scrollbar]").each(function (index) {
        var $el = $(this);
        var ps = new PerfectScrollbar(this, {
            suppressScrollX: $el.data("suppress-scroll-x"),
            suppressScrollY: $el.data("suppress-scroll-y")
        });
    });
});

// menu sidebar
$(document).ready(function () {
    "use strict";

    var $appAdminWrap = $(".wrapper");
    var $sidebarToggle = $appAdminWrap.find(".menu-toggle");
    var $sidebarLeft = $appAdminWrap.find(".sidebar-left");
    var $sidebarLeftSecondary = $appAdminWrap.find(".sidebar-left-secondary");
    var $sideNavItem = $appAdminWrap.find(".nav-item");

    function navItemToggleActive($activeItem) {
        var $navItem = $(".nav-item");
        $navItem.removeClass("active");
        $activeItem.addClass("active");
    }

    function initLayout() {
        var pageName = location.pathname.split('/').find(function (s) {
            return s.includes('.html');
        }); // Makes secondary menu selected on page load

        $sideNavItem.each(function (index) {
            var $item = $(this);
            var dataItem = $item.data("item");
            var secondaryItems = $sidebarLeftSecondary.find("[data-parent=\"".concat(dataItem, "\"]")); // add active class if HTML page

            if (pageName) {
                $item.removeClass("active");
                var $childItem = secondaryItems.find('a[href="' + pageName + '"]');
                $childItem.length ? $item.addClass("active") : null;
                $childItem.length ? $childItem.addClass("open") : null; // console.log($childItem.length ? $childItem : '');
            }

            if ($item.hasClass("active")) {
                // console.log(dataItem);
                $sidebarLeftSecondary.find("[data-parent=\"".concat(dataItem, "\"]")).show();
            }
        });

        if (gullUtils.isMobile()) {
            $appAdminWrap.removeClass("sidenav-open");
        }
    }

    $(window).on("resize", function (event) {
        if (gullUtils.isMobile()) {
            $appAdminWrap.removeClass("sidenav-open");
        }
    });
    initLayout(); // Show Secondary menu area on hover on side menu item;

    $sidebarLeft.find(".nav-item").on("mouseenter", function (event) {
        var $navItem = $(event.currentTarget);
        var dataItem = $navItem.data("item");

        if (dataItem) {
            navItemToggleActive($navItem);
            $sidebarLeftSecondary.find(".submenu-area").hide();
            $sidebarLeftSecondary.find("[data-parent=\"".concat(dataItem, "\"]")).show();
        }
    }); // Prevent opeing link if has data-item

    $sidebarLeft.find(".nav-item").on("click", function (e) {
        var $navItem = $(event.currentTarget);
        var dataItem = $navItem.data("item");

        if (dataItem) {
            e.preventDefault();
        }
    }); // Toggle menus on click on header toggle icon

    $sidebarToggle.on("click", function (event) {
        $appAdminWrap.toggleClass("sidenav-open");
    });
    $('.sidebar-close').on('click', function (e) {
        $appAdminWrap.removeClass("sidenav-open");
    });
});

// calendar date
$( function() {
    //Сменим язык календаря на русский
    $.datepicker.setDefaults(
        {
            closeText: 'Закрыть',
            prevText: '',
            currentText: 'Сегодня',
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
                'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
                'Июл','Авг','Сен','Окт','Ноя','Дек'],
            dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
            dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        });
    //Добавим код календаря
    var dateFormat = "mm/dd/yy",
        from = $( ".datepicker1" )
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1
            })
            .on( "change", function() {
                to.datepicker( "option", "minDate", getDate( this ) );
            }),
        to = $( ".datepicker2" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1
        })
            .on( "change", function() {
                from.datepicker( "option", "maxDate", getDate( this ) );
            });

    function getDate( element ) {
        var date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }

        return date;
    }
} );


