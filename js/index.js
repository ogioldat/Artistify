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

const app = {};

app.apiKey = 'c7236ae5231e4ef992670b2889beb6d7';

//https://developer.spotify.com/console/get-artist/?id=

app.requestOptions = {
    method:"GET",
    headers: new Headers({
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":"Bearer BQCfhddvvT6VMp2Uocv-9OikfTk-zk2jkaYEwte6HhT41jDMUPSGDLheGtDJttKKo2bxSyf122YoVkT3_lnbyI5QX_daRZX5wbg8Hyu1v6xeDzRao4As17Ufdc1v8wtHTPvZ_z1TvR9VcibLz-RMaOmkYqZv-LQ"
    })
};


app.request = nameToSend =>{
    fetch(`https://api.spotify.com/v1/search?q=${nameToSend}&type=track&limit=5`,app.requestOptions)
        .then(response => response.json()
            .then(data =>({
                data: data,
                status: response.status
            }))
            .then(res => console.log(res.data))
        )

        .catch(error => console.error(error));
};


app.spaceToPlus = givenSong => {
    (givenSong[0] === ' ') ?  app.request(givenSong.replace(' ', ''))
    : app.request(givenSong.replace(' ', '+'));
};


app.masterCallback = songName => {app.spaceToPlus(songName)};
app.masterCallback('Icon');



