<template>
  <div class="video-container">
    <iframe
        ref="iframe"
        title="youtube-video"
        :src="'https://www.youtube.com/embed/' + video_id"
        width="100%"
        :height="iframeHeight"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
        allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "YoutubeVideoComponent",
  props: {
    video_id: String
  },
  data() {
    return {
      width:''
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
      const containerHeight = this.width / 16 * 9
      console.log(containerHeight);
      return `${containerHeight}px`;
    },
  },
}
</script>
