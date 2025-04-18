<template>
  <v-container fluid class="pa-6">
    <div class="view-content">
      <dashboard-header :title="title" :subtitle="subtitle">
        <template #actions>
          <slot name="header-actions"></slot>
        </template>
      </dashboard-header>
      
      <div class="view-body">
        <slot></slot>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import DashboardHeader from './DashboardHeader.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.view-content {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.view-body {
  padding: 24px;
}
</style> 