<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">導覽頁面</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin" class="nav-link">後台</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/products" class="nav-link">前台產品列表</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/cart" class="nav-link">前台購物車</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <RouterView />
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
