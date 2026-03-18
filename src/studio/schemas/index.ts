import author from './author';
import blockContent from './blockContent';
import category from './category';
import { localeBlockContent, localeString } from './locale';
import post from './post';

export const schemaTypes = [localeString, localeBlockContent, post, author, category, blockContent];
