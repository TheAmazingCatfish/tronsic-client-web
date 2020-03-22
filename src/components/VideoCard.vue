<template>
    <div class="card">
        <a v-bind:href="'/video/' + video.id">
            <img v-bind:src="video.Cover" v-bind:alt="video.title" />
        </a>
        <div class="card-body">
            <a
                class="card-title"
                v-bind:href="'/video/' + video.id"
                v-bind:title="video.title"
            >{{ video.title }}</a>
            <div class="options">
                <button
                    class="options-button"
                    v-bind:class="{ active: optionsMenuActive }"
                    type="button"
                    v-on:click="optionsMenuActive = !optionsMenuActive"
                >
                    <icon name="more_vert" />
                </button>
                <div
                    class="options-menu"
                    v-bind:class="{ active: optionsMenuActive }"
                >
                    <a class="option" href="">
                        <icon name="playlist_add" /> 添加到播放列表
                    </a>
                    <hr class="section-devider" />
                    <a class="option" href="">
                        <icon name="not_interested" /> 不感兴趣
                    </a>
                    <a class="option" href="">
                        <icon name="flag" /> 举报
                    </a>
                </div>
            </div>
            <a class="card-text" href="">{{ video.user.username }}</a>
            <span class="card-text">
                {{ video.viewCount }}次观看 · {{ video.uploadedDate }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VideoCard',
    props: {
        video: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            optionsMenuActive: false
        };
    }
};
</script>

<style>
.card {
    width: 16rem;
    margin: 0 0.5rem 1rem;
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    float: left;
    overflow: hidden;
    transition-duration: 0.4s;
}

.card:hover {
    transform: scale(1.12);
}

.card img {
    display: block;
    width: 16rem;
    height: 9rem;
    background-color: grey;
}

.card-body {
    position: relative;
    padding: 0.75rem;
}

.card-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-bottom: 0.5rem;
    width: 14rem;
    height: 2.5rem;
    overflow: hidden;
    line-height: 1.25;
    -webkit-line-clamp: 2;
    font-weight: bolder;
    text-overflow: ellipsis;
}

.card-text {
    display: block;
    color: grey;
}

.card-body .options {
    position: absolute;
    top: 0.5rem;
    right: 0;
}

.card-body .options-button {
    visibility: hidden;
    position: relative;
    z-index: 2;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    font-size: 1.25rem;
}

.card-body .options-button.active {
    visibility: visible;
}

.card-body .options-button:hover {
    color: royalblue;
}

.card:hover .options-button {
    visibility: visible;
}

.card-body .options-menu {
    display: block;
    position: absolute;
    top: -0.5rem;
    right: 0;
    width: 12rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    font-size: 0.875rem;
    background-color: whitesmoke;
    transform: translateX(100%);
    transition-duration: 0.5s;
}

.card-body .options-menu.active {
    transform: none;
}

.card-body .option {
    display: block;
    margin-right: 2rem;
    padding: .125rem .5rem;
    color: #2B2B2B;
}

.card-body .option:hover {
    background-color: rgba(255, 215, 0, 0.7);
}

.card-body .option .icon {
    border-radius: 50%;
    color: royalblue;
}

a.card-title:hover,
a.card-text:hover {
    color: gold;
}
</style>
