import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import WriteDiary from "../components/WriteDiary.vue";
import ViewDiary from "../components/ViewDiary.vue";
import ForestMate from "../views/ForestMate.vue";
import ForestView from "../components/ForestView.vue";
import MyItemView from "../components/MyItemView.vue";
import Guestbook from "../components/GuestBook.vue";
import Login from "@/components/Login.vue";
import BackgroundImage from "@/components/BackgroundImage.vue";
import Signup from "@/components/Signup.vue";
import BackgroundImage2 from "@/components/BackgroundImage2.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Main, // Main이 레이아웃 역할
      children: [
        {
          path: "", // == "/"
          name: "BackgroundImage",
          component: BackgroundImage2,
        },
        {
          path: "writediary",
          name: "WriteDiary",
          component: WriteDiary,
        },
        {
          path: "viewdiary",
          name: "ViewDiary",
          component: ViewDiary,
        },
        {
          path: "forestmate",
          name: "ForestMate",
          component: ForestMate,
        },
        {
          path: "forestview",
          name: "ForestView",
          component: ForestView,
        },
        {
          path: "myitemview",
          name: "MyItemView",
          component: MyItemView,
        },
        {
          path: "guestbook",
          name: "GuestBook",
          component: Guestbook,
        },
      ],
    },
    {
      path: "/login", // 로그인은 레이아웃(Main) 없이 따로 보여야 함
      name: "Login",
      component: Login,
    },
    {
      path: "/signup",
      name: "SignUp",
      component: Signup,
    }
  ],
});

export default router;
