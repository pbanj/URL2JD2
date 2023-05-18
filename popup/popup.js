document.addEventListener("DOMContentLoaded", function(event) {

    function onError(error) {
        console.log(`jd2 popup error: ${error}`);
    }

    const jd2UrlList = document.getElementById('jd2urlList');

    var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
    gettingActiveTab.then((tabs) => {
        if (tabs[0]) {
            var currentTabUrl = tabs[0].url;
            
            let li = document.createElement("div");
            li.classList.add("panel-list-item");
            li.setAttribute("data-href", currentTabUrl);
            li.setAttribute("jd2", "0");
            let img = document.createElement("img");
            img.src = "../icons/16.png";
            li.appendChild(img);
            let txt = document.createElement("div");
            txt.innerText = 'Send to JD2';
            li.appendChild(txt);
            jd2UrlList.appendChild(li);
            
        }
        
        var jd2SelectedAction;
        document.querySelectorAll(".panel-list-item").forEach( (elem) => {
            elem.addEventListener('click', (event) => {
                jd2SelectedAction = elem.getAttribute("jd2");
                notifyBackgroundPage(event);
            });
        });

        function handleResponse(message) {
            // console.log(`Message from the background script:  ${message.response}`);
            window.close();
        }
          
        function notifyBackgroundPage(e) {
            var sending = browser.runtime.sendMessage({
                jd2url: currentTabUrl,
                jd2action : jd2SelectedAction
            });
            sending.then(handleResponse, onError);
          }

    }, onError);
});