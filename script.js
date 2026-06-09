let currentSong = new Audio();
let songs;
async function getSong() {
    let data = await fetch("http://127.0.0.1:3000/songs/?vscode-livepreview=true");
    let response = await data.text();

    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    // console.log(as)
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/%5Csongs%5C")[1])
        }

    }
    return songs;
}
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
const playMusic = (track, pause = false) => {
    // let audio= new Audio("/%5Csongs%5C" + track);
    currentSong.src = "/%5Csongs%5C" + track;
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg"
    }

    document.querySelector(".songInfo").innerHTML = decodeURI(track);
}
async function main() {
    let songs = await getSong();
    // console.log(songs)
    playMusic(songs[0], true)

    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li> 
              
                            <img class="invert" src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/b0acb01fa88ae0753ef903b8fc45fadb5efe1c2b/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/music.svg" alt="">
                            <div class="info">
                                 ${decodeURI(song)}
                            </div>
                            <div class="play">
                                Play now 
                                <img class="invert" src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/b0acb01fa88ae0753ef903b8fc45fadb5efe1c2b/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/play.svg" alt="">
                            </div>
                        
         

    
        </li>`;
    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").innerHTML.trim())
            playMusic(e.querySelector(".info").innerHTML.trim())
        })
    })

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg";

        }
        else {
            currentSong.pause();
            play.src = "play.svg"

        }
    })
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".pointer").style.left = (currentSong.currentTime / currentSong.duration) * 100
            + "%"
    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".pointer").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0 + "%"
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left=-110+"%"
    })
    next.addEventListener("click",()=>{
        let index=songs.indexOf(currentSong.src.split("/%5Csongs%5C").slice(-1)[0])
        if((index+1)<songslength){
            playMusic(songs[index+1])
        }
    })
     previous.addEventListener("click",()=>{
        let index=songs.indexOf(currentSong.src.split("/%5Csongs%5C").slice(-1)[0])
        if((index-1)>=0){
            playMusic(songs[index-1])
        }
    })
   document.getElementById("volRange").addEventListener("change",(e)=>{
    currentSong.volume=parseInt(e.target.value)/100
   })
Array.from(document.querySelectorAll(".cards")).forEach(card => {
    card.addEventListener("click", () => {
        let track = card.getAttribute("data-song");
        playMusic(track);
    });
});


}
main();
