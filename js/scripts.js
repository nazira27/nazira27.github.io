/*
* Template Name: Wezen - Responsive vCard WordPress Theme
* Author: lmpixels
* Author URL: http://themeforest.net/user/lmpixels
* Version: 1.0.0
*/

(function($, fnFrontend) { 
"use strict";

    var Wezen = {

        init: function() {

            var widgets = {
                'wezen-testimonials.default' : Wezen.testimonials,
                'wezen-clients.default' : Wezen.clients,
                'wezen-skills.default' : Wezen.skills,
                'wezen-home-page-second.default' : Wezen.textRotation,
            };

            $.each( widgets, function( widget, callback ) {
                fnFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
            });
        },

        testimonials: function() {
            setTimeout(function(){
                var mobile_mode_items = "",
                    tablet_mode_items = "",
                    items = "";
                
                $( '.testimonials' ).each( function() {
                    var mobile_mode_items = $(this).attr('data-mobile-items'),
                        tablet_mode_items = $(this).attr('data-tablet-items'),
                        items = $(this).attr('data-items'),
                        id = $(this).attr('id'),
                        loop = false,
                        windowWidth = $(window).width(),
                        autoplayTablet = '',
                        autoplayValue = '';
                    if ($(this).hasClass('autoplay-on')) {
                        autoplayValue = true;
                        if ($(this).hasClass('autoplay-mobile')) {
                            if (windowWidth > 768) {
                                autoplayValue = false;
                            } else {
                                autoplayValue = true;
                            }
                        }
                    } else {
                        autoplayValue = false;
                    }

                    if ($(this).hasClass('loop-on')) {
                        loop = true;
                    } else {
                        loop = false;
                    }

                    $("#" + id + ".testimonials.owl-carousel").imagesLoaded().owlCarousel({
                        nav: true,
                        dots: false,
                        items: 1,
                        loop: loop,
                        autoplay: autoplayValue,
                        navText: false,
                        autoHeight: false,
                        margin: 10,
                        responsive : {
                            0 : {
                                items: mobile_mode_items,
                            },
                            768 : {
                                items: tablet_mode_items,
                            },
                            1200 : {
                                items: items,
                            }
                        }
                    });
                });
            },500);
        },

        clients: function() {
            setTimeout(function(){
                // Clients Slider
                var mobile_mode_items = "",
                    tablet_mode_items = "",
                    items = "";
                
                $( '.clients' ).each( function() {
                    var mobile_mode_items = $(this).attr('data-mobile-items'),
                        tablet_mode_items = $(this).attr('data-tablet-items'),
                        items = $(this).attr('data-items'),
                        id = $(this).attr('id'),
                        loop = false,
                        windowWidth = $(window).width(),
                        autoplayTablet = '',
                        autoplayValue = '';
                    if ($(this).hasClass('autoplay-on')) {
                        autoplayValue = true;
                        if ($(this).hasClass('autoplay-mobile')) {
                            if (windowWidth > 768) {
                                autoplayValue = false;
                            } else {
                                autoplayValue = true;
                            }
                        }
                    } else {
                        autoplayValue = false;
                    }

                    if ($(this).hasClass('loop-on')) {
                        loop = true;
                    } else {
                        loop = false;
                    }

                    $("#" + id + ".clients.owl-carousel").imagesLoaded().owlCarousel({
                        nav: true, // Show next/prev buttons.
                        items: 2, // The number of items you want to see on the screen.
                        loop: loop,
                        autoplay: autoplayValue,
                        navText: false,
                        margin: 10,
                        autoHeight: false,
                        responsive : {
                            // breakpoint from 0 up
                            0 : {
                                items: mobile_mode_items,
                            },
                            // breakpoint from 768 up
                            768 : {
                                items: tablet_mode_items,
                            },
                            1200 : {
                                items: items,
                            }
                        }
                    });
                });
            },500);
        },

        skills: function() {
            var $custom_styles = "",
                $custom_style = "";
            
            function skillsStyles() {
                $( '.skill-container' ).each( function() {
                    var value = $(this).attr('data-value'),
                        color_value = $(this).attr('data-color'),
                        $id = $(this).attr('id');

                    if( value >= 101) {
                        value = '100';
                    }

                    if( typeof value != 'undefined' ) {
                        $custom_style = '#' + $id + ' .skill-percentage { width: ' + value + '%; background-color: ' + color_value + '; } ';
                        $custom_styles += $custom_style;
                    }
                });
                $('head').append('<style data-styles="wezen-theme-skills-css" type="text/css">' + $custom_styles + '</style>');
            }

            skillsStyles();

            $(this).ajaxComplete(function() {
                $('style[data-styles="wezen-theme-skills-css"]').remove().detach();
                skillsStyles();
            });
        },

        textRotation: function() {
            $('.text-rotation').owlCarousel({
                loop: true,
                dots: false,
                nav: false,
                margin: 10,
                items: 1,
                autoplay: true,
                autoplayHoverPause: false,
                autoplayTimeout: 3800,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn'
            });
        },

    }
    $( window ).on( 'elementor/frontend/init', Wezen.init );
    $( window ).on( 'elementor/frontend/init', Wezen.textRotation );
    $( window ).on('resize',function(){
        Wezen.testimonials();
        Wezen.clients();
        Wezen.textRotation();
    });
    $( window ).on('load',function(){
        Wezen.textRotation();
    });
})(jQuery, window.elementorFrontend);