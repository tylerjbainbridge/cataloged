import sharp = require('sharp');
import { ReadStream } from 'fs';

export const getBufferFromStream = (stream: ReadStream) =>
  new Promise(resolve => {
    const bufs: any[] = [];

    stream.on('data', function(d) {
      bufs.push(d);
    });
    stream.on('end', function() {
      resolve(Buffer.concat(bufs));
    });
  });

export class ImageService {
  static async processImages(stream: ReadStream) {
    const original = await getBufferFromStream(stream);

    const full = await sharp(original)
      .jpeg({ quality: 80 })
      .toBuffer();

    const square = await sharp(original)
      .resize(400, 400)
      .jpeg({ quality: 50 })
      .toBuffer();

    return {
      original,
      full,
      square,
    };
  }
}
