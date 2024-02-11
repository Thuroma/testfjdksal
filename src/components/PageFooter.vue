<template>

    <span class="nav-link">
        <router-link v-bind:to="{ name: 'SearchParameters' }">Home</router-link>
    </span>
    <br>
    <span class="nav-link">
        <router-link v-bind:to="{ name: 'AboutSite' }">About</router-link>
    </span>
    <br>
    <a target="_blank" href="https://icons8.com/icon/30567/map-pin">Map Pin</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

</template>

<script>

export default {
    name: 'PageFooter'
}
</script>

<style scoped>

</style>