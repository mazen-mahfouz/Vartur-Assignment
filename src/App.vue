

<template>
  <div class="app-wrapper">
    <template v-if="isReady">
      <template v-if="authStore.isLoggedIn">
        <main-layout>
          <router-view v-slot="{ Component, route }">
            <transition 
              :name="route.meta.transition || 'slide-fade'" 
              mode="out-in"
              appear
            >
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </main-layout>
      </template>
      
      <template v-else>
        <router-view v-slot="{ Component, route }">
          <transition 
            name="zoom-fade" 
            mode="out-in"
            appear
          >
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </template>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from './stores/auth'
import MainLayout from './layouts/MainLayout.vue'

const authStore = useAuthStore()
const isReady = ref(false)

onMounted(() => {
  authStore.initAuth()
  setTimeout(() => {
    isReady.value = true
  }, 50)
})
</script>

<style>
:root {
  --app-background: #fafafa;
  --transition-duration: 0.3s;
  --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

html {
  overflow-y: auto;
}

body {
  background-color: var(--app-background) !important;
}

.app-wrapper {
  min-height: 100vh;
  background-color: var(--app-background);
  position: relative;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-duration) var(--transition-timing);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all var(--transition-duration) var(--transition-timing);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: all var(--transition-duration) var(--transition-timing);
}

.zoom-fade-enter-from {
  opacity: 0;
  transform: scale(1.05);
}

.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all var(--transition-duration) var(--transition-timing);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
