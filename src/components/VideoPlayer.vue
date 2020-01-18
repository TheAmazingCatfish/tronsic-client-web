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
            v-on:timeupdate="currentTime = video.currentTime"
            v-on:volumechange="volume = video.volume; muted = video.muted;"
        >
            <source src="http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4" />
        </video>
        <div class="control-bar active">
            <div class="progress-bar" v-on:click="alterPlayProgress">
                <div class="padding"></div>
                <div class="load-progress"></div>
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
                    <div class="volume-slider" v-on:click="adjustVolume">
                        <div class="padding"></div>
                        <div class="volume" v-bind:style="'width: ' + volume * 100 + '%'"></div>
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
                volumeSlidr: {}, // 音量滑块元素
                paused: true, // 映射 video 元素的暂停/播放状态
                currentTime: 0, // 映射 video 元素的当前时间
                duration: 0, // 映射 video 元素的时长
                muted: false, // 映射 video 元素的静音状态
                volume: 1, // 映射 video元素的音量
                inFullscreenMode: false // 指示播放器是否处于全屏模式
            }
        },
        computed: {
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
            this.volumeSlidr = this.$el.querySelector('.video-player .control-bar .volume-slider');
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
            })
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
            // updatePlayProgress() {
            //     this.playProgress = this.video.currentTime / this.video.duration;
            //     this.currentTime = this.convertSecondsToTime(this.video.currentTime);
            // },
            alterPlayProgress(event) {
                let playProgressTo = event.offsetX / this.progressBar.offsetWidth;
                this.video.currentTime = this.currentTime = this.video.duration * playProgressTo;
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
            adjustVolume(event) {
                this.video.volume = event.offsetX / this.volumeSlidr.offsetWidth;
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
    }
    
    /*==== Progress bar Start ====*/
    .video-player .progress-bar {
        position: relative;
        width: 100%;
        height: .1875rem;
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
        width: 50%;
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
        right: -.09375rem;
        width: .1875rem;
        height: .1875rem;
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
    }
    
    .video-player .control-bar .volume-slider {
        position: relative;
        width: 5rem;
        height: .1875rem;
        background-color: rgba(255, 255, 255, .2);
        cursor: pointer;
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
    /*==== Volume Panel End ====*/

    .video-player .control-bar .time-display {
        height: 2.5rem;
        padding: .7rem;
        color: white;
        font-size: .875rem;
    }
</style>
