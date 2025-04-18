<template>
  <base-view title="Categories" subtitle="Browse and manage system categories">
    <template #header-actions>
      <div class="search-box">
        <v-icon size="20" color="grey" class="search-icon">mdi-magnify</v-icon>
        <input 
          v-model="search" 
          type="text" 
          placeholder="Search..." 
          class="search-input"
        />
      </div>
    </template>
    
    <div v-if="loading" class="py-4">
      <v-row>
        <v-col v-for="i in 8" :key="i" cols="12" sm="6" md="4" lg="3" xl="2">
          <v-skeleton-loader type="card" class="rounded-lg elevation-0"></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    
    <div v-else>
      <v-row>
        <v-col v-for="user in filteredUsers" :key="user.id" 
          cols="12" sm="6" md="4" lg="3" xl="2"
          class="category-column"
        >
          <v-card class="category-card h-100 rounded-lg" flat>
            <div class="card-header rounded-t-lg pa-4" :class="getCategoryClass(user.id)">
              <v-avatar 
                :color="getAvatarColor(user.id)" 
                size="56" 
                class="mb-3 elevation-2 user-avatar"
              >
                <span class="text-subtitle-1 font-weight-medium">{{ user.name.charAt(0) }}</span>
              </v-avatar>
              
              <h3 class="text-subtitle-1 font-weight-bold text-white mb-1 text-truncate">
                {{ user.name }}
              </h3>
              <p class="text-caption text-white text-opacity-70 mb-0 text-truncate">
                {{ user.email }}
              </p>
            </div>
            
            <v-card-text class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon size="18" color="primary" class="mr-3 flex-shrink-0">mdi-earth</v-icon>
                <a :href="'https://' + user.website" target="_blank" class="text-truncate text-decoration-none">
                  {{ user.website }}
                </a>
              </div>
              
              <div class="d-flex align-center mb-3">
                <v-icon size="18" color="primary" class="mr-3 flex-shrink-0">mdi-phone</v-icon>
                <span class="text-body-2 text-truncate">{{ user.phone }}</span>
              </div>
              
              <div class="d-flex">
                <v-icon size="18" color="primary" class="mr-3 flex-shrink-0 mt-1">mdi-office-building</v-icon>
                <div class="text-truncate">
                  <div class="text-body-2 font-weight-medium text-truncate">{{ user.company.name }}</div>
                </div>
              </div>
              
              <div class="mt-4 pt-2 d-flex align-center justify-space-between border-top">
                <div class="text-caption text-medium-emphasis">
                  <v-icon size="14" class="me-1">mdi-map-marker</v-icon>
                  {{ user.address.city }}
                </div>
                
                <v-chip 
                  size="x-small" 
                  :color="getAvatarColor(user.id)" 
                  class="font-weight-medium"
                  variant="flat"
                >
                  ID: {{ user.id }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </base-view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import BaseView from '@/components/dashboard/BaseView.vue'

const search = ref('')
const users = ref([])
const loading = ref(true)

const getAvatarColor = (id) => {
  const colors = ['primary', 'indigo', 'deep-purple', 'teal', 'blue'];
  return colors[(id - 1) % colors.length];
}

const getCategoryClass = (id) => {
  const classes = ['bg-primary', 'bg-indigo', 'bg-deep-purple', 'bg-teal', 'bg-blue'];
  return classes[(id - 1) % classes.length];
}

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  
  const query = search.value.toLowerCase()
  return users.value.filter(user => 
    user.name.toLowerCase().includes(query) || 
    user.email.toLowerCase().includes(query) ||
    user.company.name.toLowerCase().includes(query) ||
    user.address.city.toLowerCase().includes(query)
  )
})

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = response.data
    
    setTimeout(() => {
      loading.value = false
    }, 800)
  } catch (error) {
    console.error('Error fetching users:', error)
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 100px;
  padding: 8px 16px;
  width: 240px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.search-icon {
  margin-right: 10px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  color: #333;
}

.category-column {
  padding: 12px;
}

.category-card {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1) !important;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding-top: 30px !important;
}

.user-avatar {
  border: 3px solid white;
}

.border-top {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.bg-primary {
  background: linear-gradient(45deg, rgb(var(--v-theme-primary)), rgba(var(--v-theme-primary), 0.8));
}

.bg-indigo {
  background: linear-gradient(45deg, #3949ab, #5c6bc0);
}

.bg-deep-purple {
  background: linear-gradient(45deg, #5e35b1, #7e57c2);
}

.bg-teal {
  background: linear-gradient(45deg, #00897b, #26a69a);
}

.bg-blue {
  background: linear-gradient(45deg, #1976d2, #42a5f5);
}

.categories-grid {
  padding-bottom: 40px;
}
</style> 