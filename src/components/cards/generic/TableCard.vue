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
  <Card class="table-card">
    <h2>{{ title }}</h2>
    <table>
      <colgroup>
        <col v-for="col in columns" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="col in columns" :class="'align-' + col[1]">{{ col[0] }}</th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </Card>
</template>

<style scoped lang="scss">
table {
  width: 100%;
  border-collapse: collapse;
}

th.align-left {
  text-align: left;
}
</style>
