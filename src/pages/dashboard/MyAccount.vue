<script setup lang="ts">
  import {ref, onMounted} from 'vue'
import LoadingBlock from "@/components/LoadingBlock.vue"
import { useApi } from '@/composables'
import {User} from "@/logic"

const api = useApi()
const userInfo = ref<User|null>(null)

onMounted(async () => {
  userInfo.value = await api.users.self()
})
</script>

<template>
  <LoadingBlock class="account-info-block" :when="userInfo === null">
    <div class="account-info-name">{{userInfo?.name ?? "..."}}</div>
  </LoadingBlock>
</template>

<style lang="scss">
.account-info-block {
  margin: 14px;
}

.account-info-name {
  font-size: 1.5rem;
}
</style>
