import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import PlansView from '@/views/PlansView.vue';
import PlanView from '@/views/PlanView.vue';
import axios from 'axios';
import AdminView from '@/views/AdminView.vue';
import RecommendView from '@/views/RecommendView.vue';
import ArticlesView from '@/views/ArticlesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: RecommendView,
    },
    {
      path: '/plans',
      name: 'plans',
      component: PlansView,
    },
    {
      path: '/plan/:id',
      name: 'plan',
      component: PlanView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: async (to, from, next) => {
        // Check if the user is already logged in
        if (localStorage.getItem('authToken')) {
          // Redirect to home if the user is already logged in
          next('/');
        } else {
          // Proceed to login if the user is not logged in
          try {
            let response = await axios.get('https://api.cellularsavior.com/auth/initiate');
            let url = response.data.url;
            window.location.href = url;
          } catch (error) {
            console.error('Error during login initiation:', error);
            next('/login'); // Redirect to login on error
          }
        }
      }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        // Remove the JWT from local storage
        localStorage.removeItem('authToken');
        // Refresh the page to clear the user state
        window.location.reload();
        // Redirect to home
        next('/');
      },
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
          const response = await axios.post('https://api.cellularsavior.com/auth/callback', {
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

