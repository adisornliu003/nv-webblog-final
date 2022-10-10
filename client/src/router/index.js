import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/CreateUser'
import UserEdit from '@/components/Users/EditUser'
import UserShow from '@/components/Users/ShowUser'
import Login from '@/components/Login'


import BlogIndex from '@/components/Blogs/Index'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogEdit from '@/components/Blogs/EditBlog'
import BlogShow from '@/components/Blogs/ShowBlog'

import CommentIndex from '@/components/Comments/Index'

import Upload from '@/components/Utils/Upload'

import RecomIndex from '@/components/Recom/Index'
import RecomCreate from '@/components/Recom/CreateRecom'
import RecomEdit from '@/components/Recom/EditRecom'
import RecomShow from '@/components/Recom/ShowRecom'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blog-create',
      component: BlogCreate
    },{
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/recoms',
      name: 'recoms',
      component: RecomIndex
    },
    {
      path: '/recom/create',
      name: 'recom-create',
      component: RecomCreate
    },
    {
      path: '/recom/edit/:recomId',
      name: 'recom-edit',
      component: RecomEdit
    },
    {
      path: '/recom/:recomId',
      name: 'recom',
      component: RecomShow
    },
   
  ]
})
