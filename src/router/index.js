import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import WriteDiary from "../components/WriteDiary.vue";
import ViewDiary from "../components/ViewDiary.vue";
import ForestMate from "../views/ForestMate.vue";
import ForestView from "../components/ForestView.vue";
import MyItemView from "../components/MyItemView.vue";
import Guestbook from "../components/GuestBook.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: "/",
      name: "Main",
      component: Main
    },
    {
      path: "/writediary",
      name: "WriteDiary",
      component: WriteDiary
    },
    {
      path: "/viewdiary",
      name: "ViewDiary",
      component: ViewDiary
    },
    {
      path: "/forestmate",
      name: "ForestMate",
      component: ForestMate
    },
    {
      path: "/forestview",
      name: "ForestView",
      component: ForestView
    },
    {
      path: "/myitemview",
      name: "MyItemView",
      component: MyItemView
    },
    {
      path: "/guestbook",
      name: "GuestBook",
      component: Guestbook
    }
  ]
});

export default router;