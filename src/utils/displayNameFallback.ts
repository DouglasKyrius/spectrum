export function displayNameFallback(displayName: string) {
  if (!displayName) return '';

  let charsName: string;
  const arrName = displayName.trim().split(' ');
  if (arrName.length >= 2) {
    charsName = `${arrName[0][0]}${arrName[1][0]}`;
  } else {
    charsName = `${arrName[0][0]}${arrName[0][1]}`;
  }

  return charsName || '';
}
