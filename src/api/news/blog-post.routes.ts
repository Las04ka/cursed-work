import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { authenticateAdmin, validateRequest } from '../../middlewares';
import { addPost, deletePost, editPost, getPosts } from './blog-post.handlers';

const router = Router();

router.get('', getPosts);
router.post('', authenticateAdmin, addPost);
router.delete('/:id', [authenticateAdmin, validateRequest({params: ParamsWithId})], deletePost);
router.put('/:id', authenticateAdmin, editPost);

export default router;