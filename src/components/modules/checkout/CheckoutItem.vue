<script setup lang="ts"></script>

<template>
  <div class="container">
    <!--TODO mettre l'image de l'article ici-->
    <div class="picture no-picture"></div>
    <div class="name">Coca-Cola 33cL</div>
    <div class="price">
      <span class="price-left">1,00&nbsp;€</span>
      <span class="price-separator"></span>
      <span class="price-right">0,80&nbsp;€</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/style/colors';
@use '@/assets/style/utils';

.container {
  padding: 0 1rem;
  @include utils.flexbox(column, center);
}

.picture {
  width: 5rem;
  height: 5rem;
}

.no-picture {
  background-color: #4f5763;
}

.price {
  align-self: stretch;
  @include utils.flexbox(row);
}

.price-left {
  text-align: right;
  padding-right: 0.5rem;
  flex: 1 1 0;
}

.price-separator {
  border-left: 2px solid colors.$secondary;
}

.price-right {
  text-align: left;
  padding-left: 0.5rem;
  flex: 1 1 0;
}
</style>
