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
  name: "Yaml",
  path: "/yaml",
  component: () =>
    import(
      /* webpackChunkName: "Yaml" */
      "../components/Yaml.vue"
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
  name: "Music",
  path: "/music",
  component: () =>
    import(
      /* webpackChunkName: "Music" */
      "../components/Music.vue"
    ),
});

route.push({
  name: "Paik Nam-June",
  path: "/Paik-NamJune",
  component: () =>
    import(
      /* webpackChunkName: "PaikNamJune" */
      "../components/PaikNamJune.vue"
    ),
});

route.push({
  name: "Investing",
  path: "/invest",
  component: () =>
    import(
      /* webpackChunkName: "Trading" */
      "../components/Trading.vue"
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
