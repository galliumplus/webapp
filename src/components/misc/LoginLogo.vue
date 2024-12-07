<script setup lang="ts">
import type { LoginClient } from '@/business/clients'
import { computed } from 'vue'
import questionBlockImage from '@/assets/images/question-block.svg'

interface Props {
  client: LoginClient | null
}

const props = defineProps<Props>()

const error = computed(() => props.client == null)
const otherIcon = computed(() => props.client == null || !props.client.isSelf)

function failedToLoadLogo(ev: Event) {
  ;(ev.target as HTMLImageElement).src = questionBlockImage
}
</script>

<template>
  <div>
    <img v-if="error" src="@/assets/images/cross-bright.min.svg" alt="croix" />
    <img
      v-else-if="otherIcon"
      :src="client?.logoUrl ?? questionBlockImage"
      @error="failedToLoadLogo"
      :alt="'logo de ' + client?.name"
    />
    <img
      v-else
      src="@/assets/images/gallium-plus-logo-compact-bright.min.svg"
      alt="logo de Gallium Plus"
    />
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
