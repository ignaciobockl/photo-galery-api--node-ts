import { Router } from 'express';

import PhotoRoutes from './photo/photoRoutes';


const router = Router();

router.use('/photo', PhotoRoutes);


export default router;
