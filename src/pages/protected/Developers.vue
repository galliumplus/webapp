<script setup lang="ts">
import Card from '@/components/cards/Card.vue'
import Zincon from '@/components/basic/Zincon.vue'
</script>

<template>
  <div class="g-row g-align-start">
    <Card>
      <h2>Tailles d'icônes</h2>
      <div>
        <Zincon of="zn" size="small"></Zincon>
        petit
      </div>
      <div>
        <Zincon of="zn" size="medium"></Zincon>
        moyen
      </div>
      <div>
        <Zincon of="zn" size="large"></Zincon>
        grand
      </div>
      <div>
        <Zincon of="zn" size="huge"></Zincon>
        énorme
      </div>
    </Card>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/mixins';
</style>
