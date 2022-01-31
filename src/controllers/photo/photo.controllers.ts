import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';

import PhotoModel from '../../models/photo/PhotoModel';



export const getPhotos = async( req: Request, res: Response ): Promise<Response> => {

    const photos = await PhotoModel.find();
    if ( photos.length === 0 ) {
        return res.status(400).json({
            ok: false,
            msg: 'There are no photos stored in the database.'
        });
    }

    return res.status(200).json({
        ok: true,
        quantity: photos.length,
        photos
    });

}

export const getPhotoById = async ( req: Request, res: Response ): Promise<Response> => {

    const id: string = req.params.id;
    
    const photo = await PhotoModel.findById( id );
    if ( [photo].length === 0 ) {
        return res.status(400).json({
            ok: false,
            msg: 'There are no photos stored in the database.'
        });
    }

    return res.status(200).json({
        ok: true,
        photo
    });

}

export const createPhoto = async( req: Request, res: Response ): Promise<Response> => {

    const { title, description } = req.body;
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file?.path
    };

    const photo = new PhotoModel( newPhoto );
    
    try {

        await photo.save();
        return res.status(201).json({
            ok: true,
            msg: 'Photo successfully saved',
            photo
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error trying to upload image to database.'
        });
    }

    
}

export const deletePhotoById = async ( req: Request, res: Response ): Promise<Response> => {

    const id: string = req.params.id;
    
    try {
        
        const photo = await PhotoModel.findByIdAndRemove( id );
        if ( photo ) {
            await fs.unlink(path.resolve(photo.imagePath));
        }

        return res.status(200).json({
            ok: true,
            msg: 'The photo was successfully deleted.',
            photo
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error trying to delete photo.'
        })
    }
    
}

export const updatePhotoById = async ( req: Request, res: Response ): Promise<Response> => {

    const id: string = req.params.id;
    const { title, description } = req.body;
    
    const photo = await PhotoModel.findById( id );
    if ( [photo].length === 0 ) {
        return res.status(400).json({
            ok: false,
            msg: 'There are no photos stored in the database.'
        });
    }

    try {
        const updatedPhoto = await PhotoModel.findByIdAndUpdate(id, {
            title,
            description
        }, { new: true });

        if ( !updatedPhoto ) {
            return res.status(400).json({
                ok: false,
                msg: 'Error trying to modify the attributes of the photo entity.'
            });
        }

        return res.status(200).json({
            ok: true,
            msg: 'Photo entity attributes updated successfully.',
            updatedPhoto
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error trying to modify the attributes of the photo entity.'
        });
    }

}
