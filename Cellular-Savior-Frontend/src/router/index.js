import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import PlansView from '@/views/PlansView.vue';
import LoginView from '@/views/LoginView.vue';
import axios from 'axios';

const backendApiBaseUrl = 'http://localhost:8080/api';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/plans',
      name: 'plans',
      component: PlansView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },

    // OAuth callback route. This logic is implemented here because UI is not necessary.
    {
      path: '/auth/callback',
      name: 'auth-callback',
      beforeEnter: async (to, from, next) => {
        const code = to.query.code;
        const state = to.query.state;

        // Validate if `code` and `state` are present
        if (!code || !state) {
          console.error('Missing authorization code or state');
          return next('/login'); // Redirect to login if validation fails
        }

        try {
          // Send the code and state to the backend for token exchange
          const response = await axios.post(`${backendApiBaseUrl}/auth/callback`, {
            code,
            state,
          });

          if (response.status === 200) {
            const userJwt = response.data.user_jwt;

            // Store the JWT in local storage
            localStorage.setItem('authToken', userJwt);

            // Redirect the user to the dashboard or home page
            next('/');
          } else {
            console.error('OAuth callback failed', response);
            next('/login'); // Redirect to login on failure
          }
        } catch (error) {
          console.error('Error during OAuth callback:', error);
          next('/login'); // Redirect to login on error
        }
      },
    },

    // Catch-all route for 404 errors
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;

