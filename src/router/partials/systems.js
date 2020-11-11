const System = () => import('@/views/systems/System')
const SystemRegister = () => import('@/views/systems/SystemRegister')
const SystemDetail = () => import('@/views/systems/SystemDetail')

const systems = {
  path: 'systems',
  meta: {
    label: 'System',
    requiresAuth: true,
  },
  component: {
    render(c) {
      return c('router-view')
    },
  },
  children: [
    {
      path: '',
      component: System,
      meta: { requiresAuth: true },
    },
    {
      path: 'register',
      component: SystemRegister,
      meta: { requiresAuth: true },
    },
    {
      path: ':id',
      component: SystemDetail,
      meta: { requiresAuth: true },
    },
  ],
}

export default systems
