<script setup lang="ts">
import { computed } from 'vue'
import Zincon from '@/components/basic/Zincon.vue'

interface Props {
  name: string
  label?: string
  disabled?: boolean
  allowNeutral?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: 'off',
  disabled: false,
  allowNeutral: false
})

const allowedModel = defineModel<boolean>('allowed')
const grantedModel = defineModel<boolean>('granted')

const disallowedLabelId = computed(() => props.name + '-input-disallowed')
const allowedLabelId = computed(() => props.name + '-input-allowed')
const grantedLabelId = computed(() => props.name + '-input-granted')

const selectedOption = computed({
  get: () => {
    if (grantedModel.value) {
      return 'granted'
    } else if (allowedModel.value && props.allowNeutral) {
      return 'allowed'
    } else {
      return 'disallowed'
    }
  },
  set: (value) => {
    if (value === 'granted') {
      allowedModel.value = true
      grantedModel.value = true
    } else if (value === 'allowed') {
      allowedModel.value = true
      grantedModel.value = false
    } else {
      allowedModel.value = false
      grantedModel.value = false
    }
  }
})
</script>

<template>
  <div class="input-group">
    <div
      class="input"
      :class="{
        'input-disabled': disabled,
        'input-allowed': selectedOption === 'allowed',
        'input-granted': selectedOption === 'granted'
      }"
    >
      <input
        type="radio"
        :name="name"
        :id="disallowedLabelId"
        :disabled="disabled"
        value="disallowed"
        v-model="selectedOption"
      />
      <label :for="disallowedLabelId" class="label-disallowed">
        <Zincon of="cross" />
      </label>
      <template v-if="allowNeutral">
        <input
          type="radio"
          :name="name"
          :id="allowedLabelId"
          :disabled="disabled"
          value="allowed"
          v-model="selectedOption"
        />
        <label :for="allowedLabelId" class="label-allowed">
          <Zincon of="slash" />
        </label>
      </template>
      <input
        type="radio"
        :name="name"
        :id="grantedLabelId"
        :disabled="disabled"
        value="granted"
        v-model="selectedOption"
      />
      <label :for="grantedLabelId" class="label-granted">
        <Zincon of="check" />
      </label>
    </div>
    <div class="input-label">{{ label }}</div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/style/colors';
@use '@/assets/style/utils';

.input-group {
  @include utils.flexbox(row, center);
}

.input-label {
  flex-grow: 1;
}

.input {
  margin: 0 0.75rem;
  @include utils.flexbox(row, center);

  &.input-disabled {
    opacity: 0.6;
  }
}

input {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}

label {
  width: 1.2em;
  height: 1.2em;
  text-align: center;
  line-height: 0.8em;
  box-sizing: border-box;
  border: 2px solid colors.$secondary;

  .input-allowed & {
    border-color: colors.$primary-dim;
  }

  .input-granted & {
    border-color: colors.$primary;
  }

  &.label-disallowed {
    border-right-width: 0;
    padding-right: 2px;

    input:checked + & {
      background-color: colors.$secondary;
    }
  }

  &.label-allowed {
    border-right-width: 0;
    border-left-width: 0;

    input:checked + & {
      background-color: colors.$primary-dim;
    }
  }

  &.label-granted {
    border-left-width: 0;
    padding-left: 2px;

    input:checked + & {
      background-color: colors.$primary;
    }
  }

  > span {
    font-size: 0.8em;
  }
}
</style>
