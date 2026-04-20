import { type RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import RegisterView from '@/views/RegisterView.vue';
import AuthView from '@/views/AuthView.vue';

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
            'auth:forgot_password': 'slide-out-left',
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
        path: 'forgot-password',
        name: 'auth:forgot_password',
        component: () => import('@/views/ForgotPassword.vue'),
        meta: {
          transitions: {
            'auth:login': 'slide-in-right',
            'auth:register': 'slide-in-right',
          },
        },
      },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
] as RouteRecordRaw[];
