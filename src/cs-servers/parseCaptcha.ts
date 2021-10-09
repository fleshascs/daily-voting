import tesseract from 'node-tesseract-ocr';
import { StatefulFetch } from '../statefulFetch';

export async function parseCaptcha(fetch: StatefulFetch, captchaUrl: string): Promise<string> {
  const res = await fetch(captchaUrl);
  const buffer = await res.buffer();
  const text = await tesseract.recognize(buffer);

  return text.substring(0, 5);
}
