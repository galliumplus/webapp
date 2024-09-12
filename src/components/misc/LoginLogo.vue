<script setup lang="ts">
import type { LoginClient } from '@/business/clients'
import { computed } from 'vue'
import crossImage from '@/assets/images/cross-bright.min.svg'

interface Props {
  client: LoginClient | null
}

const props = defineProps<Props>()

const otherIcon = computed(() => props.client == null || !props.client.isSelf)
const error = computed(() => props.client == null)

function failedToLoadLogo(ev: Event) {
  ;(ev.target as HTMLImageElement).src = crossImage
}
</script>

<template>
  <div>
    <img
      src="@/assets/images/gallium-plus-logo-compact-bright.min.svg"
      alt="logo de Gallium Plus"
    />

    <template v-if="otherIcon">
      <img src="@/assets/images/dots-bright.min.svg" alt="trois points" />

      <img v-if="error" src="@/assets/images/cross-bright.min.svg" alt="croix" />
      <img
        v-else
        :src="client?.logoUrl"
        @error="failedToLoadLogo"
        :alt="'logo de ' + client?.name"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

div {
  @include flexbox(row, center, center);
  height: 60px;
}
img {
  height: 100%;
}
</style>
