<script setup lang="ts">
import ApplicationsCard from '@/components/modules/applications/ApplicationsCard.vue'
import RolesCard from '@/components/modules/roles/RolesCard.vue'
</script>

<template>
  <div class="g-row">
    <div class="g-column g-w-50">
      <ApplicationsCard />
    </div>
    <div class="g-column g-w-50">
      <RolesCard />
    </div>
  </div>
</template>
