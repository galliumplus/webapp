<script setup lang="ts">
import {
  arrow,
  type MaybeElement,
  offset,
  type Placement,
  type ReferenceElement,
  useFloating
} from '@floating-ui/vue'
import { computed, type Ref, ref, type StyleValue, toRef, useTemplateRef } from 'vue'

interface Props {
  attachedTo: MaybeElement<ReferenceElement>
  shown: boolean
  message: string
  placement: Placement
  color?: 'primary' | 'secondary' | 'error'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'secondary'
})

const target = toRef(props, 'attachedTo')
const tooltip = useTemplateRef<HTMLSpanElement>('tooltip')
const tooltipArrow = useTemplateRef<HTMLSpanElement>('tooltip-arrow')

const { floatingStyles, middlewareData, placement } = useFloating(target, tooltip, {
  placement: props.placement,
  middleware: [offset(10), arrow({ element: tooltipArrow })]
})

const arrowFloatingStyles = computed<StyleValue>(() => {
  if (middlewareData.value.arrow) {
    const { x: arrowX, y: arrowY } = middlewareData.value.arrow

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right'
    }[placement.value.split('-')[0] as 'top' | 'right' | 'bottom' | 'left']

    return {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-6px'
    }
  } else {
    return {}
  }
})
</script>

<template>
  <Transition>
    <span
      class="tooltip"
      :class="'tooltip-' + color"
      v-if="shown"
      ref="tooltip"
      role="tooltip"
      :style="floatingStyles"
    >
      {{ message }}
      <span class="arrow" ref="tooltip-arrow" :style="arrowFloatingStyles"></span>
    </span>
  </Transition>
</template>

<style scoped lang="scss">
@use '@/assets/style/colors.scss';

.tooltip {
  padding: 0.25rem 0.5rem;
  transition: opacity 0.2s;
  box-shadow: 0 0.1rem 0.3rem #0004;
  position: fixed;
  white-space: nowrap;

  &.tooltip-primary {
    --tooltip-bg: #{colors.$primary};
    background-color: var(--tooltip-bg);
    color: colors.$on-primary;
  }

  &.tooltip-secondary {
    --tooltip-bg: #{colors.$secondary};
    background-color: var(--tooltip-bg);
    color: colors.$on-secondary;
  }

  &.tooltip-error {
    --tooltip-bg: #{colors.$error};
    background-color: var(--tooltip-bg);
    color: colors.$on-error;
  }

  .arrow {
    position: absolute;
    background-color: var(--tooltip-bg);
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
