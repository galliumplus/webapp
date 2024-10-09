<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Card from '@/components/cards/Card.vue'
import dayjs from 'dayjs'

const time = ref('')
const dayOfWeek = ref('')
const date = ref(0)
const month = ref('')
let timer: number

function updateTime() {
  const now = dayjs()
  time.value = now.format('HH:mm')
  dayOfWeek.value = now.format('dddd')
  date.value = now.date()
  month.value = now.format('MMMM')
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
    <span class="date">
      {{ dayOfWeek }}
      <template v-if="date == 1">1<sup>er</sup></template>
      <template v-else>{{ date }}</template>
      {{ month }}
    </span>
  </Card>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 400px;
}

.time,
.date {
  margin: 0.5rem;
}

.time {
  font-size: 36pt;
}
</style>
