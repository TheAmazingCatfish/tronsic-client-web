<template>
    <div class="card">
        <a href="">
            <img v-bind:src="video.Cover" v-bind:alt="video.title" />
        </a>
        <div class="card-body">
            <a class="card-title" href="" v-bind:title="video.title">
                {{ video.title }}
            </a>
            <div class="dropdown">
                <button
                    class="options-button dropdown-toggle"
                    v-bind:class="{ active: optionMenuIsActive }"
                    type="button"
                    v-on:click="optionMenuIsActive = !optionMenuIsActive"
                >
                    <icon name="more_vert" />
                </button>
                <div
                    class="options-menu dropdown-menu"
                    v-bind:class="{ active: optionMenuIsActive }"
                >
                    <a class="dropdown-item" href="">
                        <icon name="playlist_add" /> 添加到播放列表
                    </a>
                    <hr class="section-devider" />
                    <a class="dropdown-item" href="">
                        <icon name="not_interested" /> 不感兴趣
                    </a>
                    <a class="dropdown-item" href="">
                        <icon name="flag" /> 举报
                    </a>
                </div>
            </div>
            <a class="card-text" href="">{{ video.user.username }}</a>
            <span class="card-text"
                >{{ video.viewCount }}次观看 · {{ video.uploadedDate }}</span
            >
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
            optionMenuIsActive: false
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
    transform: scale(1.2);
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
    margin-bottom: 0.25rem;
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

.card-body .dropdown {
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

.options-button.active {
    visibility: visible;
}

.card-body .options-button:hover {
    color: royalblue;
}

.card:hover .options-button {
    visibility: visible;
}

.card-body .dropdown-menu {
    display: block;
    top: -0.5rem;
    right: 0;
    width: 12rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    font-size: 0.875rem;
    background-color: whitesmoke;
    transform: translateX(100%);
    transition-duration: 0.5s;
}

.card-body .dropdown-menu.active {
    transform: none;
}

.card-body .dropdown-item {
    margin-right: 2rem;
}

.card-body .dropdown-item:hover {
    background-color: gold;
}

.card-body .dropdown-item span {
    min-width: 1rem;
}

a.card-title:hover,
a.card-text:hover {
    color: gold;
}
</style>
