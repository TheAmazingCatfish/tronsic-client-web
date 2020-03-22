<template>
    <main>
        <section class="content-section" style="margin-top: 4rem;">
            <video-player />
            <div class="video-info">
                <h4>{{ video.title }}</h4>
            </div>
        </section>
    </main>
</template>

<script>
    import VideoPlayer from '../components/VideoPlayer.vue';
    
    export default {
        name: 'VideoWatch',
        components: {
            VideoPlayer
        },
        props: {
            videoId: {
                type: String
            }
        },
        computed: {
            video: function () {
                return this.$store.state.videos.find(video => video.id == this.videoId)
            }
        }
    }
</script>

<style>
    .video-info {
        width: 96rem;
    }
</style>
