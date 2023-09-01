<template>
  <div class="mt-5">
    <button class="button is-primary" @click="callCheckSolution" :disabled="isCorrect">
      <template v-if="isCorrect">
        <span class="mr-4">Lösung überprüfen</span>
        <span class="icon is-small is-right">
          <i class="fa-regular fa-circle-check mr-4"></i>
        </span>
      </template>
      <template v-else>
        <span>Lösung überprüfen</span>
      </template>
    </button>
  </div>
</template>

<script>
export default {
  name: "CheckSolutionButton",
  props: {
    isCorrect: {
      type: Boolean,
      optional: false
    },
  },
  methods: {
    callCheckSolution() {
      this.$emit('check-solution');
    }
  }
}
</script>

<style scoped>

</style>