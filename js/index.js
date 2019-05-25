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
// app.tokenOptions = {
//     url: 'https://accounts.spotify.com/en/authorize',
//     client_id: 'client_id=6021202dc4a242109a7f7629cb971347',
//     headers:{
//         'Content-Type':"application/json"
//     },
//     response_type: 'response_type=token',
//     redirect_uri: `redirect_uri=${encodeURIComponent(`http://127.0.0.1:8080`)}`,
//
//     parseToUrl: () => {
//         return `${app.tokenOptions.url}?${app.tokenOptions.client_id}&${app.tokenOptions.redirect_uri}&${app.tokenOptions.response_type}`
//     }
// };
//
// app.urlRegExp = /[0-9a-zA-Z!@#$%^&*./=+_-]access_token[0-9a-zA-Z!@#$%^&*./=+_-]/;
//
//     if(!(app.urlRegExp.test(window.location.href))){
//             window.location = app.tokenOptions.parseToUrl();
//             app.tokenCode();
//     }
//
// app.tokenCode = () => {
//     let tokenSearch = window.location.href;
//     let tokenStart = tokenSearch.substr(tokenSearch.indexOf('access_token')+13,tokenSearch.length);
//     return tokenStart.substr(0,tokenStart.indexOf('&'));
// };
//
// app.requestOptions = {
//     method:"GET",
//     headers: new Headers({
//         "Accept":"application/json",
//         "Content-Type":"application/json",
//         "Authorization":`Bearer ${app.tokenCode()}`
//     })
// };

//
// app.spotifyRequest = nameToSend =>{
//     fetch(`https://api.spotify.com/v1/search?q=${nameToSend}&type=track&limit=5`,app.requestOptions)
//         .then(response => response.json()
//             .then(data => {
//                 console.log(data);
//             })
//             .then(data =>({
//                 data: data,
//                 status: response.status
//             }))
//             .then(res => {
//                     if(response.status==401)window.location = app.tokenOptions.parseToUrl();
//                 }
//             )
//         )
//
//         .catch(error => console.error(error));
// };



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
        app.appendToDom(data);
    }))
    .catch(error => console.error(error));
};

app.masterCallback = givenSong => {
    if(givenSong[0] === ' ') {
        //app.spotifyRequest(givenSong.replace(' ', ''));
        app.geniusRequest(givenSong.replace(' ', ''));
    }else {
        //aapp.spotifyRequest(givenSong.replace(' ', '+'));
        app.geniusRequest(givenSong.replace(' ', '+'));
    }
};

app.artistToAppend = description => {
    let schemeMain = `<div id="artist-photo"></div>
                <h4 class="artist-name">${description.artist.name}</h4>`;
    document.getElementById('bar1').innerHTML = schemeMain;
    document.getElementById('artist-photo').style.backgroundImage = `url(${description.artist.image_url})`;

    const pseudo = document.getElementById('artist-pseudo');
    if(pseudo.childNodes) pseudo.innerHTML='';

    for(alternative in description.artist.alternate_names){
        let shcemeAlt = `<div> - ${description.artist.alternate_names[alternative]}</div>`;
        document.getElementById('artist-pseudo').innerHTML += shcemeAlt;
    }

};

app.artistDetailsRequest = (artistId) =>{
    fetch(`https://api.genius.com${artistId}?access_token=${app.geniusOptions.token}`)
        .then(response => response.json()
            .then(artistData => {
                app.artistToAppend(artistData.response);
            }))
        .catch(error => console.error(error));
};


app.songDataAppend = toAppend =>{

    const parent = document.getElementById('bar2');

    if(parent.childNodes) parent.innerHTML='';

    if(toAppend.response.song.album===null) var albumTitle = '(NO ALBUM)';
    else albumTitle = toAppend.response.song.album.name;

    console.log(toAppend)
    let songScheme = `<div class="center">
                    <div class="center s-n-a">
                        <h4>Song</h4>
                        <a id="song-name">${toAppend.response.song.title}</a>
                    </div>

                    <div id="song-t-a" class="song-n-album"></div>
                </div>`;

    let albumScheme = `<div class="center">
                    <div class="center s-n-a">
                        <h4>Album</h4>
                        <a id="album-name">${albumTitle}</a>
                    </div>
                    
                    <div id="album-t-a" class="song-n-album"></div>
                </div>`;

    parent.innerHTML = songScheme;
    document.getElementById('song-t-a').style.backgroundImage = `url(${toAppend.response.song.song_art_image_url})`;
    document.getElementById('listen-yt').href = toAppend.response.song.media[0].url;
    document.getElementById('listen-sc').href = toAppend.response.song.media[1].url;
    parent.innerHTML += albumScheme;
    document.getElementById('album-t-a').style.backgroundImage = `url(${toAppend.response.song.album.cover_art_url})`;
};




app.songDetailsRequest = apiPath => {
    fetch(`https://api.genius.com${apiPath}?access_token=${app.geniusOptions.token}`)
        .then(response => response.json()
            .then(songData => {
                app.songDataAppend(songData);
            }))
        .catch(error => console.error(error));
};




app.appendToDom = data => {
    const appendDiv = document.getElementById('result-container');
    if(appendDiv.childNodes) appendDiv.innerHTML='';

    if(data.response.hits.length!==0){
        for(let i=0; i<data.response.hits.length; i++){
            function threeDots(word) {
                if(word.length>15) return `${word.substr(0,15)}...`;
                return word;
            }

            let scheme = `<div class="result-input">
                        <div class="r-i-image" id=image-${i}></div>
                        <a class="category-name">TITLE:</a><div class="r-i-title">${threeDots(data.response.hits[i].result.title)}</div>
                        <a class="category-name">ARTIST:</a><div class="r-i-artist">${threeDots(data.response.hits[i].result.primary_artist.name)}</div>
                    </div>`;

            appendDiv.innerHTML += scheme;
            document.getElementById(`image-${i}`).style.backgroundImage = `url('${data.response.hits[i].result.song_art_image_thumbnail_url}')`;
        }
    }else {
        document.getElementById('result-container').innerHTML =`<div id="error-div" class="center">NO MATCHING RESULTS FOUND</div>` ;
    }

    const resultTab = document.querySelectorAll('.result-input');
    resultTab.forEach((element,index) => {
        element.addEventListener('click',function () {
            app.songDetailsRequest(data.response.hits[index].result.api_path);
            app.artistDetailsRequest(data.response.hits[index].result.primary_artist.api_path);
        })
    });
};

const button = document.getElementById('browse');
button.addEventListener('click', (e) => {
    app.masterCallback(document.getElementById('search').value);
});



















