<template>
  <div class="not-found-wrapper">
    <v-container fluid class="not-found-container d-flex flex-column align-center justify-center">
      <div class="text-center">
        <div class="error-code mb-6">404</div>
        
        <h1 class="text-h4 font-weight-bold mb-4">Page Not Found</h1>
        
        <p class="text-subtitle-1 text-medium-emphasis mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <v-btn
          color="primary"
          size="large"
          rounded
          prepend-icon="mdi-home"
          :to="authStore.isLoggedIn ? { name: 'home' } : { name: 'login' }"
          class="px-6"
        >
          {{ authStore.isLoggedIn ? 'Back to Home' : 'Go to Login' }}
        </v-btn>
      </div>
      
      <div class="error-illustration mt-8">
        <v-icon icon="mdi-map-marker-off" size="120" color="grey-lighten-2"></v-icon>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.not-found-wrapper {
  width: 100%;
  height: 100%;
}

.not-found-container {
  min-height: 80vh;
  background-image: radial-gradient(circle at top, rgba(247, 250, 255, 0.8) 0%, rgba(237, 242, 247, 0.3) 100%);
  border-radius: 16px;
  padding: 40px;
  margin: 20px auto;
  max-width: 800px;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(45deg, rgb(var(--v-theme-primary)), rgba(var(--v-theme-secondary), 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.8;
}

.error-illustration {
  opacity: 0.7;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style> 