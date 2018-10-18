$(document).ready(function() {

    "use strict";

    //Page loader
    if ($('.pageloader').length) {
        $('.pageloader').toggleClass('is-active');

        var pageloaderTimeout = setTimeout( function() {
            $('.pageloader').toggleClass('is-active');
            $('.infraloader').toggleClass('is-active')
            clearTimeout( pageloaderTimeout );
        }, 700 );
    }

    //Navbar Clone
    if ($('#navbar-clone').length) {
        $(window).scroll(function() {    // this will work when your window scrolled.
            var height = $(window).scrollTop();  //getting the scrolling height of window
            if(height  > 50) {
                $("#navbar-clone").addClass('is-active');
            } else{
                $("#navbar-clone").removeClass('is-active');
            }
        });
    }

    //Mobile menu toggle
    if ($('.navbar-burger').length) {
        $('.navbar-burger').on("click", function(){

            var menu_id = $(this).attr('data-target');
            $(this).toggleClass('is-active');
            $("#"+menu_id).toggleClass('is-active');
            $('.navbar.is-light').toggleClass('is-dark-mobile')
        });
    }

    //Navigation Tabs
    $('.flying-tabs .flying-child').on('click', function() {
        var tab_id = $(this).attr('data-tab');

        $(this).siblings('.flying-child').removeClass('is-active');
        $(this).closest('.flying-wrapper').find('.flying-tabs-content').children('.tab-content').removeClass('is-active');

        $(this).addClass('is-active');
        $("#" + tab_id).addClass('is-active');
    })

    //Icons
    feather.replace();

    //Fix for portrait tabs flex display
    if (window.matchMedia('(min-width: 768px)').matches) {
        $('.tab-content-wrapper').addClass('is-flex-mobile');
    } else {
        $('.tab-content-wrapper').removeClass('is-flex-mobile');
    }

    $(window).on('resize', function() {
        if (window.matchMedia('(min-width: 768px)').matches) {
            $('.tab-content-wrapper').addClass('is-flex-mobile');
        } else {
            $('.tab-content-wrapper').removeClass('is-flex-mobile');
        }
    })

    //Aos
    AOS.init();

    //Anchor scroll
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .on('click', function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 550, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

})
