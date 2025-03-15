<script setup lang="ts">
import { ref } from 'vue'
import RadioButton from '@/components/basic/RadioButton.vue'
import PopUpHeader from '@/components/popups/PopUpHeader.vue'
import { useThisPopUp } from '@/composables'

const popup = useThisPopUp()

const test = ref('')
</script>

<template>
  <PopUpHeader></PopUpHeader>
  <main>
    <p></p>
    <RadioButton group="test" v-model="test" value="a" label="Option A"></RadioButton>
    <RadioButton group="test" v-model="test" value="b" label="Option B"></RadioButton>
    <RadioButton group="test" v-model="test" value="c" label="Option C"></RadioButton>
    <RadioButton group="test" v-model="test" value="d" label="Option D"></RadioButton>
  </main>
</template>

<style scoped lang="scss"></style>
