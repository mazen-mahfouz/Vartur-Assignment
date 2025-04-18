<template>
  <v-card class="h-100 rounded-lg">
    <v-card-item class="px-4 pt-4 pb-2">
      <div class="d-flex align-center">
        <v-icon icon="mdi-text-box-outline" size="20" color="primary" class="mr-2"></v-icon>
        <div class="text-h6 font-weight-medium">Recent Posts</div>
      </div>
      <div class="text-caption text-medium-emphasis mt-1">Latest posts from users</div>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-text class="px-4 pt-2 pb-4">
      <div v-if="loading" class="d-flex justify-center align-center py-4">
        <v-progress-circular indeterminate color="primary" size="40"></v-progress-circular>
      </div>
      
      <div v-else>
        <div v-for="post in posts" :key="post.id" class="post-item py-2">
          <div class="d-flex">
            <div class="mr-3">
              <v-avatar 
                :color="getAvatarColor(post.userId)" 
                size="38"
              >
                {{ post.userId }}
              </v-avatar>
            </div>
            <div class="post-content">
              <div class="post-title font-weight-medium">
                {{ post.title }}
              </div>
              <div class="post-body text-truncate-2 text-body-2 text-medium-emphasis">
                {{ post.body }}
              </div>
            </div>
            <div class="post-id text-caption text-medium-emphasis ml-2">
              {{ post.id }}
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  posts: {
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
</script>

<style scoped>
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-item {
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.post-item:last-child {
  border-bottom: none;
}

.post-content {
  flex: 1;
  min-width: 0;
}

.post-title {
  font-size: 0.9rem;
  line-height: 1.2;
  margin-bottom: 2px;
}

.post-body {
  line-height: 1.3;
  font-size: 0.8rem;
}

.post-id {
  align-self: flex-start;
  margin-top: 2px;
}
</style> 