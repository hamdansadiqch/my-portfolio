import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import AboutView from '../components/About.vue'
import SocialsView from '../components/Socials.vue'
import ExperienceView from '../components/Experience.vue' 
import WritingsView from '../components/Writings.vue'
import ContactView from '../components/Contact.vue';
import Project from '../components/Project.vue';// Import Experience

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
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
    path: '/writings',
    name: 'writings',
    component: WritingsView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  { path: '/project', component: Project },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
