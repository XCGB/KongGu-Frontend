
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
    name: 'Campus-Square',
    icon: 'smile',
    component: './CampusSquare/',
  },
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
        component: './Admin/UserManager',
      },
      {
        path: '/admin/post-manage',
        name: 'post-management',
        component: './Admin/PostManager',
      },
      {
        path: '/admin/tag-manage',
        name: 'tag-management',
        component: './Admin/TagManager',
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
    path: '/home-page',
    name: 'home-page',
    icon: 'home',
    routes: [
      {
        path: '/home-page/posts',
        name: 'postList',
        icon: 'smile',
        component: './HomePage/MyPosts'
      },
      {
        component: './404',
      },
    ]
  },
  {
    name: 'account.settings',
    icon: 'setting',
    path: '/account/settings',
    component: './Account',
  },
  {
    component: './404',
  },
];
