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


app.request = nameToSend =>{
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


app.spaceToPlus = givenSong => {
    (givenSong[0] === ' ') ? app.request(givenSong.replace(' ', ''))
    : app.request(givenSong.replace(' ', '+'));
};


app.masterCallback = songName => {app.spaceToPlus(songName)};
app.masterCallback('Icon');

app.geniusOptions = {
    method:'GET',
    headers: new Headers({
        'User-Agent': 'CompuServe Classic/1.22',
        'Accept': 'application/json',
        'Authorization': 'vHCLxBbQPd1oxjkXzOep8GmrcwbefBLtCo17yp_0oWUgg0sHEUF9mPmFJ3apQFaZ'
    })
};

app.geniusTokenOptions = {
    url: 'https://api.genius.com/oauth/authorize?',
    client_id: 'client_id=b7e880K0QC9MIO774s35GNiB66aKZejAqghmRTdgmB5NGlUGU58qhotYoebJibB1'+'&',
    headers:{
        'Content-Type':"application/json"
    },
    redirect_uri: `redirect_uri=${encodeURIComponent(`http://127.0.0.1:8080`)}&`,

    parseToUrl: () => {
        //https://YOUR_REDIRECT_URI/?code=CODE&state=SOME_STATE_VALUE
        return `${app.geniusTokenOptions.redirect_uri}?${app.tokenOptions.client_id}&${app.tokenOptions.redirect_uri}&${app.tokenOptions.response_type}`
    }
};

fetch('https://api.genius.com/artists/16775', app.geniusOptions)
    .then(result => console.log(result))
