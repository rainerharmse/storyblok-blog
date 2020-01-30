<template>
  <section id="posts">
    <PostPreview v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :excerpt="post.previewText"
      :thumbnailImage="post.thumbnailUrl"/>
  </section>
</template>

<script>

import PostPreview from '@/components/Blog/PostPreview'

export default {
  components:{
    PostPreview
  },
  asyncData(context){

    return context.app.$storyapi.get('cdn/stories', {
      version: context.isDev ? 'draft' : 'published',
      starts_with: 'blog/'
    })
    .then(res => {
      return {
        posts: res.data.stories.map(blogPost => {
          console.log(blogPost)
          return {
            id: blogPost.slug,
            title: blogPost.content.title,
            previewText: blogPost.content.summary,
            thumbnailUrl: blogPost.content.thumbnail
          }
        })
      }
    })
    .catch((res) => {
      context.error(console.log(res))
    })
  }
}
</script>

<style scoped>
  #posts{
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    margin: 5rem;
    flex-direction: column;
  }

  @media (min-width: 35rem) {
      #posts{
        flex-direction: row;
        align-items: center;
      }
  }
</style>
