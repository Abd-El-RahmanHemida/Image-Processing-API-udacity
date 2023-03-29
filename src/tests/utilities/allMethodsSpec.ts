import { promises as fs } from 'fs';
import path from 'path';
import * as allMethods from '../../utilities/allMethods';

describe('tests all methods', (): void => {
    it('test imagePath, if image path not exist', async (): Promise<void> => {
        const imgPath = await allMethods.imagePath({
            filename: 'faajord',
            width: '100',
            height: '100',
        });
        expect(imgPath).toBeNull();
    });

    it('test availableImageNames list', async (): Promise<void> => {
        const avaNamesList = await allMethods.availableImageNames();
        expect(avaNamesList).toEqual([
            'encenadaport',
            'fjord',
            'icelandwaterfall',
            'palmtunnel',
            'santamonica',
        ]);
    });

    it('test isImageAvailable Method', async (): Promise<void> => {
        const isNameAvailable = await allMethods.isImageAvailable('fjord');
        expect(isNameAvailable).toBeTrue();
    });

    it('test isThumbAvailable Method', async (): Promise<void> => {
        const isThumAvailable = await allMethods.isThumbAvailable({
            filename: 'fjord',
            width: '100',
            height: '-50',
        });

        expect(isThumAvailable).toBeFalse();
    });

    it('test createThumb Method', async (): Promise<void> => {
        const createThumb = await allMethods.createThumb({
            filename: 'fjord',
            width: '100',
            height: '50',
        });

        expect(createThumb).toBeNull();
    });
});
