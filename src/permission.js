import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isRelogin } from '@/utils/request'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register', '/grid/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
    next()
})

router.afterEach(() => {
  NProgress.done()
})
