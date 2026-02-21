import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import SocialsView from '../components/Socials.vue'
import ExperienceView from '../components/Experience.vue' 
import ContactView from '../components/Contact.vue';
import Project from '../components/Project.vue';// Import Experience

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/socials',
    name: 'socials',
    component: SocialsView
  },
  {
    path: '/experience',
    name: 'experience',
    component: ExperienceView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  { path: '/project', component: Project },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
