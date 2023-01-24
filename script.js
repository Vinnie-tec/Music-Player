const MusicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressCont = document.querySelector('.container-progress');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover')

//songs titles
const songs = ['Elijah-Oyelade-God-Of-Wonders', 'Elohim', 'Frank_Edwards_-_Frank_Edwards_If_Not_For_You']

//keep track of the songs
let songIndex = 2;

//initially load song
loadSong(songs[songIndex]);

//creating function...update song details
function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}

//creating the pauseSong and the Playsong button function
function playSong() {
  MusicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  MusicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

//creating the previous and the next button function
function prevSong() {
  songIndex--

  if(songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])

  playSong()
}

function nextSong() {
  songIndex++

  if(songIndex > songs.length - 1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])

  playSong()
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX/width) * duration;
}



//event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = MusicContainer.classList.contains('play')

  if(isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

///change song event
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


audio.addEventListener('timeupdate', updateProgress);

progressCont.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);