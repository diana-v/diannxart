import blockContent from './blockContent';
import category from './category';
import post from './post';
import author from './author';
import { localeBlockContent, localeSlug, localeString } from './locale';

export const schemaTypes = [localeString, localeBlockContent, localeSlug, post, author, category, blockContent];
