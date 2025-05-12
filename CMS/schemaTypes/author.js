export default {
  name: 'author',
  title: 'Author',
  type: 'document',

  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },

    {
      name: 'bio',
      type: 'text',
      name: 'Bio',
    },

    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
  ],
}
