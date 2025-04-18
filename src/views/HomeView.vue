
<template>
  <base-view
    title="Dashboard"
    :subtitle="`Welcome back, ${authStore.currentUser?.name}`"
  >
    <template #header-actions>
      <v-btn
        prepend-icon="mdi-refresh"
        variant="outlined"
        color="primary"
        :loading="loading"
        @click="refreshData"
        rounded
        class="px-4"
      >
        Refresh
      </v-btn>
    </template>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" lg="3">
        <stat-card
          title="Users"
          :value="stats.totalUsers"
          icon="mdi-account-group"
          color="primary"
          progress-value="65"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <stat-card
          title="Posts"
          :value="stats.totalPosts"
          icon="mdi-post"
          color="info"
          progress-value="42"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <stat-card
          title="Avg. Posts/User"
          :value="stats.avgPostsPerUser"
          icon="mdi-chart-line"
          color="warning"
          progress-value="78"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <stat-card
          title="Active Users"
          :value="stats.activeUsers"
          icon="mdi-account-check"
          color="success"
          progress-value="55"
        />
      </v-col>
    </v-row>

    <!-- Content Section -->
    <v-row>
      <!-- Recent Posts -->
      <v-col cols="12" lg="8">
        <recent-posts-list :posts="recentPosts" :loading="loading" />
      </v-col>

      <!-- Top Users -->
      <v-col cols="12" lg="4">
        <top-users-list :users="topUsers" :loading="loading" />
      </v-col>
    </v-row>
  </base-view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

// Import components
import BaseView from '@/components/dashboard/BaseView.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import RecentPostsList from '@/components/dashboard/RecentPostsList.vue'
import TopUsersList from '@/components/dashboard/TopUsersList.vue'

const authStore = useAuthStore()
const loading = ref(false)

const stats = ref({
  totalUsers: 0,
  totalPosts: 0,
  avgPostsPerUser: 0,
  activeUsers: 0
})

const recentPosts = ref([])
const topUsers = ref([])

const fetchData = async () => {
  loading.value = true
  try {
    const [usersRes, postsRes] = await Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://jsonplaceholder.typicode.com/posts')
    ])

    const users = usersRes.data
    const posts = postsRes.data

    stats.value = {
      totalUsers: users.length,
      totalPosts: posts.length,
      avgPostsPerUser: Math.round(posts.length / users.length),
      activeUsers: Math.round(users.length * 0.7) 
    }

    recentPosts.value = posts.slice(-5).reverse()

    const userPosts = users.map(user => ({
      ...user,
      postCount: posts.filter(post => post.userId === user.id).length
    }))
    topUsers.value = userPosts
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5)

  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const refreshData = () => {
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none !important;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07) !important;
}

.stat-icon-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
}

.stat-icon-bg.primary {
  background-color: rgb(var(--v-theme-primary));
}

.stat-icon-bg.info {
  background-color: rgb(var(--v-theme-info));
}

.stat-icon-bg.warning {
  background-color: rgb(var(--v-theme-warning));
}

.stat-icon-bg.success {
  background-color: rgb(var(--v-theme-success));
}

.stat-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  border-radius: 0 0 0 100%;
  opacity: 0.2;
}

.stat-decoration.primary {
  background-color: rgb(var(--v-theme-primary));
}

.stat-decoration.info {
  background-color: rgb(var(--v-theme-info));
}

.stat-decoration.warning {
  background-color: rgb(var(--v-theme-warning));
}

.stat-decoration.success {
  background-color: rgb(var(--v-theme-success));
}

.post-item-hover {
  transition: background-color 0.2s ease;
}

.post-item-hover:hover {
  background-color: rgba(var(--v-theme-surface-variant), 0.5);
}
</style>
