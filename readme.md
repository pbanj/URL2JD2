# URL2JD2 - A Firefox extension

Push a url from the address bar or a link (right-click) to JDownloader2's Linkgrabber.

This addons uses the remote control API (externInterface: Flashgot) from JDownloader2.

Was made mainly for use with [docker-jdownloader-2](https://github.com/jlesage/docker-jdownloader-2)

## Prerequisites
- Install [JDownloader2](http://beta.jdownloader.org/).
- Go into Settings, Then Into advanced and search "RemoteAPI".
- Change the value of "Authorized Websites" to match the url/ip of your server must look like: ["address"]  

![example](https://github.com/pbanj/URL2JD2/assets/17306233/52aa7a31-c954-46c4-aa75-96bc1441fde1)  
- Uncheck "will listen on localhost only"

## Usage:  
- Install the [Add-on](https://addons.mozilla.org/en-US/firefox/addon/url2jd2/) 
- After install go to the addon and set your server address in the options. Referer should match the server address

![Example](https://github.com/pbanj/URL2JD2/assets/17306233/44233b1e-be62-4a78-9646-e279695466b5)

- Highlight a link if not clickable and right click, or right click on link and then click "Send to JD2"

## Things added by the extension:  
- A "pageAction" (A clickable icon in the address bar).  

![image](https://github.com/pbanj/URL2JD2/assets/17306233/c99b0882-fa7e-4c42-827c-279fea795e20)  

- An item in the context menu  
![menu](https://github.com/pbanj/URL2JD2/assets/17306233/4cfb5c61-768f-4b31-96f3-586491d2f2e7)



## Acknowledgments:  
- Original Source [UrlToJD2](https://framagit.org/GTeam/urltojd2)  
- Xnoe [Option Menu Source](https://git.xnopyt.com/xnoe/urltojd2)  
- Icon: [clipartmax](https://www.clipartmax.com/middle/m2H7i8d3K9A0H7i8_this-looks-like-the-earth-jdownloader-icon-svg/)

## Licence:  
This project is licensed under the Mozilla Public License, version 2.0

