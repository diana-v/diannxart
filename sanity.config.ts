import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

import { schemaTypes } from './src/studio/schemas';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
    name: 'default',
    title: isProduction ? process.env.NEXT_PUBLIC_SANITY_TITLE : import.meta.env.SANITY_STUDIO_TITLE,

    projectId: isProduction ? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID : import.meta.env.SANITY_STUDIO_PROJECT_ID,
    dataset: isProduction ? process.env.NEXT_PUBLIC_SANITY_DATASET : import.meta.env.SANITY_STUDIO_DATASET,

    plugins: [
        deskTool({
            structure: (S, context) => {
                return S.list()
                    .title('Content')
                    .items([
                        orderableDocumentListDeskItem({ type: 'post', title: 'Post', S, context }),
                        S.documentTypeListItem('author'),
                        S.documentTypeListItem('category'),
                    ]);
            },
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
});
