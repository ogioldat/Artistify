window.onscroll = function() {scrollFunction()};

function scrollFunction(){
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("header").style.padding = "10px 10px";
        document.getElementById("logo").style.fontSize = "25px";
      } else {
        document.getElementById("header").style.padding = "80px 10px";
        document.getElementById("logo").style.fontSize = "35px";
      }
      console.log("działa");
}

//https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow

const app = {};

app.apiKey = 'c7236ae5231e4ef992670b2889beb6d7';
app.token = 'BQCfhddvvT6VMp2Uocv-9OikfTk-zk2jkaYEwte6HhT41jDMUPSGDLheGtDJttKKo2bxSyf122YoVkT3_lnbyI5QX_daRZX5wbg8Hyu1v6xeDzRao4As17Ufdc1v8wtHTPvZ_z1TvR9VcibLz-RMaOmkYqZv-LQ';
//https://developer.spotify.com/console/get-artist/?id=

app.tokenOptions = {
    grant_type:''
}

app.tokenRefresh = token => {
    fetch(`https://accounts.spotify.com/api/${token}`, {
        method:'POST',
        body: 'application/x-www-form-urlencoded as defined'
    })
        .then()
};


app.requestOptions = {
    method:"GET",
    headers: new Headers({
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${app.token}`
    })
};


app.request = nameToSend =>{
    fetch(`https://api.spotify.com/v1/search?q=${nameToSend}&type=track&limit=5`,app.requestOptions)
        .then(response => response.json()
            .then(data => {
                if(response.status===401) app.tokenRefresh(app.token);
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



