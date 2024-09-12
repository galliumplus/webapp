<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Card from '@/components/cards/Card.vue'
import dayjs from 'dayjs'

const time = ref('')
const date = ref('')
let timer: number

const updateTime = () => {
  const now = dayjs()
  time.value = now.format('HH:mm')
  date.value = now.format('dddd D MMMM')
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <Card>
    <h2>Outils</h2>
    <div class="g-row">
      <slot />
    </div>
  </Card>
</template>

<style scoped lang="scss"></style>
