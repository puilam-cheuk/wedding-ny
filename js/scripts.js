$(document).ready(function () {

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function () {
        $('.wp7').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function () {
        $('.wp8').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp9').waypoint(function () {
        $('.wp9').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Initiate Flexslider ******************/
    $('.flexslider').flexslider({
        animation: "slide"
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4
    });

    $('.fancybox').fancybox({
        padding: 4,
        width: 1000,
        height: 800
    });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/

    /* When user clicks the Icon */
    $('.nav-toggle').click(function () {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });
    /* When user clicks a link */
    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');

    });

    /***************** Header BG Scroll ******************/

    $(function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 20) {
                $('section.navigation').addClass('fixed');
                $('header').css({
                    "border-bottom": "none",
                    "padding": "35px 0"
                });
                $('header .member-actions').css({
                    "top": "39px",
                });
                $('header .navicon').css({
                    "top": "34px",
                });
            } else {
                $('section.navigation').removeClass('fixed');
                $('header').css({
                    "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
                    "padding": "50px 0"
                });
                $('header .member-actions').css({
                    "top": "54px",
                });
                $('header .navicon').css({
                    "top": "48px",
                });
            }
        });
    });
    /***************** Smooth Scrolling ******************/

    $(function () {

        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 90
                    }, 2000);
                    return false;
                }
            }
        });

    });

    /********************** Add to Calendar **********************/
    var myCalendar = createCalendar({
        options: {
            class: '',
            // You can pass an ID. If you don't, one will be generated for you
            id: ''
        },
        data: {
            // Event title
            title: "謝鄭婚宴 | Cheuk & Pui Lam Banquet",

            // Event start date
            start: new Date('Nov 18, 2023 17:00'),


            // Event timezone. Will convert the given time to that zone
            timezone: 'Asia/Hong_Kong',

            // Event duration (IN MINUTES)
            duration: 180,

            // You can also choose to set an end time
            // If an end time is set, this will take precedence over duration
            // end: new Date('Nov 29, 2017 00:00'),

            // Event Address
            // address: '75VC+F9 Tsim Sha Tsui, Hong Kong',
            // address: 'https://goo.gl/maps/PE675c6zty6JSC8x5',
            address: 'Serenade Chinese Restaurant, 2樓, 尖沙咀梳士巴利道10號香港文化中心大樓1, Tsim Sha Tsui, Hong Kong',

            // Event Description
            // description: "We can't wait to see you on our big day."
        }
    });

    $('#add-to-cal').html(myCalendar);


    /********************** RSVP **********************/
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        // var name = decodeURIComponent(data.match(/name=(.*)/)[1]);
        var name = new FormData(this).get('name');

        $('#alert-wrapper').html(
            alert_markup(
                'info',
                '<strong>Please wait!</strong> We are looking up your details.'
                + '</br>'
                + '<strong>稍等片刻!</strong> 我們正在查找您的資料。'
            )
        );

        $.get('https://script.google.com/macros/s/AKfycbxNt0nokofAbTOHcIEnZnHrq_C9yXjzq_wDjbzUx_8Xfc_u9yeRlbivP9rB7Sd5YhsX/exec', data)
            .done(function (data) {
                var msg = data.en_message + '</br>' + data.ch_message;
                if (data.result === "error") {
                    $('#alert-wrapper').html(alert_markup('danger', msg));
                } else {
                    $('#alert-wrapper').html(alert_markup('success', msg));

                    if (data.last_updated) {
                        $('#rsvp-lastUpdated').html(update_lastUpdated(data.last_updated));
                    }
                    $('#rsvp-maxSize').html(update_maxSize(data.max_size));

                    var group_list = data.group_list.split(',');
                    var guest_name = data.display_name || name;
                    var rowIdx = data.rowIdx;
                    var idx = 0;

                    // this is so that the searcher's name comes up first in the cards
                    $('#rsvp-group').append(create_individual_card(idx));
                    $('#rsvp-name-' + idx).html(create_name_field(guest_name, rowIdx, idx));
                    $('#rsvp-email-' + idx).html(create_email_input(idx));
                    $('#rsvp-diet-' + idx).html(create_diet_input(idx));
                    $('#rsvp-response-' + idx).html(create_rsvp_response_input(idx));

                    for (j = 0; j < data.max_size; j++) {
                        guest_name = group_list[j].trim();
                        rowIdx = undefined;

                        if (guest_name !== data.display_name) {
                            idx = idx + 1;
                            $('#rsvp-group').append(create_individual_card(idx));
                            $('#rsvp-name-' + idx).html(create_name_field(guest_name, rowIdx, idx));
                            $('#rsvp-email-' + idx).html(create_email_input(idx));
                            $('#rsvp-diet-' + idx).html(create_diet_input(idx));
                            $('#rsvp-response-' + idx).html(create_rsvp_response_input(idx));
                        }
                    }
                    $('#rsvp-modal').modal('show');
                }
            })
            .fail(function (data) {
                $('#alert-wrapper').html(
                    alert_markup(
                        'danger',
                        '<strong>Sorry!</strong> There is some issue with the server. Please try again later.'
                        + '</br>'
                        + '<strong>對不起!</strong> 服務器出現問題，請稍後再試。'
                    )
                );
            });
    });

    /********************** RSVP Modal **********************/
    $('#rsvp-modal').on('hide.bs.modal', function (e) {
        $('#rsvp-modal-form').trigger('reset');
        $('#rsvp-lastUpdated').html('');
        $('#rsvp-group').html('');
        $('#rsvp-alert-wrapper').html('');
        $('#alert-wrapper').html('');
    });

    /********************** RSVP Submission **********************/
    $('#rsvp-modal-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();

        var allRSVPs = data.match(/rsvp-[\d]=(.)/g);
        var rsvpY = false;
        allRSVPs.forEach(function (rsvp) {
            if (rsvp.slice(-1) === 'Y') {
                rsvpY = true;
            }
            return;
        });

        $('#rsvp-alert-wrapper').html(
            alert_markup(
                'info',
                '<strong>Please wait!</strong> Submitting info.'
                + '</br>'
                + '<strong>稍等片刻!</strong> 正在提交信息。'
            )
        );

        $.post('https://script.google.com/macros/s/AKfycbxNt0nokofAbTOHcIEnZnHrq_C9yXjzq_wDjbzUx_8Xfc_u9yeRlbivP9rB7Sd5YhsX/exec', data)
            .done(function (data) {
                if (data.result === "error") {
                    $('#rsvp-alert-wrapper').html(alert_markup('danger', data.message));
                } else {
                    $('#rsvp-modal-form').modal('hide');
                    $('#rsvp-modal').modal('hide');

                    if (rsvpY) {
                        $('#thankyou-modal').modal('show');
                    } else {
                        $('#missyou-modal').modal('show');
                    }
                }
            })
            .fail(function (data) {
                $('#alert-wrapper').html(
                    alert_markup(
                        'danger',
                        '<strong>Sorry!</strong> There is some issue with the server. Please try again later.'
                        + '</br>'
                        + '<strong>對不起!</strong> 服務器出現問題，請稍後再試。'
                    )
                );
            });
    });
});

/********************** Extras **********************/

// Google map
function initMap() {
    var location = { lat: 22.2926668, lng: 114.1696784 };
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: location,
        scrollwheel: false
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function initBBSRMap() {
    var location = { lat: 22.2926668, lng: 114.1696784 };
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: la_fiesta,
        scrollwheel: false
    });

    var marker = new google.maps.Marker({
        position: la_fiesta,
        map: map
    });
}

// alert_markup
function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}

// inject last updated time
function update_lastUpdated(lastUpdated) {
    var lastUpdated_JSDate = new Date(lastUpdated);
    var options = { dateStyle: 'medium', timeStyle: 'short' };
    return '<div class="col-md-12 col-sm-12 text-right">'
        + 'Last updated: ' + lastUpdated_JSDate.toLocaleString('en-US', options)
        + '</div>'
        + '<div class="col-md-12 col-sm-12 text-right">'
        + '最後更新: ' + lastUpdated_JSDate.toLocaleString('zh-HK', options)
        + '</div>'
        + '<p></p>';
}

// inject rsvp ccount
function update_maxSize(rsvpMaxSize) {
    return '<div class="col-md-12 col-sm-12 text-left">'
        + 'We have reserved <b>' + rsvpMaxSize + '</b> seat(s) in your honor.'
        + '</div>'
        + '<div class="col-md-12 col-sm-12 text-left">'
        + '我們為您保留了<b>' + rsvpMaxSize + '</b>個席位。'
        + '</div>';
}

// inject last updated time
function create_individual_card(idx) {
    return '<hr>'
        + '<div id="rsvp-guest-' + idx + '">'
        + '<div class="row"><div id="rsvp-name-' + idx + '"></div></div>'
        + '<div class="row"><div id="rsvp-email-' + idx + '"></div></div>'
        + '<div class="row"><div id="rsvp-diet-' + idx + '"></div></div>'
        + '<div class="row section-padding"><div id="rsvp-response-' + idx + '"></div></div>'
        + '</div>';
}

// inject name field. if it starts with a '!' this indicates the name should be left blank to be filled out. otherwise, it will be a readonly name field.
function create_name_field(name, rowIdx, idx) {
    var displayOrFillInput = '';
    if (name.startsWith('!')) {
        displayOrFillInput = '<input name="fill_name-' + idx + '" type="text" class="" placeholder="Name | 姓名">';
    } else {
        displayOrFillInput = '<input name="display_name-' + idx + '" type="text" class="" value="' + name + '" required readonly disabled>';
    }
    return '<div class="col-md-12 col-sm-12">'
        + '<div class="form-input-group">'
        + '<i class="fa fa-user"></i>'
        + displayOrFillInput
        + '<input name="rowIdx-' + idx + '" type="text" class="" value=' + rowIdx + ' readonly hidden>'
        + '<input name="name-' + idx + '" type="text" class="" value="' + name + '" readonly hidden>'
        + '</div>'
        + '</div>';
}

// create email input
function create_email_input(idx) {
    return '<div class="col-md-12 col-sm-12">'
        + '<div class="form-input-group">'
        + '<i class="fa fa-envelope"></i>'
        + '<input name="email-' + idx + '" type="email" class="" placeholder="E-mail | 電郵" autocomplete="email">'
        + '</div>'
        + '</div>';
}

// create dietary restrictions input
function create_diet_input(idx) {
    return '<div class="col-md-12 col-sm-12">'
        + '<div class="form-input-group">'
        + '<i class="fa fa-cutlery"></i>'
        + '<input name="diet-' + idx + '" type="text" class="" placeholder="Dietary restrictions | 飲食限制">'
        + '</div>'
        + '</div>';
}

// create dietary restrictions input
function create_rsvp_response_input(idx) {
    var customErrMsg = "'Please choose to accept or decline. | 請選擇接受或拒絕。'";
    var clickHandler = "this.form[ this.name ][0].setCustomValidity('')";
    return '<label class="radio-inline"><input type="radio" id="rsvp-response-accept-' + idx + '" name="rsvp-' + idx + '" value="Y" required oninvalid="setCustomValidity(' + customErrMsg + ')" onclick="setCustomValidity(\'\')">Accept | 接受</label>'
        + '<label class="radio-inline"><input type="radio" id="rsvp-response-decline-' + idx + '" name="rsvp-' + idx + '" value="N" required onclick="' + clickHandler + '">Decline | 拒絕</label>';
}

// MD5 Encoding
var MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return (x ^ y ^ z);
    }

    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
};