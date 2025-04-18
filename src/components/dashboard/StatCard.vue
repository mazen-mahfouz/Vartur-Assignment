<template>
  <v-card class="stat-card h-100 position-relative overflow-hidden">
    <div class="card-content pa-5">
      <div class="d-flex align-center justify-space-between mb-4">
        <div>
          <div class="text-subtitle-2 font-weight-medium text-medium-emphasis mb-2">{{ title }}</div>
          <div class="stat-value text-h3 font-weight-bold">{{ value }}</div>
        </div>
        <div class="stat-icon" :class="color">
          <v-icon size="28" color="white">{{ icon }}</v-icon>
        </div>
      </div>
      <v-progress-linear
        :model-value="progressValue"
        :color="color"
        height="4"
        rounded
        bg-opacity="0.1"
      ></v-progress-linear>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  progressValue: {
    type: [Number, String],
    default: 50
  }
})
</script>

<style scoped>
.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none !important;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05) !important;
  border-radius: 14px !important;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07) !important;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
}

.stat-icon.primary {
  background-color: rgb(var(--v-theme-primary));
}

.stat-icon.info {
  background-color: rgb(var(--v-theme-info));
}

.stat-icon.warning {
  background-color: rgb(var(--v-theme-warning));
}

.stat-icon.success {
  background-color: rgb(var(--v-theme-success));
}

.card-content {
  position: relative;
  z-index: 1;
}

.stat-value {
  letter-spacing: -0.5px;
}
</style> 