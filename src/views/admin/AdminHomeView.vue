<template>
<div class="container-fluid">
    <div class="row">
        <div class="col mt-4 text-end">
            <RouterLink to="/" class="nav-link text-primary fs-5">
            <i class="bi bi-arrow-up-left-square me-1"></i>
            跳轉至前台首頁
            </RouterLink>
        </div>
        </div>
        <div class="row g-4 row-cols-lg-4 mb-4 mt-2">
        <div class="col">
            <div class="card shadow-sm">
            <div class="card-body text-center">
                <RouterLink to="/dashboard/orders" class="text-decoration-none">
                <h3 class="display-7"><i class="bi bi-filter-square fs-4 me-2"></i>訂單管理</h3>
                </RouterLink>
            </div>
            </div>
        </div>
        <div class="col">
            <div class="card shadow-sm">
            <div class="card-body text-center">
                <RouterLink to="/dashboard/products" class="text-decoration-none">
                <h3 class="display-7"><i class="bi bi-handbag fs-4 me-2"></i>商品管理</h3>
                </RouterLink>
            </div>
            </div>
        </div>
        <div class="col">
            <div class="card shadow-sm">
            <div class="card-body text-center">
                <RouterLink to="/dashboard/articles" class="text-decoration-none">
                <h3 class="display-7"><i class="bi bi-card-text fs-4 me-2"></i>貼文管理</h3>
                </RouterLink>
            </div>
            </div>
        </div>
        <div class="col">
            <div class="card shadow-sm">
            <div class="card-body text-center">
                <RouterLink to="/dashboard/coupons" class="text-decoration-none">
                <h3 class="display-7"><i class="bi bi-tags fs-4 me-2"></i>優惠券管理</h3>
                </RouterLink>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
