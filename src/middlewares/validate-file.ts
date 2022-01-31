import { Request, Response } from 'express';


export const validateFileUpload = ( req: Request, res: Response, next: any ) => {

    if ( req.file?.size === undefined ) {
        return res.status(400).json({
            ok: false,
            msg:'There is no file to upload in the request - validate-file.'
        });
    }

    // if (!req.files || Object.keys(req.files).length === 0 ) {
    //     res.status(400).json({
    //         ok: false,
    //         msg:'There is no file to upload in the request - validate-file.'
    //     });
    //     return;
    // }

    next();

}
