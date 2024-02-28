import { RouteRecordRaw } from "vue-router";
const route = [];

route.push({
  name: "First Page",
  path: "/first",
  component: () =>
    import(
      /* webpackChunkName: "FirstPage" */
      "../components/FirstPage.vue"
    ),
});

route.push({
  name: "Real estate",
  path: "/real-estate",
  component: () =>
    import(
      /* webpackChunkName: "RealEstate" */
      "../components/RealEstate.vue"
    ),
});

route.push({
  name: "Form With Tab",
  path: "/form-with-tab/:tabName?",
  component: () =>
    import(
      /* webpackChunkName: "FromWithTab" */
      "../components/FormWithTab.vue"
    ),
});

route.push({
  name: "Genshin Impact",
  path: "/genshin-impact",
  component: () =>
    import(
      /* webpackChunkName: "GenshinImpact" */
      "../components/GenshinImpact.vue"
    ),
});

route.push({
  name: "D3 Canvas",
  path: "/d3-canvas",
  component: () =>
    import(
      /* webpackChunkName: "d3-canvas" */
      "../components/D3Canvas.vue"
    ),
});

// route.push({
//   name: 'Hello World',
//   path: '/hello-world',
//   component: () => import(
//     /* webpackChunkName: "HelloWorld" */
//     '../components/HelloWorld.vue'
//   )
// })

// go to the first route
route.push({
  path: "/",
  redirect: {
    // name: route.at(0)?.name,
    name: "First Page",
  },
});

export default route as RouteRecordRaw[];
