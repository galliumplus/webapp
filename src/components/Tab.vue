<script setup lang="ts">
interface Props {
  link: string
  label: string
  icon: string
}

const props = defineProps<Props>()
</script>

<template>
  <RouterLink :to="link">
    <img :src="icon" />
    {{ label }}
    <div class="underline"></div>
  </RouterLink>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors.scss';
@import '@/assets/style/mixins.scss';

$transition-duration: 0.17s;

a {
  padding: 8px 4px 0 4px;
  overflow: hidden;

  font-size: 0.8rem;
  color: $less-bright;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;

  transition: $transition-duration color;

  &.router-link-exact-active {
    color: $bright;
    img {
      filter: none;
    }
    .underline {
      top: 0;
    }
  }
}

img {
  display: block;
  width: 100%;
  height: 32px;
  margin-bottom: 4px;
  object-fit: contain;
  filter: grayscale(1);
}

.underline {
  margin: 2px 14px 0px 14px;
  height: 3px;
  background-color: $orange;
  position: relative;
  top: 3px;
  transition: $transition-duration top;
}
</style>
