<script setup lang="ts">
import Card from '@/components/cards/Card.vue'

const backgrounds = [
  { cls: 'bright', desc: 'Fond clair' },
  { cls: 'bright-container', desc: 'Fond de conteneur clair' },
  { cls: 'dark', desc: 'Fond sombre' },
  { cls: 'dark-container', desc: 'Fond de conteneur sombre' }
]
</script>

<template>
  <div class="g-row g-align-start">
    <Card class="g-grow">
      <h2>Couleurs</h2>
      <div class="g-row g-no-gap">
        <div
          v-for="bg in backgrounds"
          :class="'g-grow-shrink-1 g-column g-center background ' + bg.cls"
        >
          <h3>{{ bg.desc }}</h3>

          <div>
            <p>Texte normal</p>
            <p class="text primary">Texte primaire</p>
            <p class="text secondary">Texte secondaire</p>
            <p class="text error">Texte erreur</p>
          </div>

          <div class="color-box primary">Primaire</div>
          <div class="color-box secondary">Secondaire</div>
          <div class="g-row g-no-gap">
            <div class="color-box tertiary variant-a g-grow">Tertiaire A</div>
            <div class="color-box tertiary variant-b">B</div>
            <div class="color-box tertiary variant-c">C</div>
            <div class="color-box tertiary variant-d">D</div>
            <div class="color-box tertiary variant-e">E</div>
          </div>
          <div class="color-box error">Erreur</div>
          <div class="color-box error-container">Conteneur d'erreur</div>
          <div class="color-box surface">Surface</div>
          <div class="color-box surface-container">Conteneur de surface</div>
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/style/utils';
@use '@/assets/style/colors';

.background {
  padding: 1rem;

  &.bright {
    @include colors.context-bright;
    color: var(--on-surface);
    background-color: var(--surface);
  }

  &.bright-container {
    @include colors.context-bright;
    color: var(--on-surface-container);
    background-color: var(--surface-container);
  }

  &.dark {
    @include colors.context-dark;
    color: var(--on-surface);
    background-color: var(--surface);
  }

  &.dark-container {
    @include colors.context-dark;
    color: var(--on-surface-container);
    background-color: var(--surface-container);
  }

  h3 {
    font-size: 12pt;
    margin: 0;
  }
}

.color-box {
  padding: 0.5rem 1rem;
  border-bottom: 4px solid;

  &.primary {
    color: colors.$on-primary;
    background-color: colors.$primary;
    border-color: colors.$primary-shadow;
  }

  &.secondary {
    color: colors.$on-secondary;
    background-color: colors.$secondary;
    border-color: colors.$secondary-shadow;
  }

  &.tertiary {
    color: colors.$on-tertiary;
    border: none;

    &.variant-a {
      background-color: colors.$tertiary-a;
    }

    &.variant-b {
      background-color: colors.$tertiary-b;
    }

    &.variant-c {
      background-color: colors.$tertiary-c;
    }

    &.variant-d {
      background-color: colors.$tertiary-d;
    }

    &.variant-e {
      background-color: colors.$tertiary-e;
    }
  }

  &.error {
    color: colors.$on-error;
    background-color: colors.$error;
    border-color: colors.$error-shadow;
  }

  &.error-container {
    color: var(--on-error-container);
    background-color: var(--error-container);
    border-color: var(--error-container-shadow);
  }

  &.surface {
    color: var(--on-surface);
    background-color: var(--surface);
    border-color: var(--surface-shadow);
  }

  &.surface-container {
    color: var(--on-surface-container);
    background-color: var(--surface-container);
    border-color: var(--surface-container-shadow);
  }
}

p {
  margin: 0;
  padding: 0;
}

.text {
  &.primary {
    color: var(--primary-content);
  }

  &.secondary {
    color: var(--secondary-content);
  }

  &.error {
    color: var(--error-content);
  }
}
</style>
