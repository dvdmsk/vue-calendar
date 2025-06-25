<script setup lang="ts">
import ArrowDownIco from './icons/ArrowDownIco.vue';
import BellIco from './icons/BellIco.vue';
import ChatRoundedIco from './icons/ChatRoundedIco.vue';
import HelpIco from './icons/HelpIco.vue';
import SearchInput from './SearchInput.vue';



</script>

<template>
  <header class="header">
    <SearchInput class="header__input"/>

    <div class="header__controls">
      <div class="header__control">
        <div class="header__button"><HelpIco /></div>
        <div class="header__button"><ChatRoundedIco /></div>
        <div class="header__button"><BellIco /> <div class="header__notification"></div></div>
      </div>

      <div class="header__user">
        <p class="header__user-name">John Doe</p>
        <ArrowDownIco />
        <img src="./../assets/img/Avatar/Avatar@2x.png" alt="user" class="header__user-avatar">
      </div>
    </div>
  </header>
</template>
