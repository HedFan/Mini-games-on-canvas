const routes = [
  {
    path: '/',
    name: 'practice',
    component: () => import('@/pages/practice.vue'),
  },
  {
    path: '/dxball',
    name: 'dxball',
    component: () => import('@/pages/dxball.vue'),
  },
  {
    path: '/tennis',
    name: 'tennis',
    component: () => import('@/pages/tennis.vue'),
  },
];

export default routes;
