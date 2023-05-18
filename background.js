let JD2_API_URL = window.localStorage.getItem("jd2_api_url") ?? 'http://localhost:9666/flashgot?';
let JD2_REFERER = window.localStorage.getItem("jd2_referer") ?? 'localhost';
let JD2_MATCH_URL = window.localStorage.getItem("jd2_match_url") ?? "*://*/flashgot?*";

// menu
const mnGrabberId = "JD2Grabber"


function onError(error) {
    console.log('URL2JD2 background error: ' + error);
}

function onCreated() {
    if (browser.runtime.lastError) {
      onError(browser.runtime.lastError);
    }
}

function makeRequest(url) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.send(null);
    req.onerror = function () {
        onError('Is JD2 on and ready ?');
    }
    req.onload = function () {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            // console.log(req.responseText);
            // notify...
        } else {
            onError(req.statusText);
        }
    }
}

function urlConstruct(url, autostart) {
    return JD2_API_URL + "autostart=" + autostart + "&urls=" + encodeURIComponent(url);
}

// Return an url from a text, good enought :-)
function linkify(text) {
    let urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let url = text.match(urlRegex);
    return (url === null) ? '' : url[0];
}

// MENU 
browser.menus.create({
    id: mnGrabberId,
    title: "Linkgrabbler",
    contexts: ["link", "selection"],
    icons: {
        "16": "icons/16.png",
        "32": "icons/32.png"
    }
}, onCreated);


// Choose from info (object menus.OnClickData)
// linkUrl over selectionText
// return link or ''
function infoToUrl(info){
    var url = '';
    if (typeof info.linkUrl !== 'undefined'){
        url = info.linkUrl;
    } else {
        if (typeof info.selectionText !== 'undefined'){
        url = linkify(info.selectionText);
        }
    }
    return url;
}

browser.menus.onClicked.addListener((info, tab) => {
    var url = infoToUrl(info);
    if (url !== ''){
        switch (info.menuItemId){
            case mnGrabberId:
                url_for_JD2 = urlConstruct(url, 0);
                break;
        }
        // console.log(url);
        // console.log(url_for_JD2);
        makeRequest(url_for_JD2);
    }
});

function updateMenuItem(url) {
    browser.menus.update(mnGrabberId, {
        title: 'Send To JD2'
    });
    browser.menus.refresh();
}

function allMenusVisible(visible){
    browser.menus.update(mnGrabberId, {
        visible: visible
    });
}

browser.menus.onShown.addListener(info => {
    var url = infoToUrl(info);
    // console.log(url);
    if (url !== ''){
        allMenusVisible(true);
        updateMenuItem(url);
        return;
    } else {
        allMenusVisible(false);
        browser.menus.refresh();
    }
});

// Handle message from 'popup'
function handleMessageFromPopup(request, sender, sendResponse) {
  if (request.message == "refresh") {
    JD2_API_URL = window.localStorage.getItem("jd2_api_url");
    JD2_REFERER = window.localStorage.getItem("jd2_referer");
    JD2_MATCH_URL = window.localStorage.getItem("jd2_match_url");
  } else {
    let forJD2link = urlConstruct(request.jd2url, request.jd2action);
    makeRequest(forJD2link);
    return Promise.resolve({response: "done"});
  }
}
browser.runtime.onMessage.addListener(handleMessageFromPopup);


// Some functions for a good referer !

// https://stackoverflow.com/a/11602753
function mod_headers(header_array, p_name, p_value) {
    var did_set = false;
    for (var i in header_array) {
        var header = header_array[i];
        var name = header.name;
        // var value = header.value;
        // If the header is already present, change it:
        if (name == p_name) {
            header.value = p_value;
            did_set = true;
        }
    }
    // if it is not, add it:
    if (!did_set) { header_array.push({ name: p_name, value: p_value }); }
}

function rewriteHeader(e) {
    mod_headers(e.requestHeaders, 'Referer', JD2_REFERER);
    // for (var header of e.requestHeaders) { console.log(header.name + '::' + header.value); }
    return { requestHeaders: e.requestHeaders };
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteHeader,
    { urls: [JD2_MATCH_URL] },
    ["blocking", "requestHeaders"]
);