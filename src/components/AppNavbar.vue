<template>
  <v-app-bar
    class="modern-navbar"
    elevation="0"
    height="64"
    color="white"
  >
    <v-app-bar-nav-icon
      @click="toggleSidebar"
      color="grey-darken-1"
      class="toggle-icon ml-1"
    ></v-app-bar-nav-icon>
    
    <div class="d-flex align-center">
      <h1 class="text-h6 font-weight-medium text-grey-darken-3 ml-3">{{ pageTitle }}</h1>
    </div>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  toggleSidebar: {
    type: Function,
    required: true
  }
})

const route = useRoute()
const authStore = useAuthStore()

const pageTitle = computed(() => {
  switch (route.name) {
    case 'home':
      return 'Dashboard'
    case 'categories':
      return 'Categories'
    case 'products':
      return 'Products'
    case 'users':
      return 'Users'
    default:
      return 'Vartur'
  }
})

</script>

<style scoped>
.modern-navbar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background-color: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(10px);
}

.toggle-icon {
  transition: transform 0.2s ease;
}

.toggle-icon:hover {
  transform: scale(1.05);
  color: rgb(var(--v-theme-primary)) !important;
}

</style> 