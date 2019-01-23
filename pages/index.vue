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
  data(){
    return{
      posts:[
        {
          id:1,
          title: 'A new beginning',
          previewText: 'This will be awesome and its an exceprt',
          thumbnailUrl: 'http://www.hdfmagazine.com/wp-content/uploads/2014/12/Caroline-Gutman-medium.jpeg'
        },
        {
          id:2,
          title: 'A SECOND new beginning',
          previewText: 'This will be awesome and its an exceprt',
          thumbnailUrl: 'http://www.hdfmagazine.com/wp-content/uploads/2014/12/Caroline-Gutman-medium.jpeg'
        }
      ]
    }
  }
}
</script>

<style scoped>
  #posts{
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    margin: 5rem;
    flex-direction: column
  }

  @media (min-width: 35rem) {
      #posts{
        flex-direction: row;
        align-items: center;
      }
  }
</style>
