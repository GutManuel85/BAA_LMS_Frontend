<template>
    <nav-menu></nav-menu>
    <router-view/>
</template>

<style lang="scss">
@import "../node_modules/bulma";
@import "../my_styles";
</style>

<script>
import NavMenu from "@/components/NavMenu";

export default {
  components: {NavMenu}
}
</script>