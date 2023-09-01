import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LogInView from "@/views/LogInView";
import SignUpView from "@/views/SignUpView";
import CoursesView from "@/views/CoursesView";
import LogOut from "@/views/LogOut";
import MyAccount from "@/views/personalArea/MyAccount";
import CourseView from "@/views/CourseView";
import NewCoursesView from "@/views/NewCoursesView";
import RankingView from "@/views/RankingView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogInView,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpView,
  },
  {
    path: '/logout',
    name: 'LogOut',
    component: LogOut,
  },
  {
    path: '/courses',
    name: 'Courses',
    component: CoursesView,
  },
  {
    path: '/courses/:slug',
    name: 'Course',
    component: CourseView,
  },
  {
    path: '/personal-area/my-account',
    name: 'MyAccount',
    component: MyAccount,
  },
  {
    path: '/new-courses',
    name: 'NewCourses',
    component: NewCoursesView,
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: RankingView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
