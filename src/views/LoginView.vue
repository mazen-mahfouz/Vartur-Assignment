<template>
  <v-container fluid class="fill-height bg-surface">
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12" sm="8" md="5" lg="4" xl="3">
        <v-sheet width="100%" class="pa-8" rounded="xl">
          <div class="d-flex flex-column align-center mb-6">
            <v-icon
              icon="mdi-shield-lock-outline"
              size="28"
              color="primary"
              class="mb-4"
            ></v-icon>
            <span class="text-h5 font-weight-medium mb-1">Welcome back</span>
            <span class="text-body-2 text-medium-emphasis">Sign in to your account</span>
          </div>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="username"
              label="Username"
              variant="outlined"
              density="comfortable"
              bg-color="surface"
              :error-messages="usernameError"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              variant="outlined"
              density="comfortable"
              bg-color="surface"
              :error-messages="passwordError"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              hide-details="auto"
              class="mb-6"
            ></v-text-field>

            <v-alert
              v-if="loginError"
              type="error"
              variant="tonal"
              class="mb-4"
              density="compact"
            >
              {{ loginError }}
            </v-alert>

            <v-btn
              type="submit"
              :loading="loading"
              size="large"
              color="primary"
              block
              flat
              class="mb-4"
            >
              Sign in
            </v-btn>

            <div class="text-caption text-center text-medium-emphasis">
              Demo access: 
              <span class="font-weight-medium text-primary">admin</span> / 
              <span class="font-weight-medium text-primary">admin</span>
            </div>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const loginError = ref('')
const usernameError = ref('')
const passwordError = ref('')

const handleLogin = async () => {
  usernameError.value = ''
  passwordError.value = ''
  loginError.value = ''

  if (!username.value) {
    usernameError.value = 'Username is required'
    return
  }
  if (!password.value) {
    passwordError.value = 'Password is required'
    return
  }

  loading.value = true

  try {
    if (username.value === 'admin' && password.value === 'admin') {
      await authStore.login({
        username: username.value,
        password: password.value
      })
      router.push('/')
    } else {
      loginError.value = 'Invalid username or password'
    }
  } catch (error) {
    loginError.value = 'An error occurred during login'
  } finally {
    loading.value = false
  }
}
</script>

<style>
.v-container--fluid{
    height: 100vh !important;
  }
.v-sheet {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(var(--v-border-color), 0.05);
}

.v-btn {
  text-transform: none !important;
  letter-spacing: 0.25px !important;
  font-weight: 500 !important;
}

.v-field.v-field--variant-outlined .v-field__outline {
  --v-field-border-opacity: 0.1;
}

.v-sheet {
  box-shadow: 
    0px 2px 4px -1px rgba(0, 0, 0, 0.05),
    0px 4px 6px -1px rgba(0, 0, 0, 0.05);
}
</style> 