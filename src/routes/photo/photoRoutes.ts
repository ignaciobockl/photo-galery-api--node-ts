import { Router } from 'express';
import multer from '../../libs/multer';
import { check } from 'express-validator';
import { validateFields } from '../../middlewares/validate-fields';
import { validateFileUpload } from '../../middlewares/validate-file';

import { 
    createPhoto, 
    getPhotos,
    getPhotoById, 
    deletePhotoById,
    updatePhotoById
} from '../../controllers/photo/photo.controllers';


const router = Router();

router.route('/')
    .get( getPhotos )
    .post( multer.single('image') , [
        check('title', 'Title is required.').not().isEmpty(),
        check('description', 'Description is required.').not().isEmpty(),
        validateFileUpload,
        validateFields
    ], createPhoto);

router.route('/:id')
    .get( [
        check('id', 'It is not a valid Mongo id.').isMongoId(),
        validateFields
    ], getPhotoById )
    .delete( [
        check('id', 'It is not a valid Mongo id.').isMongoId(),
        validateFields
    ], deletePhotoById )
    .put( [
        check('id', 'It is not a valid Mongo id.').isMongoId(),
        validateFields
    ], updatePhotoById );


export default router;
