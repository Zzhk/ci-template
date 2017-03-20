import Vue from 'vue'
import Router from 'vue-router'
import store from 'src/store'
import index from 'views/index'
// import processbar
import processbar from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const meta = { requiresAuth: true } // pages with meta need auth

const router = new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      meta
    },
    {
      path: '/',
      redirect: '/index'
    }
  ]
})

// everytime before router
router.beforeEach(async (to, from, next) => {
  window.scroll(0, 0)
  if (to.path === from.path) return // when you change route in this function, it will invoker twice
  processbar.start() // start process
  // when not dev, everytime user route, check login state
  if (to.matched.some(record => record.meta.requiresAuth) && process.env.NODE_ENV !== 'development') {
    const LOGIN_URL = '/site/main.php?action=index.html'
    const { appkey, channel } = to.query
    try {
      if (appkey === undefined || channel === undefined) throw new Error('参数缺失')
      const params = { appkey, channel, page_name: to.path } // make login state check params
      // request start
      await store.dispatch('login', params)
      const { hasAccess, isLogin } = store.state.user // get login state
      console.log(`当前用户登录状态为已登录: ${isLogin} 拥有权限: ${hasAccess}`)
      if (!isLogin) throw new Error('登录失败')
      else if (!hasAccess) next({ name: 'noAccess', query: { appkey, channel } }) // if no access
    } catch (e) {
      console.log(e)
      window.location.href = `${LOGIN_URL}&appkey=${appkey}`
    }
  } else next()
})

// everytime after router
router.afterEach(_ => {
  processbar.done() // end process
})

export default router
