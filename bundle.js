(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const app = {};

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


//base64 c7236ae5231e4ef992670b2889beb6d7:39989bd86c8a44e9af3f0470cb9e9270
//
app.tokenOptions = {
    url: 'https://accounts.spotify.com/en/authorize',
    client_id: 'client_id=6021202dc4a242109a7f7629cb971347',
    headers:{
        'Content-Type':"application/json"
    },
    response_type: 'response_type=token',
    redirect_uri: `redirect_uri=${encodeURIComponent(`http://127.0.0.1:8080`)}`,

    parseToUrl: () => {
        return `${app.tokenOptions.url}?${app.tokenOptions.client_id}&${app.tokenOptions.redirect_uri}&${app.tokenOptions.response_type}`
    }
};

app.urlRegExp = /[0-9a-zA-Z!@#$%^&*./=+_-]access_token[0-9a-zA-Z!@#$%^&*./=+_-]/;

    if(!(app.urlRegExp.test(window.location.href))){
            window.location = app.tokenOptions.parseToUrl();
            app.tokenCode();
    }

app.tokenCode = () => {
    let tokenSearch = window.location.href;
    let tokenStart = tokenSearch.substr(tokenSearch.indexOf('access_token')+13,tokenSearch.length);
    return tokenStart.substr(0,tokenStart.indexOf('&'));
};

app.requestOptions = {
    method:"GET",
    headers: new Headers({
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${app.tokenCode()}`
    })
};


app.spotifyRequest = nameToSend =>{
    fetch(`https://api.spotify.com/v1/search?q=${nameToSend}&type=track&limit=5`,app.requestOptions)
        .then(response => response.json()
            .then(data => {
                console.log(data);
            })
            .then(data =>({
                data: data,
                status: response.status
            }))
            .then(res => console.log(res.data))
        )

        .catch(error => console.error(error));
};



app.geniusOptions = {
    clent_id: 'b7e880K0QC9MIO774s35GNiB66aKZejAqghmRTdgmB5NGlUGU58qhotYoebJibB1',
    token: 'pc7b7hIek5I0TXyg1jrVXjQ6GYawyqueWiCIdbXJMVyQiy557bU_NJhDekLy6x9I',
    //vHCLxBbQPd1oxjkXzOep8GmrcwbefBLtCo17yp_0oWUgg0sHEUF9mPmFJ3apQFaZ
    method:'GET',
    headers: new Headers({
        'User-Agent': 'CompuServe Classic/1.22',
        'Accept': 'application/json',
        'Host': 'api.genius.com',
        'Authorization': 'Bearer pc7b7hIek5I0TXyg1jrVXjQ6GYawyqueWiCIdbXJMVyQiy557bU_NJhDekLy6x9I'
    })
};
//https://api.genius.com/songs/378195?access_token=5ukOINdwfTjaIDB-In2HNlViZE--WrPr6SQYr5zESO7VFoVxSjq66txkl7B0hkgP
//https://api.genius.com/search?q=${nameToSend}&access_token=${app.geniusOptions.token}
//3282964
//3059742
//441102
app.geniusRequest = (nameToSend) => {
    fetch(`https://api.genius.com/search?q=${nameToSend}&access_token=${app.geniusOptions.token}`)
.then(response => response.json()
    .then(data => {
        console.log(data);
    })
    .then(data =>({
        data: data,
        status: response.status
    }))
    .then(res => console.log(res.data))
)

    .catch(error => console.error(error));
}



app.masterCallback = givenSong => {
    if(givenSong[0] === ' ') {
        app.spotifyRequest(givenSong.replace(' ', ''));
        app.geniusRequest(givenSong.replace(' ', ''));
    }else {
        app.spotifyRequest(givenSong.replace(' ', '+'));
        app.geniusRequest(givenSong.replace(' ', '+'));
    }
};


app.masterCallback('Icon');
},{}]},{},[1]);
