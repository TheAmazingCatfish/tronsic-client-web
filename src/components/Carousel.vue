<template>
    <div class="carousel">
        <div class="carousel-inner">
            <div
                v-for="(item, index) in items"
                v-bind:key="index"
                class="carousel-item"
                v-bind:class="{ active: iCurrentItem == index }"
            >
                <img v-bind:src="item.imgUrl" v-bind:alt="item.imgAlt" />
            </div>
        </div>
        <div class="carousel-controls">
            <button
                class="carousel-button button-prev"
                type="button"
                v-on:click="iCurrentItem = iPrevItem"
            >
                <icon name="chevron_left" />
            </button>
            <ol class="carousel-indicators">
                <li
                    v-for="(item, index) in items"
                    v-bind:key="index"
                    class="carousel-indicator"
                    v-bind:class="{ active: iCurrentItem == index }"
                    v-on:click="iCurrentItem = index"
                ></li>
            </ol>
            <button
                class="carousel-button button-next"
                type="button"
                v-on:click="iCurrentItem = iNextItem"
            >
                <icon name="chevron_right" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Carousel',
    data: function () {
        return {
            items: [
                {
                	imgUrl: require('../assets/img/303609.jpg'),
                	imgAlt: ''
                },
                {
                	imgUrl: require('../assets/img/303610.jpg'),
                	imgAlt: ''
                },
                {
                	imgUrl: require('../assets/img/303616.jpg'),
                	imgAlt: ''
                },
                {
                	imgUrl: require('../assets/img/599771.jpg'),
                	imgAlt: ''
                },
                {
                	imgUrl: require('../assets/img/599781.jpg'),
                	imgAlt: ''
                }
            ],
            iCurrentItem: 0
        };
    },
    computed: {
        iPrevItem: function () {
            if (this.iCurrentItem == 0) {
                return this.items.length - 1;
            } else {
                return this.iCurrentItem - 1;
            }
        },
        iNextItem: function () {
            if (this.iCurrentItem == this.items.length - 1) {
                return 0;
            } else {
                return this.iCurrentItem + 1;
            }
        }
    }
};
</script>

<style>
.carousel {
    position: relative;
    margin-bottom: 4rem;
}

.carousel-inner {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.carousel-item {
    position: relative;
    display: none;
    justify-content: center;
    float: left;
    margin-right: -100%;
    width: 100%;
    height: 32rem;
    transition: 0.5s ease-in-out;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.fade-in {
    animation: fade-in 0.5s;
}

.fade-out {
    animation: fade-in 0.5s reverse;
}

@keyframes slide-in-left {
    from {
        left: -100vw;
    }

    to {
        left: 0;
    }
}

@keyframes slide-in-right {
    from {
        left: 100vw;
    }

    to {
        left: 0;
    }
}

.slide-in-left {
    animation: slide-in-left 0.5s;
}

.slide-in-right {
    animation: slide-in-right 0.5s;
}

.slide-out-left {
    animation: slide-in-left 0.5s reverse;
}

.slide-out-right {
    animation: slide-in-right 0.5s reverse;
}

.carousel-item.active {
    display: flex;
}

.carousel-item img {
    max-height: 100%;
}

.carousel-controls {
    position: absolute;
    right: 15%;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    margin-left: auto;
}

.carousel-indicators {
    display: flex;
    margin-bottom: 0;
}

.carousel-indicator {
    margin-right: 0.25rem;
    width: 1.75rem;
    height: 0.25rem;
    background-color: white;
    opacity: 0.4;
    transition: opacity 0.5s;
}

.carousel-indicator.active {
    opacity: 0.9;
}

.carousel-indicator:hover {
    opacity: 0.9;
    cursor: pointer;
}

.carousel-button {
    visibility: hidden;
    background-color: transparent;
    color: white;
    font-size: 2rem;
    opacity: 0.4;
}

.carousel-button .icon {
    width: 3rem;
    height: 3rem;
}

.carousel-button.button-prev {
    margin-right: 0.25rem;
}

.carousel:hover .carousel-button {
    visibility: visible;
}

.carousel-button:hover {
    opacity: 0.9;
}
</style>
