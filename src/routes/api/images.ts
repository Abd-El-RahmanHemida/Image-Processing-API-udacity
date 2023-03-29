import express from 'express';
import * as allMethods from '../../utilities/allMethods';

interface ImageQuery {
    filename?: string;
    width?: string;
    height?: string;
}

const validate = async (query: ImageQuery): Promise<null | string> => {
    // Check if requested file is available
    if (!(await allMethods.isImageAvailable(query.filename))) {
        const availableImageNamesList: string = (
            await allMethods.availableImageNames()
        ).join(' || ');
        return `Please pass a valid filename in the 'filename' query segment. Available filenames are: ${availableImageNamesList}.`;
    }

    if (!query.width && !query.height) {
        return null;
    }

    // Check width
    const width: number = parseInt(query.width || '');
    if (Number.isNaN(width) || width < 1 || width > 5000) {
        return `Please provide a positive numerical value for the width, the width must be bigger than 1 and smaller than 5000`;
    }

    // Check height
    const height: number = parseInt(query.height || '');
    if (Number.isNaN(height) || height < 1 || height > 5000) {
        return `Please provide a positive numerical value for the height,  the height must be bigger than 1 and smaller than 5000`;
    }

    return null;
};

const images: express.Router = express.Router();

images.get(
    '/',
    async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        // check whether request can be worked with
        const validateQuary: null | string = await validate(request.query);
        if (validateQuary) {
            response.send(validateQuary);
            return;
        }

        // create thumb (cache)

        let newImage: null | string = '';

        if (!(await allMethods.isThumbAvailable(request.query))) {
            newImage = await allMethods.createThumb(request.query);
        }

        //display image
        if (newImage) {
            response.send(newImage);
            return;
        }

        const path: null | string = await allMethods.imagePath(request.query);
        if (path) {
            response.sendFile(path);
        }
    }
);
export default images;
