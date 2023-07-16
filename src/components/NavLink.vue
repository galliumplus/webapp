<script setup lang="ts">
import { ref, onMounted } from 'vue'
import store from '../store'

interface Props {
  to: string
  target: string
}

let props = defineProps<Props>()

let prefix = ref('Aller à')
let cls = ref('fwd')
let realHref = ref(props.to)

onMounted(() => {
  if (props.target == store.previousRouteName) {
    prefix.value = 'Retour à'
    cls.value = 'back'
    realHref.value = store.previousRouteUrl
  }
})
</script>

<template>
  <RouterLink :to="realHref" :class="cls">{{ prefix }} <slot /></RouterLink>
</template>
