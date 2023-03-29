import sharp from 'sharp';

interface URLdetails {
    source: string;
    target: string;
    width: number;
    height: number;
}
const processImages = async (details: URLdetails): Promise<null | string> => {
    try {
        await sharp(details.source)
            .resize(details.width, details.height)
            .toFile(details.target);
        return null;
    } catch {
        return `image can't be processed.`;
    }
};

export default processImages;
