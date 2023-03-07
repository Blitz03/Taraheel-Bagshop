export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'id',
      title: 'Id',
      type: 'string',
      options: {
        source: 'id',
        maxLength: 90,
      },
    },
    {
      name: 'size',
      title: 'Size',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'color',
      title: 'Color',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
  ],
}
