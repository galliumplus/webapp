<script setup lang="ts">
import PermissionSwitch from '@/components/basic/PermissionSwitch.vue'
import { GalliumPermission } from '@/business/users'

interface Props {
  allowNeutral?: boolean
}

const props = withDefaults(defineProps<Props>(), { allowNeutral: false })

const allowedModel = defineModel<number>('allowed')
const grantedModel = defineModel<number>('granted')

function hasPermission(perms: number | undefined, flag: GalliumPermission): boolean {
  return perms !== undefined && flag.in(perms)
}

function updatePermission(
  perms: number | undefined,
  flag: GalliumPermission,
  value: boolean | undefined
): number {
  return value ? flag.addTo(perms ?? 0) : flag.removeFrom(perms ?? 0)
}

interface PermissionInfo {
  flag: GalliumPermission
  name: string
  description: string
}

const PermissionsList: PermissionInfo[] = [
  {
    flag: GalliumPermission.SeeProductsAndCategories,
    name: 'can-see-products-and-categories',
    description: 'Voir les articles et catégories'
  },
  {
    flag: GalliumPermission.ManageProducts,
    name: 'can-manage-products',
    description: 'Gérer les articles'
  },
  {
    flag: GalliumPermission.ManageCategories,
    name: 'can-manage-categories',
    description: 'Gérer les catégories'
  },
  {
    flag: GalliumPermission.SeeAllUsersAndRoles,
    name: 'can-see-all-users-and-roles',
    description: 'Voir tous les utilisateurs et rôles'
  },
  {
    flag: GalliumPermission.ManageDeposits,
    name: 'can-manage-deposits',
    description: "Ajouter/retirer de l'argent sur les acomptes"
  },
  {
    flag: GalliumPermission.ManageUsers,
    name: 'can-manage-users',
    description: 'Gérer les utilisateurs'
  },
  {
    flag: GalliumPermission.ManageRoles,
    name: 'can-manage-roles',
    description: 'Gérer les rôles'
  },
  {
    flag: GalliumPermission.ReadLogs,
    name: 'can-read-logs',
    description: 'Lire les logs'
  },
  {
    flag: GalliumPermission.ManageClients,
    name: 'can-manage-clients',
    description: 'Gérer les applications'
  },
  {
    flag: GalliumPermission.UseDeveloperTools,
    name: 'can-use-developer-tools',
    description: 'Utiliser les outils de développement'
  }
]

const ComputedPermissionsList: PermissionInfo[] = [
  {
    flag: GalliumPermission.Sell,
    name: 'can-sell',
    description: 'Effectuer des ventes (Gestion articles + acomptes)'
  }
]
</script>

<template>
  <div class="grid">
    <PermissionSwitch
      v-for="perm in PermissionsList"
      :name="perm.name"
      :label="perm.description"
      :allow-neutral="allowNeutral"
      :granted="hasPermission(grantedModel, perm.flag)"
      @update:granted="grantedModel = updatePermission(grantedModel, perm.flag, $event)"
      :allowed="hasPermission(allowedModel, perm.flag)"
      @update:allowed="allowedModel = updatePermission(allowedModel, perm.flag, $event)"
    />
  </div>
  <div class="g-column">
    <PermissionSwitch
      v-for="perm in ComputedPermissionsList"
      :name="perm.name"
      :label="perm.description"
      :allow-neutral="allowNeutral"
      disabled
      :granted="hasPermission(grantedModel, perm.flag)"
      :allowed="hasPermission(allowedModel, perm.flag)"
    />
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  grid-auto-flow: row;
  margin-bottom: 1rem;
}
</style>
