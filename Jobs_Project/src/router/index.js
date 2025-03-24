import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EditJob from '../views/EditJob.vue'
import AddJob from '../views/AddJob.vue'
import JobDetail from '../components/JobDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add',
    name: 'AddJob',
    component: AddJob
  },
  {
    path: '/jobs/:id',
    name: 'EditJob',
    component: EditJob,
    props: true
  },
  {
    path: '/jobs/details/:id',
    name: 'JobDetails',
    component: JobDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
