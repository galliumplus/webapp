<script setup lang="ts">
import { Done, type Progress } from '@/business/progress'

interface Props {
  progress: Progress
}

defineProps<Props>()
</script>

<template>
  <div class="slider">
    <template v-if="progress !== Done">
      <div class="foreground increment"></div>
      <div class="foreground decrement"></div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors.scss';

.slider {
  position: relative;
  width: 100%;
  height: 6px;
  overflow-x: hidden;
}

.hidden .foreground {
  height: 0;
}

.foreground {
  position: absolute;
  background: $accent;
  height: 6px;
}
.increment {
  animation: increase 2s infinite;
}
.decrement {
  animation: decrease 2s 0.5s infinite;
}

@keyframes increase {
  from {
    left: -5%;
    width: 5%;
  }
  to {
    left: 130%;
    width: 130%;
  }
}
@keyframes decrease {
  from {
    left: -80%;
    width: 80%;
  }
  to {
    left: 110%;
    width: 10%;
  }
}
</style>
