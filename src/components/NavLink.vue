<script setup>
import { ref, onMounted } from 'vue'
import store from '../store'

let props = defineProps({
  to: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  }
})

let prefix = ref('Aller à')
let cls = ref('fwd')

onMounted(() => {
  if (props.target == store.previous) {
    prefix.value = 'Retour à'
    cls.value = 'back'
  }
})
</script>

<template>
  <RouterLink :to="to" :class="cls">{{ prefix }} <slot /></RouterLink>
</template>
