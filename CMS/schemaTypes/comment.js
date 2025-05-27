export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      name: 'name',
      comment: 'comment',
      publishedAt: 'publishedAt',
      postTitle: 'post.title'
    },
    prepare({ name, comment, publishedAt, postTitle }) {
      return {
        title: `Comment by ${name} on "${postTitle || 'Untitled Post'}"`,
        subtitle: comment,
        description: new Date(publishedAt).toLocaleDateString()
      }
    }
  },
  orderings: [
    {
      title: 'Post Title',
      name: 'postTitleAsc',
      by: [
        {field: 'post.title', direction: 'asc'}
      ]
    },
    {
      title: 'Publication Date, New',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Author Name',
      name: 'authorNameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    }
  ]
}