import tesseract from 'node-tesseract-ocr';
import { StatefulFetch } from '../statefulFetch';
// import { createHeaders } from './utils';
// const fs = require('fs');

export async function parseCaptcha(fetch: StatefulFetch, captchaUrl: string): Promise<string> {
  const res = await fetch(captchaUrl);
  const buffer = await res.buffer();
  // const buffer = await downloadFile(fetch, captchaUrl, __dirname + '/aa.jpg');
  const text = await tesseract.recognize(buffer);

  return text.substring(0, 5);
}

// const downloadFile = async (fetch, url, path) => {
//   const res = await fetch(url, {
//     // headers: createHeaders({
//     //   Referer: 'http://cs-servers.lt/vote.php?sid=93439'
//     // })
//   });
//   // const buffer = await res.buffer();
//   const fileStream = fs.createWriteStream(path);
//   await new Promise((resolve, reject) => {
//     res.body.pipe(fileStream);
//     res.body.on('error', reject);
//     fileStream.on('finish', resolve);
//   });
//   return fs.readFileSync(path);
// };
