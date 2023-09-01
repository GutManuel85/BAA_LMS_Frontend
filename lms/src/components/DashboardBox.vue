<template>
  <div class="column has-background-light mb-5 mr-3">
    <div class="box">
      <p class="box_title1 title is-5 has-text-centered has-text-primary">{{ titleFirstLine }}</p>
      <p class="title is-5 has-text-centered has-text-primary">{{ titleSecondLine }}</p>
      <hr class="is-divider">
      <p class="subtitle is-1 has-text-centered has-text-primary">{{ content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardBox",
  props: {
    titleFirstLine: String,
    titleSecondLine: String,
    content: String,
  }
}
</script>

<style scoped>

.box_title1{
  margin-bottom: 1px !important;
}

</style>