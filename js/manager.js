(function (w) {
    function Controls(config) {
        this.lastVol = 1;
        this.listShowFlag = 0;
        this.songIndex = 0;
        this.timer = null;
        this.modeFlag = 0;
        if (config) {
            this.init(config);
        }
    }

    Controls.prototype = {
        constructor: Controls,
        init(config){
            this.music = document.querySelector('.music');
            this.plyBtn = document.querySelector('.ply-btn');
            this.pIcon = this.plyBtn.getElementsByTagName('i')[0];
            this.Ttime = document.querySelector('.Ttime');
            this.Ctime = document.querySelector('.Ctime');
            this.noVol = document.querySelector('.noVol');
            this.vIcon = this.noVol.getElementsByTagName('i')[0];
            this.vol = document.querySelector('.vol');
            this.nowVol = document.querySelector('.nowVol');
            this.progressBar = document.querySelector('.progressBar');
            this.progress = document.querySelector('.progress');
            this.cover = document.querySelector('.cover');
            this.songName = document.querySelector('.name');
            this.author = document.querySelector('.singer');
            this.songContainer = document.querySelector('.songContainer');
            this.menu = document.querySelector('.menu');
            this.preSongBtn = document.querySelector('.preSongBtn');
            this.nextSongBtn = document.querySelector('.nextSongBtn');
            this.playMode = document.querySelector('.playMode');
            this.modeIcon = this.playMode.getElementsByTagName('i')[0];
            this.songs = config.songs;
            this.hideControls();
            this.initialList();
            this.listCircle();
            this.addEvent();
            this.updateSong(0);
            this.music.play().then(() => {
                this.music.muted = false;
            }).catch((error) => {
                console.log('Autoplay failed', error);
                this.music.play();
            }); // Add autoplay with error handling
        },
        updateSong(index){
            this.songIndex = index;
            const song = this.songs[this.songIndex];
            this.music.src = song.src;
            this.cover.src = song.cover;
            this.songName.innerHTML = song.name;
            this.author.innerHTML = song.author;
        },
        initialList() {
            const list = document.createElement('ul');
            this.songs.forEach((song, index) => {
                const item = document.createElement('li');
                item.innerHTML = song.name;
                item.addEventListener('click', () => {
                    this.updateSong(index);
                    this.music.play(); // Add autoplay on selection
                });
                list.appendChild(item);
            });
            this.songContainer.appendChild(list);
        },
        hideControls() {
            this.music.controls = false;
        },
        listCircle() {
            this.modeFlag = 0;
            this.modeIcon.className = 'iconfont icon-list-cycle';
        },
        addEvent() {
            this.plyBtn.addEventListener('click', () => {
                if (this.music.paused) {
                    this.music.play();
                } else {
                    this.music.pause();
                }
            });
            this.music.addEventListener('play', () => {
                this.pIcon.className = 'iconfont icon-pause';
            });
            this.music.addEventListener('pause', () => {
                this.pIcon.className = 'iconfont icon-play';
            });
            this.music.addEventListener('timeupdate', () => {
                this.Ctime.innerHTML = this.formatTime(this.music.currentTime);
                this.progress.style.width = (this.music.currentTime / this.music.duration) * 100 + '%';
            });
            this.music.addEventListener('ended', () => {
                this.nextSong();
            });
            this.progressBar.addEventListener('click', (e) => {
                const rate = e.offsetX / this.progressBar.offsetWidth;
                this.music.currentTime = this.music.duration * rate;
            });
            this.noVol.addEventListener('click', () => {
                if (this.music.muted) {
                    this.music.muted = false;
                    this.vIcon.className = 'iconfont icon-sound';
                    this.nowVol.style.width = this.lastVol * 100 + '%';
                } else {
                    this.music.muted = true;
                    this.vIcon.className = 'iconfont icon-mute';
                    this.nowVol.style.width = 0;
                }
            });
            this.vol.addEventListener('click', (e) => {
                const rate = e.offsetX / this.vol.offsetWidth;
                this.music.volume = rate;
                this.lastVol = rate;
                this.nowVol.style.width = rate * 100 + '%';
            });
            this.preSongBtn.addEventListener('click', () => {
                this.preSong();
            });
            this.nextSongBtn.addEventListener('click', () => {
                this.nextSong();
            });
            this.playMode.addEventListener('click', () => {
                if (this.modeFlag === 0) {
                    this.singleCycle();
                } else if (this.modeFlag === 1) {
                    this.randomPlay();
                } else {
                    this.listCircle();
                }
            });
        },
        formatTime(seconds) {
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
        },
        nextSong() {
            if (this.modeFlag === 2) {
                const index = Math.floor(Math.random() * this.songs.length);
                this.updateSong(index);
            } else {
                this.songIndex = (this.songIndex + 1) % this.songs.length;
                this.updateSong(this.songIndex);
            }
            this.music.play();
        },
        preSong() {
            if (this.modeFlag === 2) {
                const index = Math.floor(Math.random() * this.songs.length);
                this.updateSong(index);
            } else {
                this.songIndex = (this.songIndex - 1 + this.songs.length) % this.songs.length;
                this.updateSong(this.songIndex);
            }
            this.music.play();
        },
        singleCycle() {
            this.modeFlag = 1;
            this.modeIcon.className = 'iconfont icon-single-cycle';
            this.music.loop = true;
        },
        randomPlay() {
            this.modeFlag = 2;
            this.modeIcon.className = 'iconfont icon-random-play';
            this.music.loop = false;
        }
    };
    w.Controls = Controls;
})(window);
