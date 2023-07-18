<script setup lang="ts">
import { RouterLink } from 'vue-router'

import NavLink from '@/components/NavLink.vue'
</script>

<template>
  <div class="external-box large">
    <h1>Aide à la connexion</h1>

    <details>
      <summary>Je n'ai pas de compte</summary>
      <p>
        Si vous êtes adhérent à l'ETIQ, ou si vous avez été adhérent depuis 2023, vous possédez un
        compte Gallium+ et vos identifiants vous ont été remis après votre inscription. Si c'est la
        première fois que vous vous connectez et que vous ne vous souvenez plus de vos identifiants,
        adressez-vous au bureau de l'ETIQ ou à un administrateur.
      </p>
      <p>
        Si vous étiez adhérent durant l'année universitaire 2022-2023 et que vous n'avez pas
        renouvelé votre inscription, votre compte existe quand même et vous pouvez demander vos
        identifiants au bureau ou à un administrateur.
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

    <ul class="help-box">
      <li><NavLink to="/login" target="login">la page de connexion</NavLink></li>
      <li>
        <NavLink to="/login/reset-password" target="reset-password"
          >la réinitialisation de mot de passe</NavLink
        >
      </li>
    </ul>
  </div>
</template>
