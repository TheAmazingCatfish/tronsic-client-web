<template>
    <div id="app">
        <header>
            <!-- <router-view name="navbar" /> -->
            <navigation-bar />
        </header>
        <!-- <router-view name="sidenav" /> -->
        <side-navigation />
        <router-view />
    </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import SideNavigation from './components/SideNavigation.vue';

export default {
    name: 'App',
    components: {
        NavigationBar,
        SideNavigation
    }
};
</script>

<style>
/* ==== Reboot Start ==== */
/* Page defaults */
* {
    box-sizing: border-box;
    outline: none;
    border: none;
    padding: 0;
}

body {
    margin: 0;
    line-height: 1.25;
    font-size: 1rem;
}

a {
    text-decoration: none;
}

/* Headings and paragraphs */
h1,
h2,
h3,
h4,
h5,
h6 {
    margin-bottom: 0.5rem;
    line-height: 1.2;
    font-weight: 500;
}

h1 {
    font-size: 2.5rem;
}

h2 {
    font-size: 2rem;
}

h3 {
    font-size: 1.75rem;
}

h4 {
    font-size: 1.5rem;
}

h5 {
    font-size: 1.25rem;
}

h6 {
    font-size: 1rem;
}

p {
    margin-top: 0;
    margin-bottom: 1rem;
}

/* Lists */
dl,
ol,
ul {
    margin-top: 0;
    margin-bottom: 1rem;
    list-style: none;
}

li ol,
li ul {
    margin-bottom: 0;
}

dd {
    margin-bottom: 0.5rem;
    margin-left: 0;
}

dt {
    font-weight: bold;
}

/* Preformatted text */
pre {
    margin-top: 0;
    margin-bottom: 1rem;
}

/* Forms */
fieldset {
    margin: 0;
    padding: 0;
    border: none;
}

legend {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
    max-width: 100%;
    padding: 0;
    line-height: inherit;
    font-size: 1.5rem;
    color: inherit;
    white-space: normal;
}

label {
    display: inline-block;
}

button,
input,
optgroup,
select,
textarea {
    line-height: inherit;
    font-family: inherit;
    font-size: inherit;
}

textarea {
    resize: vertical;
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
    background-color: transparent;
    cursor: pointer;
}

button:disabled,
[type="button"]:disabled,
[type="reset"]:disabled,
[type="submit"]:disabled {
    cursor: not-allowed;
}

[type="range"] {
    margin: 0;
}

/* Misc elements */
address {
    margin-bottom: 1rem;
    line-height: inherit;
    font-style: normal;
}

blockquote {
    margin: 0 0 1rem;
}

summary {
    display: list-item;
    cursor: pointer;
}
/* ==== Reboot End ==== */

@media screen and (min-width: 1280px) {
    html {
        font-size: 12px;
    }
}

@media screen and (min-width: 1600px) {
    html {
        font-size: 14px;
    }
}

@media screen and (min-width: 1920px) {
    html {
        font-size: 16px;
    }
}

@media screen and (min-width: 2560px) {
    html {
        font-size: 22px;
    }
}

@media screen and (min-width: 3840px) {
    html {
        font-size: 32px;
    }
}

::selection {
    background-color: gold;
    /* text-shadow: 0 0 .25rem gold; */
}

/* ==== Dropdown Start ==== */
.dropdown {
    position: relative;
}

.dropdown-toggle {
    display: inline-block;
    color: inherit;
}

.dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1;
    padding: 0.5rem 0;
    /* font-size: .875rem; */
    /* background-color: rgba(77, 77, 77, .7); */
}

.dropdown-menu.active {
    display: block;
}

.dropdown-item {
    display: block;
    padding: 0.25rem 1rem;
    color: inherit;
    text-align: left;
}
/* ==== Dropdown End ==== */

.section-devider {
    height: 0.0625rem;
    border: none;
    background-color: #2b2b2b;
}

.content-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.container {
    margin-left: auto;
    margin-right: auto;
    width: 86rem;
    max-width: 100%;
    padding-left: .5rem;
    padding-right: .5rem;
}

@media screen and (min-width: 576px) {
    
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    /* color: #2c3e50; */
}
</style>
