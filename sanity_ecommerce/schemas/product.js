export default {
    name: 'product',
    tittle: 'Product',
    type: 'document',
    fields : [
        {
            name: 'images',
            tittle: 'Image',
            type: 'array',
            of: [{ type: 'image'}],
            option: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        },
    ]
}