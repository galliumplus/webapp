<script setup lang="ts">
import Card from '@/components/cards/Card.vue'

export type Columns = [string, string, string][]

interface Props {
  title: string
  columns: Columns
}

defineProps<Props>()
</script>

<template>
  <Card class="table-card g-column g-no-gap">
    <h2>{{ title }}</h2>
    <div class="scroll-box">
      <table>
        <colgroup>
          <col v-for="col in columns" />
        </colgroup>
        <thead>
          <tr>
            <th v-for="col in columns" :class="'g-' + col[1]">{{ col[0] }}</th>
          </tr>
        </thead>
        <tbody>
          <slot />
        </tbody>
      </table>
    </div>
  </Card>
</template>

<style scoped lang="scss">
.scroll-box {
  overflow-y: auto;
}

thead th {
  position: sticky;
  top: 0;
}
</style>
