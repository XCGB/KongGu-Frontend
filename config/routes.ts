
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './user/Register',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'home-page',
    icon: 'smile',
    component: './HomePage/',
  },
  // {
  //   path: '/home',
  //   name: 'home-page',
  //   icon: 'smile',
  //   component: './HomePage/',
  // },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/user-manage',
        name: 'user-management',
        icon: 'smile',
        component: './Admin/UserManager',
      },
      {
        path: '/admin/post-manage',
        name: 'post-management',
        icon: 'smile',
        component: './Admin/PostManager',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: 'account.settings',
    icon: 'smile',
    path: '/account/settings',
    component: './Account',
  },
  {
    component: './404',
  },

];
