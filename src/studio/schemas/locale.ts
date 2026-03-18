import { defineField, defineType } from 'sanity';

export const localeString = defineType({
    fields: [
        defineField({ name: 'lt', title: 'LT', type: 'string' }),
        defineField({ name: 'en', title: 'EN', type: 'string' }),
    ],
    name: 'localeString',
    title: 'Localized string',
    type: 'object',
});

export const localeBlockContent = defineType({
    fields: [
        defineField({ name: 'lt', title: 'LT', type: 'blockContent' }),
        defineField({ name: 'en', title: 'EN', type: 'blockContent' }),
    ],
    name: 'localeBlockContent',
    title: 'Localized block content',
    type: 'object',
});
