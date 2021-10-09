import { SecretData } from './types';

export function parseCaptchaUrl(data: SecretData): SecretData {
  data.captchaUrl = data.root
    .querySelector('.center-block')
    .querySelector('img')
    .getAttribute('src');
  return data;
}

export function parseFormData(data: SecretData): SecretData {
  const inputs = data.root.querySelectorAll('input');
  const formData = [...inputs].reduce((form, input) => {
    const name = input.getAttribute('name');
    if (name) form[input.getAttribute('name')] = input.getAttribute('value');
    return form;
  }, {});
  data.formData = formData;
  return data;
}
