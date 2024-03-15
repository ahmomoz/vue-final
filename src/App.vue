<template>
  <RouterView/>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
export default {
  data () {
    return {
    }
  },
  mounted () {
    AOS.init()
    AOS.init({
      duration: 1800
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/all.scss";
body{
  font-family: "Noto Serif TC", serif;
  font-weight: 400;
  font-style: normal;
}
</style>
