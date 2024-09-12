<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Card from '@/components/cards/Card.vue'
import dayjs from 'dayjs'

const time = ref('')
const date = ref('')
let timer: number

function updateTime() {
  const now = dayjs()
  time.value = now.format('HH:mm')
  date.value = now.format('dddd D MMMM')
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <Card class="card">
    <span class="time">{{ time }}</span>
    <span class="date">{{ date }}</span>
  </Card>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 400px;
}

.time,
.date {
  margin: 10px;
}

.time {
  font-size: 36pt;
}
</style>
