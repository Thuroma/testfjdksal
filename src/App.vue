<template>
  <div id="app">
    
  <page-header />

  <router-view />

  <page-footer />

  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import SearchParameters from './components/SearchParameters.vue'
import PageFooter from './components/PageFooter.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    SearchParameters,
    PageFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



</style>
