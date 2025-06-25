<script setup lang="ts">
import SearchIco from "./icons/SearchIco.vue";
</script>

<template>
  <div class="search">
    <SearchIco class="search__ico" />

    <input
      type="text"
      class="search__input"
      placeholder="Search transactions, invoices or help"
    />
  </div>
</template>
