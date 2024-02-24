<template>
  <div class="home">
    <h3 class="mt-3">您現在在前台首頁</h3>
    <div id="scene">
      <div data-depth="0.2"><img src="https://hips.hearstapps.com/hmg-prod/images/first-day-of-winter-solstice-2021-1638278570.jpg?crop=1xw:0.8995202558635395xh;center,top&resize=1200:*" alt="winter" class="w-50"></div>
      <div data-depth="0.6">前台施工中</div>
    </div>
  </div>
</template>

<script>

import Parallax from 'parallax-js' // 導入 Parallax

export default {
  mounted () {
    const scene = document.getElementById('scene') // 指定運作的區塊
    this.parallaxInstance = new Parallax(scene)
  }
}
</script>

<style>

</style>
