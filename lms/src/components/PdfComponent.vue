<template>
  <div class="pdf-container">
    <iframe
        ref="iframe"
        :src="pdf_path"
        width="80%"
        :height="iframeHeight"
        title="pdf">
    </iframe>
  </div>
</template>

<script>
export default {
  name: "PdfComponent",
  props: {
    pdf_path: String
  },
  data() {
    return {
      width: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      const element = this.$refs.iframe
      this.width = element.offsetWidth
    })
  },
  computed: {
    iframeHeight() {
      const containerHeight = this.width / 29.7 * 22.5
      console.log(containerHeight);
      return `${containerHeight}px`;
    },
  },
}
</script>

<style scoped>

</style>