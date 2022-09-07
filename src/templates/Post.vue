<template>
  <Layout>
    <!-- Page Header-->
    <header class="masthead" style="background-image: url('/img/post-bg.jpg')">
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="post-heading">
              <h1>{{ post.title }}</h1>
              <h2 class="subheading">{{ post.description }}</h2>
              <span class="meta">
                Posted by
                <span>{{ post.author.username }}</span>
                on {{ post.createdAt | date }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Post Content-->
    <article class="mb-4">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7" v-html="mdToHtml(post.content)"></div>
        </div>
      </div>
    </article>
  </Layout>
</template>

<page-query>
  query($id: ID!) {
    post(id: $id) {
      id
      title
      content,
      description,
      createdAt
      author {
        username
      }
    }
  }
</page-query>

<script>
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
  name: 'PostPage',
  metaInfo() {
    return {
      title: this.post.title
    }
  },
  computed: {
    post() {
      return this.$page.post;
    }
  },
  methods: {
    mdToHtml(val) {
      return md.render(val)
    }
  },
}
</script>
