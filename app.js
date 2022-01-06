window.onload = function() {
    console.log("Page loaded !");
    let play = document.querySelector(".play");
    let stop = document.querySelector(".stop");
    let download = document.querySelector(".download");
    let progress = document.querySelector("#progressBar");
    //console.log(progress.value);
    let context = new window.AudioContext();
    let source = null;
    let audioBuffer = null;

    download.addEventListener("click", loadSong);
    //play.addEventListener("click", playSong);
    play.onclick = playSong;
    stop.onclick = stopSong;


    function loadSong() {//loadSong
        let url = "https://mainline.i3s.unice.fr/mooc/LaSueur.mp3";
        // xhr2 testing
        let xhr = new XMLHttpRequest();
        // xhr config
        xhr.open("GET",url,true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function(e) {
            console.log("Download complete, decoding...");
            prepareSong(this.response);
        };
        xhr.onprogress = function(e) {
            progress.disabled = false;
            progress.value = e.loaded;
            progress.max = e.total;
            console.log("Downloading song...");
        };
        xhr.onerror = function() {
            console.log("Error downloading song");
        };
        // xhr send
        xhr.send();
    }
    //decode sond data
    function prepareSong(song) {
        context.decodeAudioData(song, 
            // decode success
            function(buffer) {
            console.log("Song decoded");
            audioBuffer = buffer;
            play.disabled = false;
            stop.disabled = false;
            }, 
            // decode error
            function(err){
                console.log("Error found : " + err);
            }
        );
    }

    function playSong(){
        // config
        source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = false;
        // connect to speakers
        source.connect(context.destination);
        source.start(0); // play
    }

    function stopSong() {
        if(source){
            source.stop();
        }
    }






}