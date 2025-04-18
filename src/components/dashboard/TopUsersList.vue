<template>
  <v-card class="h-100 rounded-lg">
    <v-card-item class="px-4 pt-4 pb-2">
      <div class="d-flex align-center">
        <v-icon icon="mdi-account-group" size="20" color="primary" class="mr-2"></v-icon>
        <div class="text-h6 font-weight-medium">Top Users</div>
      </div>
      <div class="text-caption text-medium-emphasis mt-1">Most active contributors</div>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-text class="px-4 pt-2 pb-4">
      <div v-if="loading" class="d-flex justify-center align-center py-4">
        <v-progress-circular indeterminate color="primary" size="40"></v-progress-circular>
      </div>
      
      <div v-else>
        <div 
          v-for="(user, index) in users" 
          :key="user.id" 
          class="user-item py-2"
        >
          <div class="d-flex align-center">
            <v-avatar 
              :color="getAvatarColor(user.id)" 
              size="38"
              class="mr-3"
            >
              {{ getUserInitial(user.name) }}
            </v-avatar>
            <div class="user-content">
              <div class="user-name font-weight-medium">{{ user.name }}</div>
              <div class="user-email text-caption text-medium-emphasis">
                {{ user.email }}
              </div>
            </div>
            <div class="user-id text-caption text-medium-emphasis ml-2">
              {{ user.id }}
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  users: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const getAvatarColor = (id) => {
  const colors = ['primary', 'secondary', 'info', 'success', 'warning']
  return colors[id % colors.length]
}

const getUserInitial = (name) => {
  return name ? name.charAt(0) : 'U'
}
</script>

<style scoped>
.user-item {
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.user-item:last-child {
  border-bottom: none;
}

.user-content {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 0.9rem;
  line-height: 1.2;
  margin-bottom: 1px;
}

.user-email {
  font-size: 0.8rem;
}

.user-id {
  align-self: flex-start;
  margin-top: 2px;
}
</style> 