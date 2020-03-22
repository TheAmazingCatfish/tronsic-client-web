<template>
    <div
        class="video-player"
        v-on:fullscreenchange="inFullscreenMode = !inFullscreenMode"
        v-on:msfullscreenchange="inFullscreenMode = !inFullscreenMode"
        v-on:webkitfullscreenchange="inFullscreenMode = !inFullscreenMode"
    >
        <video
            playsinline
            v-on:loadedmetadata="duration = video.duration"
            v-on:pause="paused = true"
            v-on:play="paused = false"
            v-on:click="togglePlay"
            v-on:progress="updateBufferedEnd"
            v-on:timeupdate="currentTime = video.currentTime"
            v-on:volumechange="volume = video.volume; muted = video.muted;"
            v-on:waiting="buffering = true"
            v-on:canplaythrough="buffering = false"
        >
            <source src="http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4" />
        </video>
        <div class="control-bar active">
            <div class="progress-bar" v-on:click="setPlayProgress" v-on:mousedown="grabProgressBar">
                <div class="padding"></div>
                <div class="load-progress" v-bind:style="'width: ' + loadProgress * 100 + '%'"></div>
                <div class="play-progress" v-bind:style="'width: ' + playProgress * 100 + '%'">
                    <div class="playhead"></div>
                </div>
            </div>
            <div class="left">
                <button class="play-toggle" type="button" v-on:click="togglePlay">
                    <icon name="replay" v-if="video.ended" />
                    <icon name="play_arrow" v-else-if="paused" />
                    <icon name="pause" v-else />
                </button>
                <button class="next" type="button">
                    <icon name="skip_next" />
                </button>
                <span class="volume-panel">
                    <button class="volume" type="button" v-on:click="toggleMute">
                        <icon name="volume_off" v-if="muted" />
                        <icon name="volume_mute" v-else-if="volume == 0" />
                        <icon name="volume_down" v-else-if="volume > 0 && volume <= 0.5" />
                        <icon name="volume_up" v-else />
                    </button>
                    <div class="volume-slider" v-on:click="setVolume" v-on:mousedown="grabVolumeSlider">
                        <div class="padding"></div>
                        <div class="volume" v-bind:style="'width: ' + volume * 100 + '%'">
                            <div class="handle"></div>
                        </div>
                    </div>
                </span>
                <span class="time-display">
                    {{ currentTimeFormatted }} / {{ durationFormatted }}
                </span>
            </div>
            <div class="right">
                <button class="subtitles" type="button">
                    <icon name="subtitles" />
                </button>
                <button class="settings" type="button">
                    <icon name="settings" />
                </button>
                <button class="theater-mode">
                    <icon name="crop_16_9" />
                </button>
                <button class="fullscreen-toggle" v-on:click="toggleFullscreen">
                    <icon name="fullscreen" v-if="!inFullscreenMode" />
                    <icon name="fullscreen_exit" v-else />
                </button>
            </div>
        </div>
        <div class="spinner moon-phase" v-show="buffering"></div>
    </div>
</template>

<script>
    export default {
        name: 'VideoPlayer',
        data: function () {
            return {
                videoPlayer: {}, // 播放器元素
                video: {}, // 视频元素
                progressBar: {}, // 进度条元素
                volumeSlider: {}, // 音量滑块元素
                paused: true, // 映射 video 元素的暂停/播放状态
                bufferedEnd: 0, // 已缓存媒体的（currentTime 所处）时间段的结尾
                currentTime: 0, // 映射 video 元素的当前时间
                duration: 0, // 映射 video 元素的时长
                muted: false, // 映射 video 元素的静音状态
                volume: 1, // 映射 video元素的音量
                inFullscreenMode: false, // 指示播放器是否处于全屏模式
                buffering: true // 指示视频是否正在缓冲
            }
        },
        computed: {
            loadProgress: function () {
                return this.bufferedEnd / this.duration;
            },
            playProgress: function () {
                return this.currentTime / this.duration;
            },
            currentTimeFormatted: function () {
                return this.convertSecondsToTime(this.currentTime);
            },
            durationFormatted: function () {
                return this.convertSecondsToTime(this.duration);
            }
        },
        mounted: function () {
            this.videoPlayer = this.$el;
            this.video = this.$el.querySelector('.video-player video');
            this.progressBar = this.$el.querySelector('.video-player .progress-bar');
            this.volumeSlider = this.$el.querySelector('.video-player .control-bar .volume-slider');
            document.addEventListener('keyup', event => {
                if (event.defaultPrevented) {
                    return; // 如果事件已经在进行中，则不做任何事。
                }
                console.log(event.key);
                switch (event.key) {
                    case ' ':
                        this.togglePlay();
                        break;
                    case 'f':
                        this.toggleFullscreen();
                        break;
                    case 'm':
                        this.toggleMute();
                        break;
                    case 'ArrowLeft':
                        this.rewind();
                        break;
                    case 'ArrowRight':
                        this.fastForward();
                        break;
                    case 'ArrowUp':
                        this.increaseVolume();
                        break;
                    case 'ArrowDown':
                        this.decreaseVolume();
                        break;
                    default:
                        return;
                }
                
                // 取消默认动作，从而避免处理两次。
                event.preventDefault();
            });
            this.updateBufferedEnd();
        },
        methods: {
            convertSecondsToTime(totalSeconds) {
                let hours = Math.floor(totalSeconds / 3600);
                let minutes = Math.floor(totalSeconds % 3600 / 60);
                let seconds = Math.floor(totalSeconds % 60);
                if (hours > 0) {
                    return hours + ':'
                        + minutes.toString().padStart(2, '0') + ':'
                        + seconds.toString().padStart(2, '0');
                }
                return minutes + ':' + seconds.toString().padStart(2, '0');
            },
            debounce(func, wait) {
                let timer;
                return () => {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        func.apply(this, arguments);
                    }, wait);
                }
            },
            updateBufferedEnd() {
                let buffered = this.video.buffered;
                for (let i = buffered.length - 1; i >= 0; i--) {
                    if (buffered.start(i) < this.currentTime) {
                        this.bufferedEnd = buffered.end(i);
                        break;
                    }
                }
            },
            setPlayProgress(event) {
                let eventRelativeX = event.clientX - this.progressBar.getBoundingClientRect().left;
                let playProgressRate;
                if (eventRelativeX <= 0) {
                    playProgressRate = 0;
                } else if (eventRelativeX >= this.progressBar.offsetWidth) {
                    playProgressRate = 1;
                } else {
                    playProgressRate = eventRelativeX / this.progressBar.offsetWidth;
                }
                // 为了拖拽进度条的流畅，先把目标进度值赋给用于映射的 currentTime，之后再把 currentTime 赋给 video.currentTime
                this.video.currentTime = this.currentTime = this.video.duration * playProgressRate;
            },
			grabProgressBar(event) {
                event.preventDefault();
                document.addEventListener('mousemove', this.setPlayProgress);
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', this.setPlayProgress);
                });
            },
            togglePlay() {
                if (this.video.paused) {
                    this.video.play();
                } else {
                    this.video.pause();
                }
            },
            rewind() {
                this.video.currentTime -= 5;
            },
            fastForward() {
                this.video.currentTime += 5;
            },
            toggleMute() {
                this.video.muted = !this.video.muted;
            },
            increaseVolume() {
                if (this.video.volume < 0.95) {
                    this.video.volume += 0.05;
                } else {
                    this.video.volume = 1;
                }
            },
            decreaseVolume() {
                if (this.video.volume > 0.05) {
                    this.video.volume -= 0.05;
                } else {
                    this.video.volume = 0;
                }
            },
            setVolume(event) {
                let eventRelativeX = event.clientX - this.volumeSlider.getBoundingClientRect().left;
                if (eventRelativeX <= 0) {
                    this.volume = 0;
                } else if (eventRelativeX >= this.volumeSlider.offsetWidth){
                    this.volume = 1;
                } else {
                    this.volume = eventRelativeX / this.volumeSlider.offsetWidth;
                }
                // 为了拖拽音量条的流畅，先把目标音量值赋给用于映射的 volume，之后再把 volume 赋给 video.volume
                this.video.volume = this.volume;
            },
            grabVolumeSlider(event) {
                event.preventDefault();
                document.addEventListener('mousemove', this.setVolume);
                document.addEventListener('mouseup', () => {
                   document.removeEventListener('mousemove', this.setVolume); 
                });
            },
            toggleFullscreen() {
                let fullscreenElement = document.fullscreenElement
                    || document.msFullscreenElement
                    || document.webkitFullscreenElement
                    || false;
                if (!fullscreenElement) {
                    if (this.videoPlayer.requestFullscreen) {
                        this.videoPlayer.requestFullscreen();
                    } else if (this.videoPlayer.msRequestFullscreen) {
                        this.videoPlayer.msRequestFullscreen();
                    } else {
                        this.videoPlayer.webkitRequestFullScreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else {
                        document.webkitExitFullscreen();
                    }
                }
            }
        }
    }
</script>

<style>
    .video-player {
        display: flex;
        justify-content: center;
        align-content: center;
        position: relative;
        width: 96rem;
        height: 54rem;
        background-color: black;
        overflow: hidden;
    }
    
    .video-player video {
        width: 100%;
    }
    
    .video-player .control-bar {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 2.5rem .75rem 0;
        background-image: linear-gradient(transparent, rgba(0, 0, 0, .1) 50%, rgba(0, 0, 0, .3));
        transform: translateY(100%);
    }
    
    .video-player .control-bar.active {
        transform: none;
        transition: transform .4s;
    }
    
    .video-player .control-bar .left,
    .video-player .control-bar .right {
        display: flex;
        align-items: center;
    }
    
    /*==== Progress bar Start ====*/
    .video-player .progress-bar {
        position: relative;
        width: 100%;
        height: .248rem;
        background-color: rgba(255, 255, 255, .2);
        cursor: pointer;
    }
    
    .video-player .progress-bar:hover {
        transform: scaleY(1.5);
        transition: transform .1s;
    }
    
    .video-player .progress-bar .padding {
        width: 100%;
        height: 100%;
    }
    
    .video-player .progress-bar:hover .padding {
        transform: scaleY(5);
    }
    
    .video-player .progress-bar .load-progress {
        position: absolute;
        top: 0;
        height: 100%;
        background-color: rgba(255, 255, 255, .4);
    }
    
    .video-player .progress-bar .play-progress {
        position: absolute;
        top: 0;
        height: 100%;
        background-color: gold;
        transition: width .1s;
    }
    
    .video-player .progress-bar .playhead {
        visibility: hidden;
        position: absolute;
        right: -.124rem;
        width: .248rem;
        height: .248rem;
        border-radius: 50%;
        background-color: white;
    }
    
    .video-player .progress-bar:hover .playhead {
        visibility: visible;
        transform: scale(4.5, 3);
        transition: transform .1s;
    }
    /*==== Progress bar End ====*/
    
    /*==== Control buttons Start ====*/
    .video-player .control-bar button {
        min-width: 2.5rem;
        height: 2.5rem;
    }
    
    .video-player .control-bar button .icon {
        width: 1.75rem;
        height: 1.75rem;
        color: white;
    }
    
    .video-player .control-bar button.play-toggle .icon {
        width: 3rem;
        height: 2.25rem;
    }
    
    .video-player .control-bar button .icon:hover {
        fill: gold;
    }
    /*==== Control buttons End ====*/
    
    /*==== Volume Panel Start ====*/
    .video-player .control-bar .volume-panel {
        display: flex;
        align-items: center;
        margin-right: .5rem;
    }
    
    .video-player .control-bar .volume-slider {
        position: relative;
        width: 0;
        height: .248rem;
        background-color: rgba(255, 255, 255, .2);
        cursor: pointer;
        overflow: hidden;
        transition: width .5s;
    }
    
    .video-player .control-bar .volume-panel:hover .volume-slider {
        margin-right: .744rem;
        width: 5rem;
        overflow: initial;
    }
    
    .video-player .control-bar .volume-slider .padding {
        width: 100%;
        height: 100%;
    }
    
    .video-player .control-bar .volume-panel:hover .volume-slider .padding {
        transform: scaleY(5);
    }
    
    .video-player .control-bar .volume-slider .volume {
        position: absolute;
        top: 0;
        height: 100%;
        background-color: white;
        transition: width .1s;
    }
    
    .video-player .control-bar .volume-slider .handle {
        position: absolute;
        top: -.248rem;
        right: -.372rem;
        width: .744rem;
        height: .744rem;
        border-radius: 50%;
        background-color: inherit;
    }
    /*==== Volume Panel End ====*/

    .video-player .control-bar .time-display {
        color: white;
    }
    
    .video-player .spinner {
        position: absolute;
        top: 45%;
        margin-left: auto;
    }
    
    @keyframes moon-phases {
        0% {
            border-left: 4rem solid black;
            border-right: 0 solid gold;
            background-color: black;
        }
        25% {
            border-left: 4rem solid black;
            border-right: 4rem solid gold;
            background-color: black;
        }
        25.1% {
            border-left: 4rem solid black;
            border-right: 4rem solid gold;
            background-color: gold;
        }
        50% {
            border-left: 0 solid black;
            border-right: 4rem solid gold;
            background-color: gold;
        }
        50.1% {
            border-left: 0 solid gold;
            border-right: 0 solid black;
            background-color: gold;
        }
        75% {
            border-left: 0 solid gold;
            border-right: 4rem solid black;
            background-color: gold;
        }
        75.1% {
            border-left: 4rem solid gold;
            border-right: 4rem solid black;
            background-color: black;
        }
        100% {
            border-left: 0 solid gold;
            border-right: 4rem solid black;
            background-color: black;
        }
    }
    
    .spinner.moon-phase {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        animation: moon-phases 2s linear infinite;
        opacity: .5;
    }
</style>
