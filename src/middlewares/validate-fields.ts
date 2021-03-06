import { Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';



export const validateFields = ( req: Request, res: Response, next: any ) => {

    const errors: Result<ValidationError> = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped() 
        });
    }

    next();
     
}


