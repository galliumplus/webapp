<template>
  <div>
    <img src="/src/assets/images/gallium-plus-logo-compact.svg" />
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/style/mixins.scss";

div {
  @include flexbox(row, center, center);
  height: 60px;

  img {
    height: 100%;
  }
}
</style>