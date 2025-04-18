<template>
  <div class="dashboard-header d-flex flex-wrap align-center justify-space-between px-6 py-5">
    <div class="header-left">
      <h1 class="text-h5 font-weight-bold">{{ title }}</h1>
      <p v-if="subtitle" class="text-body-2 text-medium-emphasis mt-1">{{ subtitle }}</p>
    </div>
    
    <div class="header-right">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
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
.dashboard-header {
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px 10px 0 0;
}
</style> 