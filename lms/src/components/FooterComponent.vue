/* eslint-disable */
<template>
  <div class="footer is-primary  has-text-centered">
    <div class="columns">
      <div class="column is-4">
        Migros-Genossenschafts-Bund <br>
        POS-Solutions
      </div>
      <div class="column is-4">
        Created by Manuel Gut <br>
        Bachelorarbeit HSLU B.Sc. Informatik
      </div>
      <div class="column is-4">
        <a href="mailto:manuel.gut@stud.hslu.ch">
          <span class="icon is-size-4 has-text-primary">
            <i class="fa-solid fa-envelope"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped lang="scss">
@import "../../my_styles.scss";

.footer {
  background-color: $primary-light;
  padding-bottom: 4rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>