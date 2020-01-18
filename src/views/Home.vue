<template>
    <main>
        <carousel />
        <section class="content-section">
            <div class="container">
                <h5 style="margin-bottom: 1.5rem;">推荐视频</h5>
                <video-card
                    v-for="video in videos"
                    v-bind:key="video.id"
                    v-bind:video="video"
                />
            </div>
        </section>
    </main>
</template>

<script>
// @ is an alias to /src
import Carousel from '../components/Carousel.vue';
import VideoCard from '../components/VideoCard.vue';
import { mapState } from 'vuex';

export default {
    name: 'home',
    components: {
        Carousel,
        VideoCard
    },
    computed: {
        ...mapState([
            'videos'
        ])
    }
};
</script>
