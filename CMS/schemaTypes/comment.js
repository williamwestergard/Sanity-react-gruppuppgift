export default {
    name: 'comments',
    title: 'Comments',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Name' },
          { name: 'comment', type: 'text', title: 'Comment' },
          { name: 'createdAt', type: 'datetime', title: 'Created At' }
        ]
      }
    ]
  }