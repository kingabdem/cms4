function setAjaxData(object = null) {
    var data = {
        'sysLangId': VrConfig.sysLangId,
    };
    data[VrConfig.csrfTokenName] = $('meta[name="X-CSRF-TOKEN"]').attr('content');
    if (object != null) {
        Object.assign(data, object);
    }
    return data;
}

function setSerializedData(serializedData) {
    serializedData.push({name: 'sysLangId', value: VrConfig.sysLangId});
    serializedData.push({name: VrConfig.csrfTokenName, value: $('meta[name="X-CSRF-TOKEN"]').attr('content')});
    return serializedData;
}

//run on page load
$(document).ready(function () {
    var data = {};
    if ($('#postDetailsPage').length > 0) {
        var postId = $('#postDetailsPage').attr('data-id');
        data = {
            'isPostPage': true,
            'postId': postId
        };
    }
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Ajax/runOnPageLoad',
        data: setAjaxData(data),
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                if (obj.isPostPage) {
                    document.getElementById("postNextPrevContainer").innerHTML = obj.htmlContent;
                }
            }
        }
    });
});

$(document).ready(function () {
    $('#featured-slider').slick({
        autoplay: true,
        autoplaySpeed: 4900,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        speed: 200,
        rtl: VrConfig.rtl,
        cssEase: 'linear',
        lazyLoad: 'progressive',
        prevArrow: $('#featured-slider-nav .prev'),
        nextArrow: $('#featured-slider-nav .next'),
    });

    $('#random-slider').slick({
        autoplay: true,
        autoplaySpeed: 4900,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        speed: 200,
        rtl: VrConfig.rtl,
        lazyLoad: 'progressive',
        prevArrow: $('#random-slider-nav .prev'),
        nextArrow: $('#random-slider-nav .next'),
    });

    $('#post-detail-slider').slick({
        autoplay: false,
        autoplaySpeed: 4900,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        speed: 200,
        rtl: VrConfig.rtl,
        adaptiveHeight: true,
        lazyLoad: 'progressive',
        prevArrow: $('#post-detail-slider-nav .prev'),
        nextArrow: $('#post-detail-slider-nav .next'),
    });

    $(".main-menu .dropdown").hover(function () {
        $(".li-sub-category").removeClass("active");
        $(".sub-menu-inner").removeClass("active");
        $(".sub-menu-right .filter-all").addClass("active")
    }, function () {
    });
    $(".main-menu .navbar-nav .dropdown-menu").hover(function () {
        var a = $(this).attr("data-mega-ul");
        if (a != undefined) {
            $(".main-menu .navbar-nav .dropdown").removeClass("active");
            $(".mega-li-" + a).addClass("active")
        }
    }, function () {
        $(".main-menu .navbar-nav .dropdown").removeClass("active")
    });

    $(".li-sub-category").hover(function () {
        var a = $(this).attr("data-category-filter");
        $(".li-sub-category").removeClass("active");
        $(this).addClass("active");
        $(".sub-menu-right .sub-menu-inner").removeClass("active");
        $(".sub-menu-right .filter-" + a).addClass("active")
    }, function () {
    });
    $(".news-ticker ul li").delay(500).fadeIn(100);
    $('.newsticker').newsTicker({
        row_height: 30,
        max_rows: 1,
        speed: 400,
        direction: 'up',
        duration: 4000,
        autostart: 1,
        pauseOnHover: 0,
        prevButton: $('#btn_newsticker_prev'),
        nextButton: $('#btn_newsticker_next')
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".scrollup").fadeIn()
        } else {
            $(".scrollup").fadeOut()
        }
    });
    $(".scrollup").click(function () {
        $("html, body").animate({scrollTop: 0}, 700);
        return false
    });

    $(document).ready(function () {
        $('[data-toggle-tool="tooltip"]').tooltip()
    })
});

if ($('#form_validate').length) {
    $("#form_validate").validate();
}
if ($('#search_validate_mobile').length) {
    $("#search_validate_mobile").validate();
}
if ($('#search_validate').length) {
    $("#search_validate").validate();
}
if ($('#form_validate_payout_1').length) {
    $("#form_validate_payout_1").validate();
}
if ($('#form_validate_payout_2').length) {
    $("#form_validate_payout_2").validate();
}
if ($('#form_validate_payout_3').length) {
    $("#form_validate_payout_3").validate();
}

//mobile memu
$(document).on('click', '.btn-open-mobile-nav', function () {
    if ($("#navMobile").hasClass('nav-mobile-open')) {
        $("#navMobile").removeClass('nav-mobile-open');
        $('#overlay_bg').hide();
    } else {
        $("#navMobile").addClass('nav-mobile-open');
        $('#overlay_bg').show();
    }
});
$(document).on('click', '#overlay_bg', function () {
    $("#navMobile").removeClass('nav-mobile-open');
    $('#overlay_bg').hide();
});
//close menu
$(".close-menu-click").click(function () {
    $("#navMobile").removeClass('nav-mobile-open');
    $('#overlay_bg').hide();
});

//login form
$(document).ready(function () {
    $("#form-login").submit(function (event) {
        event.preventDefault();
        var form = $(this);
        var serializedData = form.serializeArray();
        serializedData = setSerializedData(serializedData);
        $.ajax({
            url: VrConfig.baseURL + '/Auth/loginPost',
            type: 'POST',
            data: serializedData,
            success: function (response) {
                var obj = JSON.parse(response);
                if (obj.result == 1) {
                    location.reload();
                } else if (obj.result == 0) {
                    document.getElementById("result-login").innerHTML = obj.error_message;
                }
            }
        });
    })
});

//view poll results
function viewPollResults(a) {
    $("#poll_" + a + " .question").hide();
    $("#poll_" + a + " .result").show()
}

//view poll option
function viewPollOptions(a) {
    $("#poll_" + a + " .result").hide();
    $("#poll_" + a + " .question").show()
}

//vote poll
$(document).ready(function () {
    $(".poll-form").submit(function (event) {
        event.preventDefault();
        var formId = $(this).attr("data-form-id");
        var form = $(this);
        var serializedData = form.serializeArray();
        serializedData = setSerializedData(serializedData);
        $.ajax({
            url: VrConfig.baseURL + '/Ajax/addPollVote',
            type: 'POST',
            data: serializedData,
            success: function (response) {
                var obj = JSON.parse(response);
                if (obj.result == 1) {
                    if (obj.htmlContent == 'required') {
                        $("#poll-required-message-" + formId).show();
                        $("#poll-error-message-" + formId).hide();
                    } else if (obj.htmlContent == 'voted') {
                        $("#poll-required-message-" + formId).hide();
                        $("#poll-error-message-" + formId).show();
                    } else {
                        document.getElementById("poll-results-" + formId).innerHTML = obj.htmlContent;
                        $("#poll_" + formId + " .result").show();
                        $("#poll_" + formId + " .question").hide()
                    }
                }
            }
        });
    })
});

//load more posts
var pageNumLoadMorePosts = 1;

function loadMorePosts(langId, type) {
    pageNumLoadMorePosts++;
    var data = {
        'lang_id': langId,
        'page': pageNumLoadMorePosts,
        'type': type,
        'view': '_post_item_horizontal',
        'q': getUrlParameter('q')
    };
    $(".btn-load-more").prop("disabled", true);
    $("#load_posts_spinner").show();
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Ajax/loadMorePosts',
        data: setAjaxData(data),
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                setTimeout(function () {
                    $("#postsLoadMoreContent").append(obj.htmlContent);
                    $(".btn-load-more").prop("disabled", false);
                    $("#load_posts_spinner").hide();
                    if (!obj.hasMore) {
                        $(".btn-load-more").hide();
                    }
                }, 200);
            } else {
                setTimeout(function () {
                    $(".btn-load-more").hide();
                    $("#load_posts_spinner").hide();
                }, 200);
            }
        }
    });
}

function getUrlParameter(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

//add remove reading list
function addRemoveReadingListItem(postId) {
    $(".tooltip").hide();
    var data = {
        'post_id': postId,
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Ajax/addRemoveReadingListItem',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
}

//add reaction
let reactionAjaxRequest = false;

function addReaction(postId, reaction) {
    if (reactionAjaxRequest) {
        return false;
    }
    reactionAjaxRequest = true;
    var data = {
        'post_id': postId,
        'reaction': reaction
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Ajax/addReaction',
        data: setAjaxData(data),
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                document.getElementById("reactions_result").innerHTML = obj.htmlContent
            }
        },
        complete: function () {
            reactionAjaxRequest = false;
        }
    });
}

$(document).ready(function () {
    $("#add_comment").submit(function (event) {
        event.preventDefault();
        var formValues = $(this).serializeArray();
        var data = {};
        var submit = true;
        $(formValues).each(function (i, field) {
            if ($.trim(field.value).length < 1) {
                $("#add_comment [name='" + field.name + "']").addClass("is-invalid");
                submit = false;
            } else {
                $("#add_comment [name='" + field.name + "']").removeClass("is-invalid");
                data[field.name] = field.value;
            }
        });
        data['limit'] = $('#post_comment_limit').val();
        if (VrConfig.isRecaptchaEnabled == true) {
            if (typeof data['g-recaptcha-response'] === 'undefined') {
                $('.g-recaptcha').addClass("is-recaptcha-invalid");
                submit = false;
            } else {
                $('.g-recaptcha').removeClass("is-recaptcha-invalid");
            }
        }
        if (submit == true) {
            $('.g-recaptcha').removeClass("is-recaptcha-invalid");
            $.ajax({
                type: 'POST',
                url: VrConfig.baseURL + '/Ajax/addCommentPost',
                data: setAjaxData(data),
                success: function (response) {
                    var obj = JSON.parse(response);
                    if (obj.type == 'message') {
                        document.getElementById("message-comment-result").innerHTML = obj.htmlContent;
                    } else {
                        document.getElementById("comment-result").innerHTML = obj.htmlContent;
                    }
                    if (VrConfig.isRecaptchaEnabled == true) {
                        grecaptcha.reset();
                    }
                    $("#add_comment")[0].reset();
                }
            });
        }
    });

    $("#add_comment_registered").submit(function (event) {
        event.preventDefault();
        var formValues = $(this).serializeArray();
        var data = {
            'limit': $('#post_comment_limit').val()
        };
        var submit = true;
        $(formValues).each(function (i, field) {
            if ($.trim(field.value).length < 1) {
                $("#add_comment_registered [name='" + field.name + "']").addClass("is-invalid");
                submit = false;
            } else {
                $("#add_comment_registered [name='" + field.name + "']").removeClass("is-invalid");
                data[field.name] = field.value;
            }
        });
        data['limit'] = $('#post_comment_limit').val();
        if (submit == true) {
            $.ajax({
                type: 'POST',
                url: VrConfig.baseURL + '/Ajax/addCommentPost',
                data: setAjaxData(data),
                success: function (response) {
                    var obj = JSON.parse(response);
                    if (obj.type == 'message') {
                        document.getElementById("message-comment-result").innerHTML = obj.htmlContent;
                    } else {
                        document.getElementById("comment-result").innerHTML = obj.htmlContent;
                    }
                    $("#add_comment_registered")[0].reset();
                }
            });
        }
    });
});

//add subcomment
$(document).on('click', '.btn-subcomment', function () {
    var commentId = $(this).attr("data-comment-id");
    var data = {};
    data['limit'] = $('#post_comment_limit').val();
    var formId = "#add_subcomment_" + commentId;
    $(formId).ajaxSubmit({
        beforeSubmit: function () {
            var formValues = $("#add_subcomment_" + commentId).serializeArray();
            var submit = true;
            $(formValues).each(function (i, field) {
                if ($.trim(field.value).length < 1) {
                    $(formId + " [name='" + field.name + "']").addClass("is-invalid");
                    submit = false;
                } else {
                    $(formId + " [name='" + field.name + "']").removeClass("is-invalid");
                    data[field.name] = field.value;
                }
            });
            if (VrConfig.isRecaptchaEnabled == true) {
                if (typeof data['g-recaptcha-response'] === 'undefined') {
                    $(formId + ' .g-recaptcha').addClass("is-recaptcha-invalid");
                    submit = false;
                } else {
                    $(formId + ' .g-recaptcha').removeClass("is-recaptcha-invalid");
                }
            }
            if (submit == false) {
                return false;
            }
        },
        type: 'POST',
        url: VrConfig.baseURL + '/Ajax/addCommentPost',
        data: setAjaxData(data),
        success: function (response) {
            if (VrConfig.isRecaptchaEnabled == true) {
                grecaptcha.reset();
            }
            var obj = JSON.parse(response);
            if (obj.type == 'message') {
                document.getElementById("message-subcomment-result-" + commentId).innerHTML = obj.htmlContent;
            } else {
                document.getElementById("comment-result").innerHTML = obj.htmlContent;
            }
            $('.visible-sub-comment form').empty();
        }
    })
});

//add registered subcomment
$(document).on('click', '.btn-subcomment-registered', function () {
    var commentId = $(this).attr("data-comment-id");
    var data = {};
    $("#add_subcomment_registered_" + commentId).ajaxSubmit({
        beforeSubmit: function () {
            var form = $("#add_subcomment_registered_" + commentId).serializeArray();
            var comment = $.trim(form[0].value);
            if (comment.length < 1) {
                $(".form-comment-text").addClass("is-invalid");
                return false;
            } else {
                $(".form-comment-text").removeClass("is-invalid");
            }
        },
        type: 'POST',
        url: VrConfig.baseURL + '/Ajax/addCommentPost',
        data: setAjaxData(data),
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.type == 'message') {
                document.getElementById("message-subcomment-result-" + commentId).innerHTML = obj.htmlContent;
            } else {
                document.getElementById("comment-result").innerHTML = obj.htmlContent;
            }
            $('.visible-sub-comment form').empty();
        }
    })
});


//show comment box
$(document).on('click', '.comment-meta .btn-reply', function () {
    $('.comment-meta .btn-reply').prop('disabled', true);
    var commentId = $(this).attr('data-parent');
    if ($('#sub_comment_form_' + commentId).html().length > 0) {
        $('#sub_comment_form_' + commentId).empty();
        $('.comment-meta .btn-reply').prop('disabled', false);
    } else {
        $('.visible-sub-comment').empty();
        var limit = parseInt($("#post_comment_limit").val());
        var data = {
            'comment_id': commentId,
            'limit': limit
        };
        $.ajax({
            type: 'POST',
            url: VrConfig.baseURL + '/Ajax/loadSubcommentBox',
            data: setAjaxData(data),
            success: function (response) {
                var obj = JSON.parse(response);
                if (obj.result == 1) {
                    $('#sub_comment_form_' + commentId).append(obj.htmlContent);
                }
                $('.comment-meta .btn-reply').prop('disabled', false);
            }
        });
    }
});

//like comment
$(document).on('click', '.btn-comment-like', function () {
    if ($(this).hasClass('comment-liked')) {
        $(this).removeClass('comment-liked');
    } else {
        $(this).addClass('comment-liked');
    }
    var commentId = $(this).attr("data-comment-id");
    var data = {
        'comment_id': commentId
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Ajax/likeCommentPost',
        data: setAjaxData(data),
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                document.getElementById("lbl_comment_like_count_" + commentId).innerHTML = obj.likeCount;
            }
        }
    });
});

//load more comments
function loadMoreComments(postId) {
    var limit = parseInt($("#post_comment_limit").val());
    var data = {
        'post_id': postId,
        'limit': limit
    };
    $("#load_comment_spinner").show();
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Ajax/loadMoreComments',
        data: setAjaxData(data),
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                setTimeout(function () {
                    $("#load_comment_spinner").hide();
                    $("#post_comment_limit").val(limit + 5);
                    document.getElementById("comment-result").innerHTML = obj.htmlContent
                }, 500);
            }
        }
    });
}

//delete comment
function deleteComment(commentId, postId, message) {
    Swal.fire({
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: VrConfig.textYes,
        cancelButtonText: VrConfig.textCancel,
    }).then((result) => {
        if (result.isConfirmed) {
            var limit = parseInt($("#post_comment_limit").val());
            var data = {
                'id': commentId,
                'post_id': postId,
                'limit': limit
            };
            $.ajax({
                type: 'POST',
                url: VrConfig.baseURL + '/Ajax/deleteCommentPost',
                data: setAjaxData(data),
                success: function (response) {
                    var obj = JSON.parse(response);
                    if (obj.result == 1) {
                        document.getElementById("comment-result").innerHTML = obj.htmlContent;
                    }
                }
            });
        }
    });
}

//show on page load
$(window).on('load', function () {
    $(".show-on-page-load").css("visibility", "visible")
});

//full screen
$(document).ready(function () {
    $("iframe").attr("allowfullscreen", "")
});
//custom scrollbar
var custom_scrollbar = $('.custom-scrollbar');
if (custom_scrollbar.length) {
    var ps = new PerfectScrollbar('.custom-scrollbar', {
        wheelPropagation: true,
        suppressScrollX: true
    });
}

//custom scrollbar
var custom_scrollbar = $('.custom-scrollbar-followers');
if (custom_scrollbar.length) {
    var ps = new PerfectScrollbar('.custom-scrollbar-followers', {
        wheelPropagation: true,
        suppressScrollX: true
    });
}

//search
$(".search-icon").click(function () {
    if ($(".search-form").hasClass("open")) {
        $(".search-form").removeClass("open");
    } else {
        $(".search-form").addClass("open");
    }
});

//close cookies warning
function closeCookiesWarning() {
    $(".cookies-warning").hide();
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/close-cookies-warning-post',
        data: setAjaxData({}),
        success: function (response) {
        }
    });
}

//print
$("#print_post").on("click", function () {
    $(".post-content .title, .post-content .post-meta, .post-content .post-image, .post-content .post-text").printThis({importCSS: true,})
});
//on ajax stop
$(document).ajaxStop(function () {
    function b(c) {
        $("#poll_" + c + " .question").hide();
        $("#poll_" + c + " .result").show()
    }

    function a(c) {
        $("#poll_" + c + " .result").hide();
        $("#poll_" + c + " .question").show()
    }
});
$(document).ready(function () {
    $('.validate_terms').submit(function (e) {
        if (!$(".checkbox_terms_conditions").is(":checked")) {
            e.preventDefault();
            $('.custom-checkbox .checkbox-icon').addClass('is-invalid');
        } else {
            $('.custom-checkbox .checkbox-icon').removeClass('is-invalid');
        }
    });
});
//show gallery buttons on page load
$(document).ready(function () {
    $(".gallery-post-buttons a").css('opacity', '1');
});

//magnificPopup
$(document).ready(function (a) {
    a(".image-popup-single").magnificPopup({
        type: "image", titleSrc: function (b) {
            return b.el.attr("title") + "<small></small>"
        }, image: {verticalFit: true,}, gallery: {enabled: false, navigateByImgClick: true, preload: [0, 1]}, removalDelay: 100, fixedContentPos: true,
    })
});


$(document).ready(function () {
    $(".form-newsletter").submit(function (event) {
        event.preventDefault();
        var formId = $(this).attr('id');
        var input = '#' + formId + " .newsletter-input";
        var email = $(input).val().trim();
        if (email == '') {
            $(input).addClass('has-error');
            return false;
        } else {
            $(input).removeClass('has-error');
        }
        var serializedData = $(this).serializeArray();
        serializedData = setSerializedData(serializedData);
        $.ajax({
            type: 'POST',
            url: VrConfig.baseURL + '/add-newsletter-post',
            data: serializedData,
            success: function (response) {
                var obj = JSON.parse(response);
                if (obj.result == 1) {
                    if (obj.isSuccess) {
                        Swal.fire({text: obj.message, icon: 'success', confirmButtonText: VrConfig.textOk});
                        $(input).val('');
                    } else {
                        Swal.fire({text: obj.message, icon: 'warning', confirmButtonText: VrConfig.textOk});
                    }
                }
            }
        });
    });
});

$(document).on('click', '.table-of-contents .ul-main li a', function (event) {
    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 500, function () {
            window.location.hash = hash;
        });
    }
});

$(function () {
    $('.post-text table').wrap('<div style="overflow-x:auto;"></div>');
});

$(document).ready(function () {
    $('.circle-loader').toggleClass('load-complete');
    $('.checkmark').toggle();
});