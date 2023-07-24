<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter();

const selectedIndicator = ref<HTMLDivElement | null>(null)
</script>


<template>
  <nav>
    <slot/>
  </nav>
</template>

<style scoped lang="scss">
@import "@/assets/style/colors.scss";
@import "@/assets/style/mixins.scss";

nav {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;

    &:deep(> *){
        flex-grow: 1;
    }

    background-color: $dark;
}
</style>