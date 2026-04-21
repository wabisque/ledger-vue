import { type RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import RegisterView from '@/views/RegisterView.vue';
import AuthView from '@/views/AuthView.vue';
import DashboardView from '@/views/DashboardView.vue';

export default [
  {
    path: '/auth',
    component: AuthView,
    children: [
      {
        path: 'login',
        name: 'auth:login',
        component: LoginView,
        meta: {
          transitions: {
            'auth:register': 'shift-left',
            'auth:reset_password': 'push',
          },
        },
      },
      {
        path: 'register',
        name: 'auth:register',
        component: RegisterView,
        meta: {
          transitions: {
            'auth:login': 'shift-right',
          }
        },
      },
      {
        path: 'reset-password',
        name: 'auth:reset_password',
        component: () => import('@/views/ResetPasswordView.vue'),
        meta: {
          transitions: {
            'auth:login': 'pop',
          },
        },
      },
    ],
  },
  { path: '/', name: 'dashboard', component: DashboardView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
] as RouteRecordRaw[];
