<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  tabs: string[]
}

const props = defineProps<Props>()

const selectedIndex = ref(0)
</script>

<template>
  <div class="container">
    <div class="header">
      <h2
        class="tab"
        v-for="(tab, idx) in tabs"
        :class="{ selected: idx == selectedIndex }"
        @click="selectedIndex = idx"
      >
        {{ tab }}
      </h2>
    </div>
    <div class="body g-grow">
      <slot :name="'tab-' + (selectedIndex + 1)" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/style/colors';
@use '@/assets/style/utils';

.container {
  @include utils.flexbox(column);
  margin-bottom: 6px;
}

.header {
  @include utils.flexbox(row);
  margin-top: 0.5rem;
}

.tab {
  flex: 1 1 0;
  padding: 1rem;
  font-size: 13pt;
  margin: 0;

  &:hover {
    background-color: colors.$secondary;
  }

  &.selected,
  &.selected:hover {
    background-color: var(--surface);
  }
}

.body > :deep(div) {
  margin: 0;
  height: 100%;
  box-sizing: border-box;
}
</style>
