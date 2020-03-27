const app = {};


const input = document.getElementById('search');
const resultContainer = document.getElementById('result-container');
input.focus();
const topBar = document.getElementById('top-bar');
topBar.className = ' animation-top-bar';
const searchBar = document.querySelector('.res-animation');
const elements = document.querySelectorAll('#bar3,#bar2,#bar4');
elements.forEach(el => {
    el.className += ' animation-divs';
});

const loaderScheme = `<div class="lds-spinner">
<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div>`;
const loaderSchemeBlack = `<div class="lds-spinner-black">
<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div>`;

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

app.geniusOptions = {
    clent_id: '',
    token: '',
    //vHCLxBbQPd1oxjkXzOep8GmrcwbefBLtCo17yp_0oWUgg0sHEUF9mPmFJ3apQFaZ
};

app.geniusRequest = (nameToSend) => {
    fetch(`https://api.genius.com/search?q=${nameToSend}&access_token=${app.geniusOptions.token}`)
.then(response => response.json()
    .then(data => {
        resultContainer.className = '';
        app.appendToDom(data);
    }))
    .catch(error => console.error(error));
};

app.masterCallback = givenSong => {
    resultContainer.innerHTML = loaderSchemeBlack;
    resultContainer.className = 'center';
    searchBar.className = 'result-bg-div';
    if(givenSong[0] === ' ') {
        app.geniusRequest(givenSong.replace(' ', ''));
    }else {
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

    if(description.artist.alternate_names.length===0) {
        let schemeAlt = `<div>(NO ALTERNATIVE NAMES)</div>`;
        document.getElementById('artist-pseudo').innerHTML += schemeAlt;
    }

    for(alternative in description.artist.alternate_names){
        let schemeAlt = `<div> - ${description.artist.alternate_names[alternative]}</div>`;
        document.getElementById('artist-pseudo').innerHTML += schemeAlt;
    }
    
    topBar.style.backgroundImage = description.artist.header_image_url;
    
    document.getElementById('search').focus();
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
	console.log(toAppend);
    const links = document.getElementById('links');
    links.innerHTML ='';
    const parent = document.getElementById('bar2');
    if(parent.childNodes) parent.innerHTML='';

    if(toAppend.response.song.album===null) var albumTitle = '(NO ALBUM)';
    else albumTitle = toAppend.response.song.album.name;

    let songScheme = `<div class="center">
                    <div class="center s-n-a">
                        <h4>Song</h4>
                        <a id="song-name">${toAppend.response.song.title}</a>
                    </div>

                    <div id="song-t-a" class="song-n-album" ></div>
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
    parent.innerHTML += albumScheme;
    if(toAppend.response.song.album !== null) {
        document.getElementById('album-t-a').style.backgroundImage = `url(${toAppend.response.song.album.cover_art_url})`;
    }

    function scheme(name,index) {
        let scheme = `<div>
                  <a href=${toAppend.response.song.media[index].url} target="_blank" id=${name} class="as">
                    <img src=img/${name}.png class="image-hide">
                  </a>
                     </div>`;
        return links.innerHTML += scheme;
    }

    if(!(toAppend.response.song.media.length===0)){

    for(let i = 0; i<toAppend.response.song.media.length; i++){
        if (toAppend.response.song.media[i].provider === 'youtube') scheme('youtube',i);
        else if (toAppend.response.song.media[i].provider === 'spotify') scheme('spotify',i);
        else if (toAppend.response.song.media[i].provider ==='soundcloud')scheme('soundcloud',i);
    }
    }
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
    const appendDiv = resultContainer;
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
        resultContainer.innerHTML =`<div id="error-div" class="center">NO MATCHING RESULTS FOUND</div>` ;
    }

    const resultTab = document.querySelectorAll('.result-input');
    resultTab.forEach((element,index) => {
        element.addEventListener('click',function () {
            document.getElementById('bar1').innerHTML = loaderScheme;
            document.getElementById('bar2').innerHTML = loaderScheme;
            topBar.className -= 'animation-top-bar';

            setTimeout(function () {
                app.songDetailsRequest(data.response.hits[index].result.api_path);
                app.artistDetailsRequest(data.response.hits[index].result.primary_artist.api_path);

                elements.forEach(el => {
                    el.className -= ' animation-divs';
                });
                document.getElementById('bar2').className = 'center';
            },500);
        })
    });
};

const button = document.getElementById('browse');
button.addEventListener('click', (e) => {
	if(input.value) app.masterCallback(document.getElementById('search').value);
});

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        app.masterCallback(document.getElementById('search').value);
    }
});
