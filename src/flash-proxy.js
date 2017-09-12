window.doAction = function (action, callback, data, signed, cacheId) {

    //console.log("doAction: " + action + "," + callback + "," + data);
    if (action == 'isReady') {
        thisMovie('golacoswf')[callback]();
        return;
    }

    //Google tracking
    if (_gaq) {
        _gaq.push(['_trackEvent', 'Interaction', action, window.idSocialNetwork]);
        _gaq.push(['_trackPageview', action]);
    }

    //Facebook tracking
    if (fbq) {
        fbq('track', action);
        if (action == 'User/Create') {
            fbq('track', 'CompleteRegistration');
        }
    }

    if (action == 'userData') {
        //console.log(window.IdCountry + ',' + window.IdState + ',' + window.IdCity +',' + window.email);
        thisMovie('golacoswf')[callback]({
            signature: window.token,
            socialNetwork: window.socialNetwork,
            idSocialNetwork: window.idSocialNetwork,
            userName: window.userName,
            profile: window.profile,
            picture: window.picture,
            gender: window.gender,
            email: window.email,
            locale: window.locale,
            refCode: window.refCode,
            refUrl: window.refUrl,
            idCountry: window.IdCountry,
            idState: window.IdState,
            idCity: window.IdCity,
            consecutiveDays: window.ConsecutiveDays,
            firstLogin: window.firstLogin,
            events: window.teamEvents
        });
        return;
    } else if (action == 'friends') {
        thisMovie('golacoswf')[callback]({ friends: window.friends });
        return;
    } else if (action == 'invite') {
        FB.ui({
            method: 'apprequests',
            message: data.message,
            filters: ['app_non_users'],
            data: { "ref_user": idSocialNetwork }
        }, thisMovie('golacoswf')[callback]);

        return;
    } else if (action == 'share') {
        FB.ui({
            method: 'feed',
            link: data.link ? data.link : baseUrl,
            name: data.name,
            picture: data.picture,
            caption: data.caption,
            description: data.description
        }, thisMovie('golacoswf')[callback]);
        return;
    } else if (action == 'buyCredits') {
        buy();
        return;
    } else if (action == 'buyMoney') {
        buy('Money');
        return;
    } else if (action == 'mozca') {
        buy();
        mozca();
        return;
    } else if (action == 'support') {
        if (idApplication == 1)
            helpdesk();
        else
            Support();
        return;
    } else if (action == 'showLike') {
        showLike();
        return;
    } else if (action == 'showLikeEi') {
        showLikeEi();
        return;
    }
    else if (action == "showLikeViajanet") {
        showLikeViajanet();
        return;
    }
    else if (action === "uploadPhoto") {
        $.ajax({
            url: baseUrl + "team/PostOnAlbum",
            type: "POST",
            data: {
                t: FB.getAuthResponse()['accessToken'],
                imageData: data.pngData64,
                message: data.message
            },
            success: function (resp) {
                if (callback) thisMovie('golacoswf')[callback](resp.data);
            }
        });
        return;
    }
    else if (action == "showSwapmob") {
        showSwapmob(data.url);
        return;
    }
    else if (action == "FBOffers") {
        //OffersFacebookCredits();
        TrialPayOfferWall(window.appId, window.TrialPayVendorId);
        return;
    }
    else if (action == "EiPromo") {
        window.open('http://novidade.esporteinterativo.com.br/?source=golacospl', '_blank');
        return;
    }
    else if (action == "Manual") {
        Manual();
        return;
    }
    else if (action == "ClearLocalStorage") {
        localStorage.clear();
    }

    var d = {};
    d.locale = window.locale;
    if (data) d.data = data;
    if (signed) {
        // d.signature = window.token;
        d.idSocialNetwork = window.idSocialNetwork;
        d.socialNetwork = window.socialNetwork;
    }
    if (cacheId) d.v = cacheId;

    //old banner code
    /*
    if (window.banner && window.banner == 1 && window.idApplication == 1) {
    //mostrando banner do patrocinador no minimo de 15 em 15s
    if (localStorage.getItem('dateNowAdd15s') == null) {
    $('#iframe').attr('src', 'http://a.komoona.com/p?p=663b8a10ecfd31a69831e8dd9dd86438&v=1.74&f=true');
    //document.getElementById('iframe').contentDocument.location.reload(true);
    localStorage.setItem('dateNowAdd15s', new Date().getTime() + 15000);
    }
    else {
    if (new Date().getTime() > localStorage.getItem('dateNowAdd15s')) {
    $('#iframe').attr('src', 'http://a.komoona.com/p?p=78b0bc9af2599ae7c257b84382f3c07a&v=1.74&f=true');
    //document.getElementById('iframe').contentDocument.location.reload(true);
    localStorage.setItem('dateNowAdd15s', new Date().getTime() + 15000);
    }
    }
    }
    */
    //mostrando banner do patrocinador no minimo de 15 em 15s
    if (window.idApplication == 1) {

        if (localStorage.getItem('dateNowAdd15s') == null)
            localStorage.setItem('dateNowAdd15s', new Date().getTime() + 15000);
        if (new Date().getTime() > localStorage.getItem('dateNowAdd15s')) {

            $('#banner_iframe').attr('src', 'https://ad.yieldmanager.com/st?ad_type=iframe&ad_size=728x90&section=401575');
            //$('#banner_iframe').attr('src', 'https://a.komoona.com/p?p=663b8a10ecfd31a69831e8dd9dd86438&v=1.74&f=true');
            //else
            //    $('#banner_iframe').attr('src', 'https://a.komoona.com/p?p=78b0bc9af2599ae7c257b84382f3c07a&v=1.74&f=true');
            //document.getElementById('banner_iframe').contentDocument.location.reload(true);
            localStorage.setItem('dateNowAdd15s', new Date().getTime() + 15000);
        }
    }

    //verifico se já existe o json no storage
    try {
        var version = 7;
        var currentVersion = localStorage.getItem('version');

        if (currentVersion == null || currentVersion != version) {
            localStorage.clear();
            localStorage.setItem('version', version);
        }

        //tirar o ultimo em alguns dias - hj: 22/08
        if (action != 'CompetitionLeague/Summary' && action != 'CompetitionLeague/Ranking' && action != 'Store/List') {
            if (localStorage.getItem(action + window.idSocialNetwork + 'Date') != null) {
                var date = new Date();
                date.setFullYear(new Date().getUTCFullYear());
                date.setMonth(new Date().getUTCMonth());
                date.setDate(new Date().getUTCDate());
                date.setHours(new Date().getUTCHours());
                date.setMinutes(new Date().getUTCMinutes());
                date.setSeconds(new Date().getUTCSeconds());
                date.setMilliseconds(new Date().getUTCMilliseconds());
                date = date.getTime();

                var dateToExpire = localStorage.getItem(action + window.idSocialNetwork + 'Date');
                dateToExpire = new Date(parseInt(dateToExpire));
                dateToExpire.setTime(dateToExpire.getTime() + dateToExpire.getTimezoneOffset() * 60 * 1000);
                var expires = dateToExpire.getTime();

                if (expires > date) {
                    if (data != null) {
                        if (!data.hasOwnProperty('SocialId') && !data.hasOwnProperty('ItemType')) {
                            thisMovie('golacoswf')[callback](JSON.parse(localStorage.getItem(action + window.idSocialNetwork)));
                            return;
                        }
                    }
                    else {
                        thisMovie('golacoswf')[callback](JSON.parse(localStorage.getItem(action + window.idSocialNetwork)));
                        return;
                    }
                }
            }
        }
    }
    catch (exception) {
        //alert('javascript1 error: ' + exception);
    }

    if (action == 'User/Verify') {
        d.refCode = window.refCode;
    }

    $.ajax({
        url: baseUrl + action,
        data: d,
        type: 'POST',
        dataType: 'json',
        cache: true,
        statusCode: {
            404: function () {
                _gaq.push(['_trackEvent', 'Erro404', action, JSON.stringify(d)]);
                thisMovie('golacoswf')[callback]({ "Success": false, "Message": "LabelJS404" });
            }
        },
        success: function (d) {
            if (d.activities) {
                $.each(d.activities, function (i, act) {
                });
            }
            if (callback) {
                try {
                    if (d.data) thisMovie('golacoswf')[callback](d.data);
                    else thisMovie('golacoswf')[callback]();

                    //gravo o json no storage.

                    if (d.data.hasOwnProperty("ExpirationDate")) {
                        if (data != null) {
                            if (!data.hasOwnProperty('SocialId') && !data.hasOwnProperty('ItemType')) {
                                localStorage.setItem(action + window.idSocialNetwork, JSON.stringify(d.data));
                                localStorage.setItem(action + window.idSocialNetwork + 'Date', d.data.ExpirationDate);
                            }
                        }
                        else {
                            localStorage.setItem(action + window.idSocialNetwork, JSON.stringify(d.data));
                            localStorage.setItem(action + window.idSocialNetwork + 'Date', d.data.ExpirationDate);
                        }
                    }
                }
                catch (exception) {
                    console.log('error: ' + exception + ' - ' + callback + '(' + d.data + ')');
                }

            }
            if (d.resize) {
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (typeof (console) != 'undefined') {
                console.log(errorThrown);
                console.log(jqXHR.responseText);
            }
            _gaq.push(['_trackEvent', 'Erro500', action, JSON.stringify(d)]);
            thisMovie('golacoswf')[callback]({ "Success": false, "Message": "LabelJSError" });
        },
        complete: function (jqXHR, textStatus) {
        }
    });
};
