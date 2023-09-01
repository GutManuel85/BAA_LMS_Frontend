<template>
  <div v-click-away="onClickAway">
    <div class="dropdown is-active" @click="this.shown = !this.shown">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span v-if="selectedValue===null">{{ initialValue }}</span>
          <span v-else>{{ selectedValue }}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu" v-if="shown">
        <div class="dropdown-content" v-for="item in dropdownItems" v-bind:key="item">
          <a href="#" class="dropdown-item" @click="this.selectedValue=item">
            {{ item }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {directive} from "vue3-click-away";

export default {
  mounted() {
    this.selectedValue = this.initialValue;
  },
  name: "DropdownMenu",
  props: {
    dropdownItems: Array,
    initialValue: String,
  },
  data() {
    return {
      shown: false,
      selectedValue: null,
    }
  },
  directives: {
    ClickAway: directive
  },
  methods: {
    onClickAway() {
      this.shown = false;
      this.$emit('valueChanged', this.selectedValue);
    }
  }
}

</script>


<style scoped>

</style>