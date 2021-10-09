import { HTMLElement } from 'node-html-parser';

export type SecretData = {
  root: HTMLElement;
  captchaUrl?: string;
  formData?: Record<string, string>;
};
