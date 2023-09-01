<template>
  <div class="hero is-info">
    <div class="hero-body has-text-centered">
      <h1 class="title">{{title}}</h1>
      <h2 v-if="hasSubtitle" class="subtitle">{{ subtitle }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleArea",
  props: {
    title: String,
    subtitle: String,
    hasSubtitle: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>

</style>