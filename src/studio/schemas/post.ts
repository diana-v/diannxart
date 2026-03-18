import { defineField, defineType } from 'sanity';

export default defineType({
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'localeString',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'localeString',
        }),
        defineField({
            name: 'slug',
            options: {
                maxLength: 96,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                source: (doc: any) => doc?.title?.en,
            },
            title: 'Slug',
            type: 'slug',
        }),
        defineField({
            name: 'author',
            title: 'Author',
            to: { type: 'author' },
            type: 'reference',
        }),
        defineField({
            name: 'mainImage',
            options: {
                hotspot: true,
            },
            title: 'Main image',
            type: 'image',
        }),
        defineField({
            name: 'images',
            of: [
                {
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alternative text',
                            type: 'string',
                        },
                    ],
                    name: 'image',
                    options: {
                        hotspot: true,
                    },
                    title: 'Image',
                    type: 'image',
                },
            ],
            options: {
                layout: 'grid',
            },
            title: 'Images',
            type: 'array',
        }),
        defineField({
            name: 'categories',
            of: [{ to: { type: 'category' }, type: 'reference' }],
            title: 'Categories',
            type: 'array',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'localeBlockContent',
        }),
        defineField({
            name: 'sold',
            title: 'Sold',
            type: 'boolean',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'string',
        }),
        defineField({
            fields: [
                { name: 'width', title: 'Width', type: 'number' },
                { name: 'height', title: 'Height', type: 'number' },
            ],
            name: 'dimensions',
            title: 'Dimensions',
            type: 'object',
        }),
        defineField({
            hidden: true,
            name: 'orderRank',
            title: 'Order rank',
            type: 'string',
        }),
    ],
    name: 'post',
    preview: {
        prepare(selection) {
            const { author, titleEn, titleLt } = selection;
            const title = titleLt ?? titleEn ?? 'Untitled';

            return { ...selection, subtitle: author && `by ${author}`, title };
        },
        select: {
            author: 'author.name',
            media: 'mainImage',
            titleEn: 'title.en',
            titleLt: 'title.lt',
        },
    },
    title: 'Post',

    type: 'document',
});
