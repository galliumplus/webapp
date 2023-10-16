<script setup lang="ts">
import { RouterLink } from 'vue-router'

import NavLink from '@/components/NavLink.vue'
</script>

<template>
  <main class="public large">
    <h1>Aide à la connexion</h1>

    <details>
      <summary>Je n'ai pas de compte</summary>
      <!-- TODO: À rajouter à la rentrée 2024 ! --p>
        Si vous êtes adhérent à l'ETIQ, ou si vous avez été adhérent depuis 2023, vous possédez un
        compte Gallium+ et vos identifiants vous ont été remis après votre inscription. Si c'est la
        première fois que vous vous connectez et que vous ne vous souvenez plus de vos identifiants,
        adressez-vous au bureau de l'ETIQ ou à un administrateur.
      </p-->
      <p>
        Si vous avez été adhérent à partir de l'année universitaire 2022-2023, votre compte existe
        et vous pouvez demander vos identifiants au bureau ou à un administrateur.
      </p>
      <p>
        Si vous étiez adhérent avant 2022 ou si vous n'avez jamais été adhérent, vous pouvez faire
        une demande spéciale d'ouverture de compte auprès du bureau de l'ETIQ.
      </p>
    </details>

    <details>
      <summary>J'ai oublié mon mot de passe</summary>
      <p>
        Si vous avez oublié votre mot de passe, allez sur
        <RouterLink to="reset-password">la page de réinitialisation</RouterLink> et suivez les
        instructions. Dans certains cas, il peut être nécessaire de se présenter au local de l'ETIQ
        ou de contacter un administrateur.
      </p>
    </details>

    <details>
      <summary>J'ai oublié mon identifiant</summary>
      <p>
        Si vous êtes étudiant à l'IUT de Dijon, votre identifiant correspond normalement à votre
        identifiant IUT. Sinon, adressez-vous au bureau de l'ETIQ ou à un administrateur pour
        récupérer votre compte.
      </p>
    </details>

    <ul class="no-bullet">
      <li><NavLink to="/login" target="login">la page de connexion</NavLink></li>
      <li>
        <NavLink to="/login/reset-password" target="reset-password"
          >la réinitialisation de mot de passe</NavLink
        >
      </li>
    </ul>
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors.scss';
@import '@/assets/style/mixins.scss';

  details {
  padding: 10px 0;
  margin-bottom: 10px;

  border: solid $bright;
  border-width: 0 0 2px 0;

  summary {
    outline: none;
    cursor: pointer;
    transition: margin 160ms ease-out;
    position: relative;
    padding-right: 26px;

    text-align: left;
    list-style: none;
    @include allcaps;
    font-size: 0.9rem;
  }

  summary::after {
    content: '+';
    color: $bright;
    position: absolute;
    top: 0;
    right: 10px;
    font-size: larger;
  }

  p {
    margin: 10px 0 16px 0;
  }

  &[open] summary {
    margin-bottom: 20px;

    &::after {
      content: '−';
    }
  }
}
</style>