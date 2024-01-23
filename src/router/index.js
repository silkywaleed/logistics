import { createRouter, createWebHistory, RouterView } from 'vue-router';
import Tr from "@/i18n/translation"
import store from "@/stores/auth"
import Data from "@/views/data.vue"
// import store from "@/stores"
import checkUserSession from "@/auth/checkUserSession"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Signin,
      beforeEnter: checkUserSession,
      redirect: "login",
      children: [
        {
          path: "/login",
          component: Signin,
        },
      ],
    },
    {
      path: "/forgot-password",
      beforeEnter: checkUserSession,
      name: "forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/reset-password",
      beforeEnter: checkUserSession,
      name: "reset-password",
      component: ResetPassword,
    },
    {
      path: "/data",
      name: "data",
      component: Data,
    },
    {
      path: "/",
      redirect: "/dashboard",
      /* beforeEnter: authenticateUser, */
      component: DefaultLayout,
      children: [
        {
          path: "dashboard",
          alias: "",
          name: "dashboard",
          meta: {
            screen: "Dashboard",
            permission: "dashboard",
          },
          component: Dashboard,
        },
      ]
    },
    {
      path: "/access-forbidden",
      name: "access-forbidden",
      component: Error403,
    },
    {
      path: "/:pathMatch(.*)*",
      component: Error404,
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.meta.auth && !store.getters.isAuthenticated){
//     next('/en/admin-login')
//     // next({ name: "adminLogin" });
//     // router.push({ path: 'adminLogin' });
//   } else if (!to.meta.auth && store.getters.isAuthenticated){
//     next('/en/customer-login')
//     // next({ name: "customerLogin" });
//     // router.push({ path: 'customerLogin' });
//   } else {
//     next()
//   }

// });

export default router;
