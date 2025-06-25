<script setup>
import HeaderMenu from "./components/HeaderMenu.vue";
import MenuAside from "./components/MenuAside.vue";
import MainContent from "./components/MainContent.vue";
</script>

<template>
  <div class="layout">
    <div class="layout__menu">
      <MenuAside />
    </div>

    <div class="layout__content">
      <HeaderMenu />

      <MainContent />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  height: calc(100% + 300px);

  &__content {
    padding-top: 70px;
    flex-grow: 1;
    background-color: #f0f0f7;
  }
}
</style>
