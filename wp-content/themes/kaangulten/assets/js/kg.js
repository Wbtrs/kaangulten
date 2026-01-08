$(document).ready(function () {

    $('.carousel').on('slid.bs.carousel', function () {
        $(".carousel-indicators2 li").removeClass("active");
        var indicators = $(".carousel-indicators li.active").data("slide-to");
        $(".carousel-indicators2").find("[data-slide-to='" + indicators + "']").addClass("active");
        console.log(indicators);
    });


    $('*').on('click', function (e) {
        if (!$(e.target).is('.navbar-toggler') && !$(e.target).is('.navbar-toggler *') && !$(e.target).is('.navbar-collapse') && !$(e.target).is('.navbar-collapse  *')) {
            $('#collapse').collapse('hide');
        }
    });

    //ux();

    function ux() {
        $('#content').css({
            'margin-bottom': $('#footer').outerHeight() + 'px'
        });
    }

    /* Event Modals */
    if ($('#event_modals').length) {

        $("div[id^='event']").each(function () {
            var currentModal = $(this);
            currentModal.find('.btn-next').click(function () {
                currentModal.modal('hide');
                currentModal.closest("div[id^='event']").nextAll("div[id^='event']").first().modal('show');
            });
            currentModal.find('.btn-prev').click(function () {
                currentModal.modal('hide');
                currentModal.closest("div[id^='event']").prevAll("div[id^='event']").first().modal('show');
            });
        });

    }

    /* Media Filters */
    $('#media_page #media .filter-buttons .btn').on('click', function () {
        var type = $(this).data('type');
        $('#media_page #media .filter-buttons .btn').removeClass('active');
        $(this).addClass('active');
        if (type == 'all') {
            $('#media_page #media .item').show();
        } else {
            $('#media_page #media .item').hide();
            $('#media_page #media .item[data-type=' + type + ']').show();
        }
    });

    /* Material Form Elements */
    $('.form-group input, .form-group textarea').on('click focus', function () {
        $(this).parents('.form-group').addClass('active');
    });

    $('.form-group input, .form-group textarea').on('focusout', function () {
        if ($(this).val() == '') {
            $(this).parents('.form-group').removeClass('not-empty').removeClass('active');
        } else {
            $(this).parents('.form-group').removeClass('active').addClass('not-empty');
        }
    });

    $('textarea').on('keyup', function () {
        autoHeight($(this));
    });

    function autoHeight(textarea) {
        var text = textarea.val(),
            matches = text.match(/\n/g),
            breaks = matches ? matches.length : 1,
            lineH = textarea.css('line-height').split('px')[0];

        textarea.stop(true).animate({
            'height': (breaks * lineH) + parseInt(lineH) + 24 + 'px'
        }, 50);
    }


    /* Modal Vertical Align */
    function reposition() {
        var dialog = $(this).find('.modal-dialog');
        $(this).css('display', 'block');
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }

    $('.modal').on('show.bs.modal', reposition);

    $(window).on('resize', function () {
        $('.modal:visible').each(reposition);
        //ux();
    });

    /* Buy Steps */
    $('#buy_form form').on('submit', function (e) {

        /* Step 1 */
        var fullname = $.trim($(this).find('input[name=fullname]').val()),
            phone = $.trim($(this).find('input[name=phone]').val()),
            mail = $.trim($(this).find('input[name=mail]').val()),
            address = $.trim($(this).find('input[name=address]').val()),

            /* Step 2 */
            card_name = $.trim($(this).find('input[name=card_name]').val()),
            card_no = $.trim($(this).find('input[name=card_no]').val()),
            card_month = $.trim($(this).find('select[name=card_month]').val()),
            card_year = $.trim($(this).find('select[name=card_year]').val()),
            card_cvv = $.trim($(this).find('input[name=card_cvv]').val()),
            card_type = $.trim($(this).find('select[name=card_type]').val());

        if (fullname == '') {
            error('Lütfen adınızı giriniz!');
        } else if (phone == '') {
            error('Lütfen telefon numaranızı giriniz!');
        } else if (mail == '') {
            error('Lütfen e-posta adresinizi giriniz!');
        } else if (address == '') {
            error('Lütfen kargo adresini giriniz!');
        } else {
            /* Step 2 */
            $('* .nav-link[href="#step_1"]').parent('.nav-item').addClass('checked').find('.step').html('<i class="fa fa-check"></i>');
            $('* .nav-link[href="#step_2"]').parent('.nav-item').addClass('checked').find('.nav-link').removeClass('disabled').trigger('click');
            if (card_name == '') {
                error('Lütfen kart üzerinde yazan isimi giriniz!');
            } else if (card_no == '') {
                error('Lütfen kart numarasını giriniz!');
            } else if (card_month == '') {
                error('Lütfen kart üzerinde belirtilen ayı seçiniz!');
            } else if (card_year == '') {
                error('Lütfen kart üzerinde belirtilen yılı seçiniz!');
            } else if (card_cvv == '') {
                error('Lütfen kartın arkasında bulunan cvv kodunu giriniz!');
            } else if (card_type == '') {
                error('Lütfen kart tipi seçiniz!');
            } else {
                /*
                     Bu kısımda ajax işlemi yapılacak olumlu sonuç dönerse alttaki kısım çalıştırılacak.
                */
                /* Step 3 */
                $('#error .close').trigger('click');
                $('* .nav-link[href="#step_2"]').find('.step').html('<i class="fa fa-check"></i>');
                $('* .nav-link[href="#step_3"]').parent('.nav-item').addClass('checked').find('.nav-link').removeClass('disabled').trigger('click');
                $('* .nav-link[href="#step_3"] .step').html('<i class="fa fa-check"></i>');
            }
        }
        e.preventDefault();
    });

    if ($('#error').length > 0) {

        $('#error .close').on('click', function () {
            $('#error').css('top', '-100px');
            $('#error .message').text('');
        });

        function error(message) {
            $('#error .close').trigger('click');
            $('#error .message').text(message);
            $('#error').css('top', '0');
        }

    }

    $('#scroll_down').on('click', function () {
        $('html,body').animate({
            scrollTop: $(document).height() * 0.92 - $(window).height()
        }, 500);
    });

    $('*[data-toggle=tooltip]').tooltip();


    //TARGET BLANK
    $('a[rel="external"]').attr('target', '_blank');
    //TARGET BLANK

    //BASINDA SAYFASI VİDEO MODAL
    $('div[data-type="video"]').on('click', function () {

        var link = $(this).attr('data-YID');

        $('#youtubemodal').modal('show');

        $('#youtubemodal .youtunelink').attr('src', 'https://www.youtube.com/embed/' + link);

        return false;
    });

    $('.modal').on('hidden.bs.modal', function (e) {
        if ($('#youtubemodal .youtunelink').length > 0) {
            $('#youtubemodal .youtunelink').attr('src', '');
        }
    });

    //BASINDA SAYFASI VİDEO MODAL

    /* Show More Posts */
    var page = 1;
    if ($("body#blog_page").length) {
        $("body#blog_page").attr('data-id', page);
    }

    $('#more_posts').on('click', function () {

        page = parseInt($("body#blog_page").attr('data-id')) + 1;
        $("body#blog_page").attr('data-id', page);
        $.post('/wp-content/themes/kaangulten/more_posts.php', {'page': page}, function (response) {
            console.log('"' + response + '"');
            if (response === 'false') {
                $('#blog_posts').append('<div>BAŞKA YAZI KALMADI <i class="fa fa-smile-o"></i></div>');
                $('#more_posts').remove();
            } else {
                $("#blog_posts").append(response);
            }
        });

    });

    /* Sidebar Fixed - Scroll */
    if ($("body#blog_page").length) {

        if ($(window).outeWidth >= 1024) {
            $(window).scroll(function () {
                var scroll_top = $(this).scrollTop(),
                    sidebar_width = $('.sidebar').innerWidth(),
                    footer_offset = $('footer').offset().top,
                    screen_height = $(window).height();

                if ($('#content #last_posts').length > 0) {
                    if (scroll_top + screen_height > $('#content #last_posts').offset().top) {
                        $('.sidebar').removeClass('fix');
                    } else if (scroll_top > 200) {
                        $('.sidebar').addClass('fix').width(sidebar_width);
                    } else {
                        $('.sidebar').removeClass('fix');
                    }
                } else {
                    if (scroll_top + screen_height > footer_offset) {
                        $('.sidebar').removeClass('fix');
                    } else if (scroll_top > 200) {
                        $('.sidebar').addClass('fix').width(sidebar_width);
                    } else {
                        $('.sidebar').removeClass('fix');
                    }
                }

            });
        }

    }
    $("body > a[href*='elfsight.com']").remove()
    setTimeout(() => $("body > a[href*='elfsight.com']").remove(), 1000)
});

function instaCounts(t) {
    var c = t.children;
    c[1].style.filter = "invert(100%) opacity(100%)";
}

function instaCounts1(t) {
    var c = t.children;
    c[1].style.filter = "invert(100%) opacity(0)";
}

function yt(thi) {
    var to = $(thi).data("slide-to");
    $(".ytMainCarousel[data-slide-to=" + to + "]").click();
}

function yorumAc(thi) {
    thi.style.display = "none";
    $("#yorumKapa").css("display", "inline-block");
    $("#comments").css("display", "block");
    $("#comment_form").css("display", "block");
}

function yorumKapa(thi) {
    thi.style.display = "none";
    $("#yorumAc").css("display", "inline-block");
    $("#comments").css("display", "none");
    $("#comment_form").css("display", "none");
}