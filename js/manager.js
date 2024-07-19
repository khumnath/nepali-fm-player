(function (w) {
    function Controls(config) {
        this.lastVol = 1;
        this.songIndex = 0;
        this.modeFlag = 0;
        if (config) {
            this.init(config);
        }
    }

    Controls.prototype = {
        constructor: Controls,
        init(config) {
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
            this.autoPlay();
        },
        updateSong(index) {
            this.songIndex = index;
            const song = this.songs[this.songIndex];
            this.music.src = song.src;
            this.cover.src = song.cover;
            this.songName.innerHTML = song.name;
            this.author.innerHTML = song.author;
            this.Ttime.innerHTML = '0.00'; // Reset Ttime to default value initially
        },
        initialList() {
            const list = document.createElement('ul');
            this.songs.forEach((song, index) => {
                const item = document.createElement('li');
                const statusDot = document.createElement('span');
                statusDot.classList.add('status-dot');
                item.appendChild(statusDot);
                item.append(song.name);
                item.addEventListener('click', () => {
                    this.updateSong(index);
                    this.music.play();
                });
                list.appendChild(item);
                this.checkStreamStatus(song.src, statusDot);
            });
            this.songContainer.appendChild(list);
        },
        checkStreamStatus(url, statusDot) {
            const audio = new Audio();
            audio.src = url;
            audio.addEventListener('canplaythrough', () => {
                statusDot.classList.add('online');
            });
            audio.addEventListener('error', () => {
                statusDot.classList.add('offline');
            });
            // Attempt to load the stream
            audio.load();
        },
        hideControls() {
            this.music.controls = false;
        },
        listCircle() {
            this.modeFlag = 0;
            this.modeIcon.className = 'fas fa-list';
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
                this.pIcon.className = 'fas fa-pause';
            });
            this.music.addEventListener('pause', () => {
                this.pIcon.className = 'fas fa-play';
            });
            this.music.addEventListener('timeupdate', () => {
                this.Ctime.innerHTML = this.formatTime(this.music.currentTime);
                this.progress.style.width = (this.music.currentTime / this.music.duration) * 100 + '%';
            });
            this.music.addEventListener('loadedmetadata', () => {
                if (isNaN(this.music.duration) || this.music.duration === Infinity) {
                    this.Ttime.innerHTML = 'stream';
                } else {
                    this.Ttime.innerHTML = this.formatTime(this.music.duration);
                }
            });
            this.music.addEventListener('ended', () => {
                this.nextSong();
            });
            this.progressBar.addEventListener('mousedown', this.startSeek.bind(this));
            this.progressBar.addEventListener('touchstart', this.startSeek.bind(this), { passive: true });
            this.vol.addEventListener('mousedown', this.startVolume.bind(this));
            this.vol.addEventListener('touchstart', this.startVolume.bind(this), { passive: true });
            this.noVol.addEventListener('click', () => {
                if (this.music.muted) {
                    this.music.muted = false;
                    this.vIcon.className = 'fas fa-volume-up';
                    this.nowVol.style.width = this.lastVol * 100 + '%';
                } else {
                    this.music.muted = true;
                    this.vIcon.className = 'fas fa-volume-mute';
                    this.nowVol.style.width = 0;
                }
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
            this.modeIcon.className = 'fas fa-repeat';
            this.music.loop = true;
        },
        randomPlay() {
            this.modeFlag = 2;
            this.modeIcon.className = 'fas fa-random';
            this.music.loop = false;
        },
        autoPlay() {
            this.music.play().then(() => {
                this.music.muted = false;
            }).catch((error) => {
                console.log('Autoplay failed');
                this.music.play();
            });
        },
        getVolumeIcon(volume) {
            if (volume === 0) {
                return 'fas fa-volume-mute';
            } else if (volume <= 0.5) {
                return 'fas fa-volume-down';
            } else {
                return 'fas fa-volume-up';
            }
        },
        startSeek(e) {
            this.isSeeking = true;
            document.addEventListener('mousemove', this.seek.bind(this));
            document.addEventListener('mouseup', this.stopSeek.bind(this));
            document.addEventListener('touchmove', this.seek.bind(this), { passive: true });
            document.addEventListener('touchend', this.stopSeek.bind(this));
            this.seek(e);
        },
        seek(e) {
            if (this.isSeeking) {
                const clientX = e.clientX || e.touches[0].clientX;
                const rate = (clientX - this.progressBar.getBoundingClientRect().left) / this.progressBar.offsetWidth;
                this.music.currentTime = Math.max(0, Math.min(rate * this.music.duration, this.music.duration));
            }
        },
        stopSeek() {
            this.isSeeking = false;
            document.removeEventListener('mousemove', this.seek.bind(this));
            document.removeEventListener('mouseup', this.stopSeek.bind(this));
            document.removeEventListener('touchmove', this.seek.bind(this));
            document.removeEventListener('touchend', this.stopSeek.bind(this));
        },
        startVolume(e) {
            this.isAdjustingVolume = true;
            document.addEventListener('mousemove', this.adjustVolume.bind(this));
            document.addEventListener('mouseup', this.stopVolume.bind(this));
            document.addEventListener('touchmove', this.adjustVolume.bind(this), { passive: true });
            document.addEventListener('touchend', this.stopVolume.bind(this));
            this.adjustVolume(e);
        },
        adjustVolume(e) {
            if (this.isAdjustingVolume) {
                const clientX = e.clientX || e.touches[0].clientX;
                const rate = (clientX - this.vol.getBoundingClientRect().left) / this.vol.offsetWidth;
                this.music.volume = Math.max(0, Math.min(rate, 1));
                this.lastVol = this.music.volume;
                this.nowVol.style.width = this.music.volume * 100 + '%';
                this.vIcon.className = this.getVolumeIcon(this.music.volume);
            }
        },
        stopVolume() {
            this.isAdjustingVolume = false;
            document.removeEventListener('mousemove', this.adjustVolume.bind(this));
            document.removeEventListener('mouseup', this.stopVolume.bind(this));
            document.removeEventListener('touchmove', this.adjustVolume.bind(this));
            document.removeEventListener('touchend', this.stopVolume.bind(this));
        }
    };

    w.Controls = Controls;
})(window);
