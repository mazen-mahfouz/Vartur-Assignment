<template>
  <v-app>
    <!-- Sidebar -->
    <app-sidebar 
      :rail="sidebarRail"
      @update:rail="sidebarRail = $event"
    />
    
    <!-- Navbar -->
    <app-navbar :toggle-sidebar="toggleSidebar" />
    
    <!-- Main Content -->
    <v-main class="main-content">
      <v-container fluid class="pa-0 fill-height">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppNavbar from '@/components/AppNavbar.vue'

const sidebarRail = ref(false)

const toggleSidebar = () => {
  sidebarRail.value = !sidebarRail.value
}
</script>

<style scoped>
.main-content {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: var(--navbar-height, 64px);
}

@media only screen and (max-width: 768px) {
  :deep(.v-container--fluid){
    padding: 5px !important;
  }
}
</style> 