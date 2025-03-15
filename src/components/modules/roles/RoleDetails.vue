<script setup lang="ts">
import { reactive, ref } from 'vue'
import TextInput from '@/components/basic/TextInput.vue'
import Zincon from '@/components/basic/Zincon.vue'
import PermissionsGrid from '@/components/forms/PermissionsGrid.vue'
import PopUpHeader from '@/components/popups/PopUpHeader.vue'
import type { Role } from '@/business/users'
import { useThisPopUp } from '@/composables'
import { useApi } from '@/composables/api'
import { Reason } from '@/helpers'

const popup = useThisPopUp()

let roleData = popup.getData<Role | undefined>()
let isNew = false
if (roleData === undefined) {
  roleData = useApi().roles.create()
  isNew = true
}
const role = reactive<Role>({ ...roleData })
const nameIsInvalid = ref(false)

async function save() {
  role.name = role.name.trim()
  if (role.name.length == 0) {
    nameIsInvalid.value = true
    window.setTimeout(() => (nameIsInvalid.value = false), 200)
  } else {
    nameIsInvalid.value = false
    await useApi().roles.save(role)
    popup.close(role)
  }
}

async function del() {
  await useApi().roles.delete(role)
  popup.dismiss(Reason.Deleted)
}
</script>

<template>
  <PopUpHeader />
  <main>
    <div class="g-column">
      <TextInput label="Intitulé" name="name" v-model="role.name" :is-invalid="nameIsInvalid" />
      <hr />
    </div>
    <div class="g-column">
      <h3 class="g-section-heading">Permissions</h3>
      <PermissionsGrid v-model:granted="role.permissions" />
    </div>
  </main>
  <footer class="g-row g-align-center">
    <div>
      <button v-if="!isNew" class="g-flat g-error" @click="del()">
        <Zincon of="delete" />
        Supprimer le rôle
      </button>
    </div>
    <div class="g-right g-grow">
      <button class="g-raised g-primary" @click="save()">Enregistrer</button>
    </div>
  </footer>
</template>
