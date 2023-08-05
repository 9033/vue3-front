import {RouteRecordRaw} from 'vue-router'
const route = []

route.push({
  name: 'Form With Tab',
  path: '/form-with-tab/:tabName?',
  component: () => import(
    /* webpackChunkName: "FromWithTab" */
    '../components/FormWithTab.vue'
  )
})

route.push({
  name: 'Genshin Impact',
  path: '/genshin-impact',
  component: () => import(
    /* webpackChunkName: "GenshinImpact" */
    '../components/GenshinImpact.vue'
  )
})

// route.push({
//   name: 'Hello World',
//   path: '/hello-world',
//   component: () => import(
//     /* webpackChunkName: "HelloWorld" */
//     '../components/HelloWorld.vue'
//   )
// })

// go to the first route
route.push({ path: '/', redirect: {
  name: route.at(0)?.name,
} })

export default route as RouteRecordRaw[]

