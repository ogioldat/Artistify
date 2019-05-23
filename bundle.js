(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.onscroll = function() {scrollFunction()};

function scrollFunction(){
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("header").style.padding = "10px 10px";
        document.getElementById("logo").style.fontSize = "25px";
      } else {
        document.getElementById("header").style.padding = "80px 10px";
        document.getElementById("logo").style.fontSize = "35px";
      }
}

//https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
//https://www.hongkiat.com/blog/node-js-server-side-javascript/
 const app = {};
//https://www.youtube.com/watch?v=f5OLDvwP-Ug
//https://developer.spotify.com/console/get-artist/?id=
//base64 c7236ae5231e4ef992670b2889beb6d7:39989bd86c8a44e9af3f0470cb9e9270
//https://feel-music.com



app.tokenOptions = {
    url: 'https://accounts.spotify.com/authorize',
    client_id: 'client_id=c48bf293c8c341908c1283e89a797670',
    headers:{
        'Content-Type':"application/json"
    },
    response_type: 'response_type=token',
    redirect_uri: `redirect_uri=${encodeURIComponent(`http://127.0.0.1:8080/index.html`)}`,

    parseToUrl: () => {
        return `${app.tokenOptions.url}?${app.tokenOptions.client_id}&${app.tokenOptions.redirect_uri}&${app.tokenOptions.response_type}`
    }
};
console.log();

    if(window.location.href == "http://127.0.0.1:8080/index.html"){
        (function redirectForToken(){
            window.location = app.tokenOptions.parseToUrl();
        })()
    };



//
// fetch("https://accounts.spotify.com/api/token", {
//     body: "grant_type=client_credentials",
//     headers: {
//         Authorization: "Basic YzcyMzZhZTUyMzFlNGVmOTkyNjcwYjI4ODliZWI2ZDc6Mzk5ODliZDg2YzhhNDRlOWFmM2YwNDcwY2I5ZTkyNzA=",
//         "Content-Type": "application/x-www-form-urlencoded"
//     },
//     method: "POST"
// })
//     .then(success => console.log(success))




// app.tokenRefresh = () => {
//     fetch("https://accounts.spotify.com/api/token", {
//         body: "grant_type=client_credentials",
//         mode: 'no-corps',
//         headers: {
//             Authorization: "Basic YzcyMzZhZTUyMzFlNGVmOTkyNjcwYjI4ODliZWI2ZDc6Mzk5ODliZDg2YzhhNDRlOWFmM2YwNDcwY2I5ZTkyNzA=",
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         method: "POST"
//     })
//         .then(result => console.log(result));
// };
//
// app.tokenRefresh();

//
// app.requestOptions = {
//     method:"GET",
//     headers: new Headers({
//         "Accept":"application/json",
//         "Content-Type":"application/json",
//         "Authorization":`Bearer ${app.token}`
//     })
// };
//
//
// app.request = nameToSend =>{
//     fetch(`https://api.spotify.com/v1/search?q=${nameToSend}&type=track&limit=5`,app.requestOptions)
//         .then(response => response.json()
//             .then(data => {
//                 if(response.status===401) app.tokenRefresh(app.token);
//             })
//             .then(data =>({
//                 data: data,
//                 status: response.status
//             }))
//             .then(res => console.log(res.data))
//         )
//
//         .catch(error => console.error(error));
// };
//
//
// app.spaceToPlus = givenSong => {
//     (givenSong[0] === ' ') ? app.request(givenSong.replace(' ', ''))
//     : app.request(givenSong.replace(' ', '+'));
// };
//
//
// app.masterCallback = songName => {app.spaceToPlus(songName)};
// app.masterCallback('Icon');
//
//
//

},{}]},{},[1]);
