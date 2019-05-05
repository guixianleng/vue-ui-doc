/**
 * Created by LenGxin on 19/04/22.
 */

export function isValidUsername (str: any) {
  if (!str) {
      return '';
  }
  const valid = ['admin', 'editor'];
  return valid.indexOf(str.trim()) >= 0;
}
