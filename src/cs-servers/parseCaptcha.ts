import tesseract from 'node-tesseract-ocr';

export async function parseCaptcha(captchaImageBuffer: Buffer): Promise<string> {
  const text = await tesseract.recognize(captchaImageBuffer);
  return text.substring(0, 5);
}
