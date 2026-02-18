import { defineField, defineType } from 'sanity';

export const localeString = defineType({
    name: 'localeString',
    title: 'Localized string',
    type: 'object',
    fields: [
        defineField({ name: 'lt', title: 'LT', type: 'string' }),
        defineField({ name: 'en', title: 'EN', type: 'string' }),
    ],
});

export const localeBlockContent = defineType({
    name: 'localeBlockContent',
    title: 'Localized block content',
    type: 'object',
    fields: [
        defineField({ name: 'lt', title: 'LT', type: 'blockContent' }),
        defineField({ name: 'en', title: 'EN', type: 'blockContent' }),
    ],
});
