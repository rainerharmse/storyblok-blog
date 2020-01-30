<template>
    <div id="post" v-editable="editBlok">
        <div
            :style="{ backgroundImage: 'url(' + image + ')'}"
            class="post-thumbnail"></div>
        <section class="post-content">
          <h1>{{title}}</h1>
          <p>{{content}}</p>
        </section>
    </div>
</template>

<script>
export default {
    asyncData(context) {
        return context.app.$storyapi
          .get('cdn/stories/blog/' + context.params.postId, {
            version: process.env.NODE_ENV == 'production' ? 'published' : 'draft'
          })
          .then(res => {
              console.log(res.data)
              return {
                  editBlok: res.data.story.content,
                  title: res.data.story.content.title,
                  content: res.data.story.content.content,
                  image: res.data.story.content.thumbnail
              }
          })
    },
     mounted () {
      this.$storybridge.on(['input', 'published', 'change'], (event) => {
        if (event.action == 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content
          }
        } else {
          window.location.reload()
        }
      })
    },
}
</script>

<style scoped>
    #post{
        width: 80%;
        margin: auto;
    }
    .post-thumbnail{
        background-position: 30% center;
        background-size: cover;
        width: 100%;
        height: 30rem;
    }
    .post-content{
      width: 80%;
      max-width: 500px;
      margin: auto;
    }
    .post-content p {
      white-space: pre-line;
    }
</style>
