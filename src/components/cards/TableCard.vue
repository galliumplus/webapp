<script setup lang="ts">
import Card from '@/components/cards/Card.vue'

interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <Card class="table-card g-column g-no-gap">
    <h2>{{ title }}</h2>
    <div class="scroll-box">
      <table>
        <!--<colgroup>
          <col v-for="col in columns" :class="col[2]" />
        </colgroup>-->
        <thead>
          <tr>
            <slot name="header" />
          </tr>
        </thead>
        <tbody>
          <slot name="rows" />
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
