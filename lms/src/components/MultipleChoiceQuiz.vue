<template>
  <h4 class="title is-4">
    <span class="icon is-size-2 mr-2 has-text-primary"><i class="fa-solid fa-circle-question"></i></span>
    Quiz: {{ title }}
  </h4>
  <p v-html="textArea"></p>
  <template v-for="(pair, index) in mixedUpList" :key="index">
    <div class="control">
      <label class="checkbox">
        <input class="is-primary" type="checkbox" :value="index" v-model="answerList[index]"/>
        {{ pair.answer }}
      </label>
    </div>
  </template>
  <check-solution-button :is-correct="isCorrect" @check-solution="checkSolution"></check-solution-button>
  <template v-if="this.isCorrect">
    <quiz-pop-up ref="popUp" :max-points="maxPoints" :points="points" :is-correct="isCorrect">
      <img class="gif" :src="gifWin" alt="gif_win">
    </quiz-pop-up>
  </template>
  <template v-else>
    <quiz-pop-up class="is-half" ref="popUp" :max-points="maxPoints" :points="points" :is-correct="isCorrect">
      <img class="gif" :src="gifLose" alt="gif_lose">
    </quiz-pop-up>
  </template>
</template>

<script>
import QuizPopUp from "@/components/QuizPopUp";
import axios from "axios";
import CheckSolutionButton from "@/components/CheckSolutionButton";

export default {
  name: "MultipleChoiceQuiz",
  components: {CheckSolutionButton, QuizPopUp},
  props: {
    pairs: {
      type: Array,
      optional: false
    },
    title: String,
    textArea: String
  },
  data() {
    return {
      isCorrect: false,
      points: null,
      maxPoints: 100,
      minusPoints: 20,
      gifWin: null,
      gifLose: null,
      mixedUpList: [...this.pairs],
      answerList: [false, false, false, false, false],
    }
  },
  mounted() {
    this.mixUpRandom();
    this.points = this.maxPoints;
  },
  methods: {
    mixUpRandom() {
      this.mixedUpList.sort(() => Math.random() - 0.5);
    },
    checkSolution() {
      console.log(this.answerList);
      this.isCorrect = true;
      for (let i = 0; i < this.answerList.length; i++) {
        if (this.answerList[i] !== this.mixedUpList[i].solution) {
          this.isCorrect = false;
        }
      }
      if (!this.isCorrect) {
        if (this.points >= this.minusPoints) {
          this.points = this.points - this.minusPoints;
        }
      } else {
        console.log(`Add ${this.points} points`);
        axios
            .put(`api/v1/courses/add-points/${this.points}/`)
            .then(response => {
              console.log(response.data);
              console.log(this.$store.state.user)
            })
            .catch(error => {
              console.log(error);
            });

      }
      this.callShowPopUp();
    },
    callShowPopUp() {
      console.log("show pop up clicked on parent");
      this.$nextTick(() => {
        this.$refs.popUp.showPopUp();
        this.gifWin = this.$refs.popUp.getRandomGifWin();
        this.gifLose = this.$refs.popUp.getRandomGifLose();
      });
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../my_styles.scss";

input[type='checkbox'] {
  accent-color: $primary;
}

.gif {
  max-height: 200px;
}

</style>