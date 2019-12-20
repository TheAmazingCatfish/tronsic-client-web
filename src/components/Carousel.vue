<template>
    <div class="carousel">
        <div class="carousel-inner">
            <div
                v-for="(slide, index) in slides"
                v-bind:key="index"
                class="slide"
                v-bind:class="{ active: iCurrentSlide == index }"
            >
                <img v-bind:src="slide.imgUrl" v-bind:alt="slide.imgAlt" />
            </div>
        </div>
        <div class="carousel-control">
            <button
                class="carousel-button-prev"
                type="button"
                v-on:click="iCurrentSlide = iPrevSlide"
            >
                <span class="far fa-angle-double-left"></span>
            </button>
            <ol class="carousel-indicators">
                <li
                    v-for="(slide, index) in slides"
                    v-bind:key="index"
                    class="carousel-indicator"
                    v-bind:class="{ active: iCurrentSlide == index }"
                    v-on:click="iCurrentSlide = index"
                ></li>
            </ol>
            <button
                class="carousel-button-next"
                type="button"
                v-on:click="iCurrentSlide = iNextSlide"
            >
                <span class="far fa-angle-double-right"></span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'carousel',
    props: {
        slides: {
            type: Array,
            required: true
        }
    },
    date: function() {
        return {
            iCurrentSlide: 0
        };
    },
    computed: {
        iPrevSlide: function() {
            if (this.iCurrentSlide == 0) {
                return this.slides.length - 1;
            } else {
                return this.iCurrentSlide - 1;
            }
        },
        iNextSlide: function() {
            if (this.iCurrentSlide == this.slides.length - 1) {
                return 0;
            } else {
                return this.iCurrentSlide + 1;
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

.slide {
    position: relative;
    display: none;
    justify-content: center;
    float: left;
    margin-right: -100%;
    width: 100%;
    height:
    		/* 28.125vw */ 32rem;
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

.slide.active {
    display: flex;
}

.slide img {
    height: 100%;
}

.carousel-control {
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

.carousel-button-prev,
.carousel-button-next {
    visibility: hidden;
    /* margin-bottom: 1rem; */
    /* width: 1.75rem; */
    /* height: .375rem; */
    /* border-bottom: .25rem solid white; */
    background-color: transparent;
    color: white;
    font-size: 2rem;
    opacity: 0.4;
}

.carousel-button-prev {
    margin-right: 0.25rem;
    /* border-right: .5rem solid white;
    	border-left: .25rem solid transparent; */
}

/* .carousel-button-next {
    	border-right: .25rem solid transparent;
    	border-left: .5rem solid white;
    } */

.carousel:hover .carousel-button-prev,
.carousel:hover .carousel-button-next {
    visibility: visible;
}

.carousel-button-prev:hover,
.carousel-button-next:hover {
    opacity: 0.9;
}
</style>
