import {NextFunction, Request, Response} from 'express';
import {ObjectId} from 'mongodb';
import {ParamsWithId} from '../../interfaces/ParamsWithId';
import {BlogPost, BlogPostModel, BlogPosts} from "./blog-post.model";

export async function getPosts(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await BlogPosts.find().toArray());
    } catch (error) {
        next(error);
    }
}

export async function addPost(req: Request<{}, {}, BlogPost>, res: Response, next: NextFunction) {
    try {
        const employee = BlogPostModel.parse(req.body);

        const insertResult = await BlogPosts.insertOne(employee);
        if (!insertResult) {
            next('Error inserting employee.');
            return;
        }

        res.status(200).json({
            message: 'created Successfully',
        });
    } catch (error) {
        next(error);
    }
}

export async function deletePost(req: Request<ParamsWithId, {}, {}>, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        const existingEmployee = await BlogPosts.findOne({_id: new ObjectId(id)});

        if (!existingEmployee) {
            return res.status(400).json({message: 'blog post does not exist'});
        }

        const deleteResult = await BlogPosts.deleteOne({_id: new ObjectId(id)});

        if (!deleteResult.acknowledged) {
            next('Error deleting blog post.');
            return;
        }

        res.status(200).json({
            message: 'blog post deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}

export async function editPost(req: Request<ParamsWithId, {}, BlogPost>, res: Response, next: NextFunction) {
    try {
        const employee = req.body;
        const {id} = req.params
        const existingEmployee = await BlogPosts.findOne({_id: new ObjectId(id)});

        if (!existingEmployee) {
            return res.status(400).json({message: 'Blog post does not exist'});
        }

        const editResult = await BlogPosts.updateOne({_id: new ObjectId(id)}, {$set: employee});

        if (!editResult.acknowledged) {
            next('Error editing blog post.');
            return;
        }

        res.status(200).json({
            message: 'Blog post edited successfully',
        });
    } catch (error) {
        next(error);
    }
}


