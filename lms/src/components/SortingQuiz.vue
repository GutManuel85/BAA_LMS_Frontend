<template>
  <h4 class="title is-4">
    <span class="icon is-size-2 mr-2 has-text-primary"><i class="fa-solid fa-circle-question"></i></span>
    Quiz: {{ title }}
  </h4>
  <p v-html="textArea"></p>
  <draggable
      v-model="mixedUpList"
      group="people"
      @start="drag=true"
      @end="drag=false"
      item-key="id">
    <template #item="{element}">
      <div class="card has-background-primary-light mb-1 mt-1">
        <div class="card-content pb-2 pt-2">
          <div class="media">
            <div class="media-content">
              <p class="has-text-primary">{{ element }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </draggable>
  <check-solution-button :is-correct="isCorrect" @check-solution="checkSolution"></check-solution-button>
  <div v-if="this.isCorrect">
    <quiz-pop-up ref="popUp" :points="points" :max-points="maxPoints" :is-correct="isCorrect">
      <img class="gif" :src="gifWin" alt="gif_win">
    </quiz-pop-up>
  </div>
  <div v-else>
    <quiz-pop-up class="is-half" ref="popUp" :points="points" :max-points="maxPoints" :is-correct="isCorrect">
      <img class="gif" :src="gifLose" alt="gif_lose">
    </quiz-pop-up>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import QuizPopUp from "@/components/QuizPopUp";
import axios from "axios";
import CheckSolutionButton from "@/components/CheckSolutionButton";

export default {
  name: "SortingQuiz",
  components: {CheckSolutionButton, QuizPopUp, draggable},
  props: {
    elements: {
      type: Array,
      optional: false
    },
    title: String,
    textArea: String
  },
  mounted() {
    this.mixUpRandom();
    this.points = this.mixedUpList.length * 10;
    this.maxPoints = this.points;
  },
  data() {
    return {
      drag: false,
      solution: [...this.elements],
      mixedUpList: [...this.elements],
      isCorrect: false,
      maxPoints: null,
      points: null,
      minusPoints: 10,
      gifWin: null,
      gifLose: null,
    };
  },
  methods: {
    mixUpRandom() {
      this.mixedUpList.sort(() => Math.random() - 0.5);
    },
    checkSolution() {
      this.isCorrect = this.mixedUpList.every((element, index) => element === this.solution[index]);
      if (!this.isCorrect) {
        if (this.points >= this.minusPoints) {
          this.points = this.points - this.minusPoints;
        }
      }else{
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
      console.log(this.mixedUpList);
      console.log(this.solution);
    },
    callShowPopUp() {
      console.log("show pop up clicked on parent");
      this.$nextTick(() => {
        this.$refs.popUp.showPopUp();
        this.gifWin = this.$refs.popUp.getRandomGifWin();
        this.gifLose = this.$refs.popUp.getRandomGifLose();
        console.log(this.gifWin);
        console.log(this.gifLose);
      });
    },
  }
};
</script>

<style scoped>

.gif{
  max-height: 200px;
}

</style>
