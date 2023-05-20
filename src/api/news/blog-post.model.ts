import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const BlogPostModel = z.object({
    title : z.string().min(1) ,
    image : z.string().min(1) ,
    content : z.string().min(1) ,
    author : z.string().min(1) ,
    createdAt : z.string().min(1) ,
});

export type BlogPost = z.infer<typeof BlogPostModel>;
export type BlogPostId = WithId<BlogPost>;
export const BlogPosts = db.collection<BlogPost>('news');
