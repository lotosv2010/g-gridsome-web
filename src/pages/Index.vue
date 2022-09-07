<template>
  <Layout>
    <!-- Page Header-->
    <header class="masthead" style="background-image: url('/img/home-bg.jpg')">
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="site-heading">
              <h1>Robin's Blog</h1>
              <span class="subheading">Web Frontend Blogs You Should Follow Right Now!</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Main Content-->
    <div class="container px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7">
          <div v-for="post in posts" :key="post.node.id">
            <!-- Post preview-->
            <div class="post-preview">
              <g-link :to="`/post/${post.node.id}`">
                <h2 class="post-title">{{ post.node.title }}</h2>
                <h3 class="post-subtitle">{{ post.node.description }}</h3>
              </g-link>
              <p class="post-meta">
                Posted by
                <span>{{ post.node.author.username }}</span>
                on {{ post.node.createdAt | date }}
              </p>
            </div>
            <!-- Divider-->
            <hr class="my-4" />
          </div>
          <!-- Pager-->
          <div class="d-flex justify-content-end mb-4">
            <button class="btn btn-primary text-uppercase">Older Posts</button>
          </div>
          <!-- <Pager :info="pageInfo" /> -->
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
  query {
    posts: allPost(page: 1, perPage: 5) {
      edges {
        node {
          id
          title,
          content,
          description,
          createdAt,
          author {
            username
          }
        }
      }
      totalCount
      pageInfo {
        currentPage
        totalPages
      }
    }
  }
</page-query>

<script>
import { Pager } from 'gridsome'

export default {
  name: 'HomePage',
  components: {
    Pager
  },
  metaInfo: {
    title: 'Home'
  },
  computed: {
    posts() {
      return this.$page.posts.edges ?? []
    },
    pageInfo() {
      return this.$page.posts.pageInfo ?? {}
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
