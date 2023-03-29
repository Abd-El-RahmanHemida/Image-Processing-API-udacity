import { promises as fs } from 'fs';
import path from 'path';
import processImages from './process-images';

interface ImageQuery {
    filename?: string;
    width?: string;
    height?: string;
}

// Default paths
const imagesFullPath = path.resolve(__dirname, '../../images/full');
const imagesThumbPath = path.resolve(__dirname, '../../images/thumb');

const imagePath = async (details: ImageQuery): Promise<null | string> => {
    if (!details.filename) {
        return null;
    }
    const filePath: string =
        details.width && details.height
            ? path.resolve(
                  imagesThumbPath,
                  `${details.filename}-${details.width}x${details.height}.jpg`
              )
            : path.resolve(imagesFullPath, `${details.filename}.jpg`);

    // check file exist
    try {
        await fs.access(filePath);
        return filePath;
    } catch {
        return null;
    }
};

const availableImageNames = async (): Promise<string[]> => {
    try {
        return (await fs.readdir(imagesFullPath)).map(
            (filename: string): string => filename.split('.')[0]);
    } catch {
        return [];
    }
};
// check is image available
const isImageAvailable = async (filename: string = ''): Promise<boolean> => {
    if (!filename) {
        return false;
    }

    return (await availableImageNames()).includes(filename);
};
// check is thumb available
const isThumbAvailable = async (details: ImageQuery): Promise<boolean> => {
    if (!details.filename || !details.width || !details.height) {
        return false;
    }
    const filePath: string = path.resolve(
        imagesThumbPath,
        `${details.filename}-${details.width}x${details.height}.jpg`
    );

    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
};
const createThumb = async (details: ImageQuery): Promise<null | string> => {
    if (!details.filename || !details.width || !details.height) {
        return null; // Nothing to do
    }

    const filePathFull: string = path.resolve(
        imagesFullPath,
        `${details.filename}.jpg`
    );
    const filePathThumb: string = path.resolve(
        imagesThumbPath,
        `${details.filename}-${details.width}x${details.height}.jpg`
    );

    // Resize original image and store as thumb
    return await processImages({
        source: filePathFull,
        target: filePathThumb,
        width: parseInt(details.width),
        height: parseInt(details.height),
    });
};
export {
    imagePath,
    availableImageNames,
    isImageAvailable,
    isThumbAvailable,
    createThumb,
};
