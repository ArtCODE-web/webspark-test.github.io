var $ = jQuery.noConflict();

$(document).ready(function () {


    function scroll_header(){
        if ($(this).scrollTop() > 10) {
            $('.header').addClass('header-scroll');
        }else{ $('.header').removeClass('header-scroll'); }
    }
    scroll_header();
    $(window).scroll(function () { scroll_header(); });

    const locale = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today', clear: 'Clear',
        dateFormat: 'dd/MM/yyyy', timeFormat: 'hh:mm aa',firstDay: 0
    };

    let swiperInfo = $(".swiper-info");
    if(swiperInfo.length > 0) {
        var swiper = new Swiper(".swiper-info", {
            slidesPerView: "auto", spaceBetween: 15
        });
    }

    let tabInput = $("[data-tab-button]");
    tabInput.on("change", function(event) {
        event.preventDefault();
        const tabID = event.target.id;
        let parentTabs = $(this).closest(".tabs");
    
        let tabItems = parentTabs.find(`[data-tab-content]`);
        tabItems.each(function(idx, tab) {
            const tabAttribute = tab.getAttribute(`data-tab-content`);
            $(tab).removeClass("--active-tab");
            if(tabAttribute === tabID) { $(tab).addClass("--active-tab"); }
        })
    })

    let airPickerRange = $(".airPickerRange");
    
    airPickerRange.each(function(idx, pickerRange) {
        let dpMin, dpMax;
        let inputTo = $(pickerRange).find("#input-to");
        let inputFrom = $(pickerRange).find("#input-from");
        let singleShowButton = $(pickerRange).find(".airPickerShow");
        let singleClearButton = $(pickerRange).find(".airPickerClear");
        
        dpMin = new AirDatepicker(inputFrom[0], {
            autoClose: true, locale,
            onSelect({date}) {dpMax.update({minDate: date})},
            position({$datepicker, $target, $pointer, done}) {
                let popper = Popper.createPopper($target, $datepicker, 
                {
                    placement: 'bottom',
                    modifiers: [
                        {name: "autoPlacement"},
                        {name: 'offset', options: {offset: [0, 10]}},
                        {name: 'arrow', options: {element: $pointer}}
                    ]
                });
                return function completeHide() { popper.destroy(); done(); }  
            }
        })
        dpMax = new AirDatepicker(inputTo[0], {
            autoClose: true, locale,
            onSelect({date}) {dpMin.update({maxDate: date})},
            position({$datepicker, $target, $pointer, done}) {
                let popper = Popper.createPopper($target, $datepicker, 
                {
                    placement: 'bottom',
                    modifiers: [
                        {name: "autoPlacement"},
                        {name: 'offset', options: {offset: [0, 10]}},
                        {name: 'arrow', options: {element: $pointer}}
                    ]
                });
                return function completeHide() { popper.destroy(); done(); }  
            }
        })

        singleShowButton.on("click", function(event) {
            event.preventDefault(); 
            let itemSingle = $(this).closest(".airPickerRangeItem");
            let inputFind = itemSingle.find("input[type='text']");
            inputFind.focus();
        })

        singleClearButton.on("click", function(event) {
            event.preventDefault(); 
            let itemSingle = $(this).closest(".airPickerRangeItem");
            let inputFind = itemSingle.find("input[type='text']");
            if(inputFind[0] == dpMin.$el) { dpMin.clear(); } else { dpMax.clear(); }
        })

    })
    
    
})