<template>
  <circle-progress
      :percent=null
      :size=100
      :border-width=8
      :border-bg-width=15
      :transition=1500
      :is-gradient=true
      :show-percent=true
      :gradient="{
        angle: 20,
        startColor: '#009900',
        stopColor: '#7CFC00'}">
  </circle-progress>
</template>

<script>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

export default {
  name: "ProgressCircle",
  components: {CircleProgress},
}
</script>

<style scoped>

</style>