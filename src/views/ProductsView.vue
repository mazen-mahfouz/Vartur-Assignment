<template>
  <base-view title="Products" subtitle="Browse and manage all products">
    <template #header-actions>
      <div class="d-flex flex-column flex-sm-row align-center">
        <div class="search-box mb-3 mb-sm-0 mr-sm-3">
          <v-icon size="20" color="grey" class="search-icon">mdi-magnify</v-icon>
          <input 
            v-model="search" 
            type="text" 
            placeholder="Search products..." 
            class="search-input"
          />
        </div>
        
        <div class="filter-container">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            location="bottom"
            transition="scale-transition"
            offset="5"
          >
            <template v-slot:activator="{ props }">
              <div class="filter-box" v-bind="props">
                <v-icon size="18" color="grey-darken-1" class="filter-icon">mdi-filter-outline</v-icon>
                <span class="filter-text">{{ getSelectedUserLabel }}</span>
                <v-icon size="18" color="grey-darken-1" class="ml-auto">{{ menu ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </div>
            </template>
            
            <v-card class="pa-0 filter-menu-card" min-width="180" elevation="4">
              <v-list density="compact" class="pa-0">
                <v-list-item
                  v-for="option in userOptions"
                  :key="option.value"
                  :value="option.value"
                  :active="selectedUserId === option.value"
                  @click="setSelectedUser(option.value)"
                  class="filter-list-item"
                  :class="{ 'selected-item': selectedUserId === option.value }"
                >
                  <v-list-item-title>{{ option.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>
    </template>
    
    <div v-if="loading">
      <v-skeleton-loader type="table" class="rounded-lg"></v-skeleton-loader>
    </div>

    <div v-else>
      <v-card class="rounded-lg elevation-0 border">
        <div class="table-container">
          <v-data-table
            :headers="headers"
            :items="filteredPosts"
            :search="search"
            :items-per-page="10"
            class="product-table"
            :loading="loading"
          >
            <template v-slot:header="{ columns }">
              <thead class="custom-header">
                <tr>
                  <th 
                    v-for="column in columns" 
                    :key="column.key" 
                    :class="['custom-header-cell', column.align === 'end' ? 'text-right' : '']"
                  >
                    {{ column.title }}
                  </th>
                </tr>
              </thead>
            </template>
            
            <template v-slot:item.id="{ item }">
              <div class="id-chip">
                {{ item.id }}
              </div>
            </template>
            
            <template v-slot:item.title="{ item }">
              <div class="d-flex align-start">
                <div class="product-title">
                  {{ item.title }}
                </div>
              </div>
            </template>
            
            <template v-slot:item.body="{ item }">
              <div class="product-body">
                {{ item.body.substring(0, 100) }}{{ item.body.length > 100 ? '...' : '' }}
              </div>
            </template>
            
            <template v-slot:item.userId="{ item }">
              <div class="user-badge-wrapper">
                <div class="user-badge" :class="getAuthorClass(item.userId)">
                  <span class="text-caption font-weight-medium text-white">
                    User {{ item.userId }}
                  </span>
                </div>
              </div>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </div>
  </base-view>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import BaseView from '@/components/dashboard/BaseView.vue'

const search = ref('')
const posts = ref([])
const loading = ref(true)
const selectedUserId = ref(null)
const menu = ref(false) 

const getSelectedUserLabel = computed(() => {
  const selected = userOptions.value.find(option => option.value === selectedUserId.value)
  return selected ? selected.title : 'All Users'
})

const setSelectedUser = (value) => {
  selectedUserId.value = value
  menu.value = false
}

const headers = [
  { title: 'ID', align: 'center', key: 'id', width: '60px', sortable: true },
  { title: 'Title', align: 'start', key: 'title', sortable: true },
  { title: 'Content', align: 'start', key: 'body', sortable: false },
  { title: 'Author', align: 'center', key: 'userId', width: '120px', sortable: true },
]

const getAuthorClass = (userId) => {
  const classes = ['bg-primary', 'bg-indigo', 'bg-deep-purple', 'bg-teal', 'bg-blue'];
  return classes[(userId - 1) % classes.length];
}

const userOptions = computed(() => {
  const uniqueUserIds = [...new Set(posts.value.map(post => post.userId))]
  
  const options = uniqueUserIds.map(id => ({
    title: `User ${id}`,
    value: id
  }))
  
  return [{ title: 'All Users', value: null }, ...options]
})

const filteredPosts = computed(() => {
  let filtered = posts.value
  
  if (selectedUserId.value !== null) {
    filtered = filtered.filter(post => post.userId === selectedUserId.value)
  }
  
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.body.toLowerCase().includes(searchLower)
    )
  }
  
  return filtered
})

const fetchPosts = async () => {
  loading.value = true
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    posts.value = response.data
    
    setTimeout(() => {
      loading.value = false
    }, 800)
  } catch (error) {
    console.error('Error fetching posts:', error)
    loading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.search-box, .filter-box {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 100px;
  padding: 8px 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.search-box {
  width: 240px;
}

.filter-box {
  width: 180px;
}

.search-icon, .filter-icon {
  margin-right: 10px;
}

.search-input, .filter-select {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  color: #333;
}

.filter-select {
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

.filter-container {
  position: relative;
  z-index: 10;
}

.filter-text {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.filter-menu-card {
  border-radius: 10px;
  overflow: hidden;
}

.filter-list-item {
  transition: background-color 0.2s;
  border-left: 3px solid transparent;
}

.filter-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.selected-item {
  background-color: rgb(var(--v-theme-primary), 0.1) !important;
  border-left-color: rgb(var(--v-theme-primary));
}

.border {
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
}

.table-container {
  overflow: hidden;
  border-radius: 12px;
}

:deep(.product-table) {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

:deep(.custom-header) {
  background-color: #f8fafc;
}

:deep(.custom-header-cell) {
  font-size: 0.75rem !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600 !important;
  color: rgba(0, 0, 0, 0.6) !important;
  padding: 12px 16px !important;
}

:deep(.v-data-table__tr) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
  transition: background-color 0.2s;
}

:deep(.v-data-table__tr:hover) {
  background-color: rgba(var(--v-theme-primary), 0.04) !important;
}

:deep(.v-data-table__td) {
  padding: 10px 16px !important;
  font-size: 0.875rem;
}

.id-chip {
  background-color: #f0f2f5;
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 30px;
  display: inline-block;
  text-align: center;
}

.product-title {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
  line-height: 1.4;
}

.product-body {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.8125rem;
  line-height: 1.5;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-badge-wrapper {
  display: flex;
  justify-content: center;
}

.user-badge {
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.bg-primary {
  background: linear-gradient(45deg, rgb(var(--v-theme-primary)), rgba(var(--v-theme-primary), 0.85));
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

.products-content {
  padding-bottom: 40px;
}
</style> 