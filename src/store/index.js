import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
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
    },
    mutations: {
        SET_VIDEOS(state, videos) {
            state.videos = videos;
        }
    },
    actions: {
        async loadVideos({commit}) {
            try {
                const response = await this.$axios.get('/video/get');
                commit('SET_VIDEOS', response.data);
            } catch (error) {
                
            }
        }
    },
    modules: {}
});
