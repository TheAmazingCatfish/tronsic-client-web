<template>
    <main>
        <carousel />
        <section class="container">
            <h5 style="margin-bottom: 1.5rem;">推荐视频</h5>
            <video-card
                v-for="video in videos"
                v-bind:key="video.id"
                v-bind:video="video"
            />
        </section>
    </main>
</template>

<script>
// @ is an alias to /src
import Carousel from '../components/Carousel.vue';
import VideoCard from '../components/VideoCard.vue';

export default {
    name: 'home',
    components: {
        Carousel,
        VideoCard
    },
    data: function () {
        return {
            videos: [
                {
                    id: 1,
                    title:
                        'this is the video title which, seriously, is a very very long one',
                    user: {
                        username: 'john doe'
                    },
                    viewCount: 999,
                    uploadedDate: '1天前'
                },
                {
                    id: 2,
                    title:
                        'this is the video title which, seriously, is a very very long one',
                    user: {
                        username: 'john doe'
                    },
                    viewCount: 999,
                    uploadedDate: '1天前'
                },
                {
                    id: 3,
                    title:
                        'this is the video title which, seriously, is a very very long one',
                    user: {
                        username: 'john doe'
                    },
                    viewCount: 999,
                    uploadedDate: '1天前'
                }
            ]
        };
    }
};
</script>
