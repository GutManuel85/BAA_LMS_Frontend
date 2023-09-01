<template>
  <div v-if="this.isCorrect">
    <pop-up message-title="Super gemacht!" color="success">
      <p v-if="points > 0" >Du verdienst <span class="has-text-weight-bold">{{ points }} Punkte</span>!</p>
      <p v-else>Zwar keine Punkte verdient, dafür aber umso mehr Respekt für deine Hartnäckigkeit!</p>
      <br>
      <slot></slot>
    </pop-up>
  </div>
  <div v-else>
    <pop-up message-title="Leider falsch. Versuch's nochmals!" color="warning">
      <p v-if="points > 0">Du kannst noch <span class="has-text-weight-bold">{{ points }} von {{ maxPoints }} Punkten </span>  verdienen.</p>
      <p v-else>Du kannst leider keine Punkte mehr verdienen. Doch wen interessieren schon diese blöden
        Punkte! Versuch's weiter!</p>
      <br>
      <slot></slot>
    </pop-up>
  </div>
</template>

<script>
import PopUp from "@/components/PopUp";

export default {
  name: "QuizPopUp",
  components: {PopUp},
  props: {
    messageTitle: String,
    color: String,
    maxPoints: Number,
    points: Number,
    isCorrect: Boolean
  },
  data() {
    return {
      gifPath: "",
      winGifs: [
        require('@/assets/gifs/Silvester_Skeleton.gif'),
        require('@/assets/gifs/Mario_applause.gif'),
        require('@/assets/gifs/Garfield.gif'),
        require('@/assets/gifs/Bear_roses.gif'),
        require('@/assets/gifs/Gameboy.gif')
      ],
      loseGifs: [
        require('@/assets/gifs/Nope.gif'),
        require('@/assets/gifs/Ninja_shorts.gif'),
        require('@/assets/gifs/Olaf_crying.gif'),
        require('@/assets/gifs/Teacher_Crying.gif'),
        require('@/assets/gifs/Chick.gif')
      ],
    }
  },
  mounted() {
    this.gifPath = "./../assets/gifs/"
  },
  methods: {
    showPopUp() {
      console.log("show pop up clicked on child");
      document.getElementById("overlay").style.display = "block";
    },
    getRandomGifWin() {
      return this.winGifs.sort(() => Math.random() - 0.5)[0];
    },
    getRandomGifLose() {
      return this.loseGifs.sort(() => Math.random() - 0.5)[0];
    },
  }
}
</script>

<style scoped>

#overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
  cursor: pointer;
}
</style>