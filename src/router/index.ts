import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';
import { transitionGuard } from './guards';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

transitionGuard(router);

export default router
