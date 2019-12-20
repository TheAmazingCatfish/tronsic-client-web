<template>
    <svg class="icon" aria-hidden>
        <use v-bind:xlink:href="'#' + name" />
    </svg>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        name: {
            type: String,
            required: true
        }
    }
};
</script>

<style>
.icon {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
    color: inherit;
    fill: currentcolor;
}
</style>
