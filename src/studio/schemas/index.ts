import blockContent from './blockContent';
import category from './category';
import post from './post';
import author from './author';
import { localeBlockContent, localeString } from './locale';

export const schemaTypes = [localeString, localeBlockContent, post, author, category, blockContent];
