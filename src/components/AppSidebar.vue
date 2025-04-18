<template>
  <v-navigation-drawer
    v-model="drawer"
    v-model:rail="rail"
    elevation="0"
    color="white"
    class="app-sidebar"
    permanent
  >
    <!-- Logo -->
    <div class="sidebar-header py-0 px-4">
      <div class="d-flex align-center" style="height: 64px;">
        <div class="logo-wrapper mr-3">
          <v-icon
            icon="mdi-cube-outline"
            size="22"
            color="primary"
          ></v-icon>
        </div>
        <span v-if="!rail" class="logo-text font-weight-bold">Vartur</span>
      </div>
    </div>

    <v-divider></v-divider>

    <!-- Navigation Menu -->
    <v-list class="px-1 pt-4" nav density="compact">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        :value="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        rounded="lg"
        class="mb-2"
        active-class="active-item"
      ></v-list-item>
    </v-list>

    <!-- User Profile Section -->
    <template v-slot:append>
      <div class="user-profile px-4 py-3">
        <v-divider class="mb-3"></v-divider>
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-avatar size="32" color="primary" variant="flat">
              {{ userInitials }}
            </v-avatar>
            <div v-if="!rail" class="ml-3">
              <div class="text-body-2 font-weight-medium">{{ userName }}</div>
            </div>
          </div>
          <v-btn
            variant="text"
            icon="mdi-logout"
            size="small"
            color="grey-darken-1"
            @click="handleLogout"
            class="ml-2"
          ></v-btn>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  rail: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:rail'])

const router = useRouter()
const authStore = useAuthStore()

const drawer = ref(true)

const rail = computed({
  get: () => props.rail,
  set: (value) => {
    emit('update:rail', value)
  }
})

const menuItems = [
  { 
    title: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    to: '/',
  },
  { 
    title: 'Categories',
    icon: 'mdi-format-list-text',
    to: '/categories',
  },
  { 
    title: 'Products',
    icon: 'mdi-package-variant-closed',
    to: '/products',
  }
]

const userName = computed(() => authStore.currentUser?.name || 'Admin User')
const userInitials = computed(() => userName.value.charAt(0))

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.05) !important;
}

.sidebar-header {
  display: flex;
  align-items: center;
  border-bottom: 0;
}

.logo-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgb(var(--v-theme-primary), 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.25rem;
  background: linear-gradient(45deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.v-list-item) {
  min-height: 40px !important;
  margin-bottom: 4px;
  font-weight: 500;
}

:deep(.active-item) {
  background: rgb(var(--v-theme-primary), 0.1) !important;
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: 600;
}

:deep(.active-item .v-icon) {
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: bold;
}

:deep(.v-list-item:not(.active-item):hover) {
  background: rgba(var(--v-border-color), 0.08) !important;
}

.user-profile {
  border-top: 0;
}
</style> 