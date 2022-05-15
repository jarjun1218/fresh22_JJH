<template>
  <Banner />
  <Footer />
</template>

<script>
import axios from 'axios'
import Banner from './components/Banner.vue'
import HomePage from './components/HomePage.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  data() {
    return {
      items: [],
    }
  },
  async mounted() {
    const response = await axios.get("localhost:5000/article")
    this.items = response.data
  },
  components: {
    Banner,
    HomePage,
    Footer,
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
  margin-top: 0px;
}
</style>
