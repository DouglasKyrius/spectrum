export function displayNameFallback(displayName: string) {
  const arrName = displayName.trim().split(' ');

  let charsName: string;
  if (arrName.length >= 2) {
    charsName = `${arrName[0][0]}${arrName[1][0]}`;
  } else {
    charsName = `${arrName[0][0]}${arrName[0][1]}`;
  }

  return charsName;
}
