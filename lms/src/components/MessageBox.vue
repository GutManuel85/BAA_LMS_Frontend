<template>
    <div v-if="!isDeleted" v-bind:class="{hide: isDeleted}">
      <article v-bind:class="messageClasses">
        <div class="message-header is-centered">
          <p>{{ messageTitle }}</p>
          <button v-if="hasDeleteButton" class="delete" aria-label="delete" v-on:click="deleteMessage()"></button>
        </div>
        <div class="message-body">
          <slot></slot>
        </div>
      </article>
    </div>
</template>

<script>
export default {
  name: "MessageBox",
  data() {
    return {
      isDeleted: false,
    }
  },
  props: {
    messageTitle: String,
    color: String,
    hasDeleteButton: Boolean,
  },
  computed: {
    messageClasses() {
      return ['message', this.color ? `is-${this.color}` : ''];
    }
  },
  methods: {
    deleteMessage() {
      console.log("deleteMessage clicked")
      this.isDeleted = true;
    }
  }
}

</script>

<style scoped>

</style>