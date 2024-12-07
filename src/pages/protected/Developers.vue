<script setup lang="ts">
import Card from '@/components/cards/Card.vue'
import Zincon from '@/components/basic/Zincon.vue'

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
@import '@/assets/style/mixins';

.background {
  padding: 1rem;

  &.bright {
    color: $--bright-on-surface;
    background-color: $--bright-surface;
    @include context-bright;
  }

  &.bright-container {
    color: $--bright-on-surface-container;
    background-color: $--bright-surface-container;
    @include context-bright;
  }

  &.dark {
    color: $--dark-on-surface;
    background-color: $--dark-surface;
    @include context-dark;
  }

  &.dark-container {
    color: $--dark-on-surface-container;
    background-color: $--dark-surface-container;
    @include context-dark;
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
    color: $on-primary;
    background-color: $primary;
    border-color: $primary-shadow;
  }

  &.secondary {
    color: $on-secondary;
    background-color: $secondary;
    border-color: $secondary-shadow;
  }

  &.tertiary {
    color: $on-tertiary;
    border: none;

    &.variant-a {
      background-color: $tertiary-a;
    }

    &.variant-b {
      background-color: $tertiary-b;
    }

    &.variant-c {
      background-color: $tertiary-c;
    }

    &.variant-d {
      background-color: $tertiary-d;
    }

    &.variant-e {
      background-color: $tertiary-e;
    }
  }

  &.error {
    color: $on-error;
    background-color: $error;
    border-color: $error-shadow;
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
