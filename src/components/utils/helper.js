export const CHAPTER_REGEX = /\d{1,2}(?=\w*\.)/ig;

export const htmlValue = event => node => {
   let target = 'currentTarget';
   let value = 'value';
   return event[target][node][value];
}

export const trimValue = value => value.trim();

export const checkChapter = (digit, baseURL, chapter) => {
   let url;
   if (digit === 2 && chapter <= 9) {
      url = baseURL.replace(CHAPTER_REGEX, '0' + String(chapter));
   } else {
      url = baseURL.replace(CHAPTER_REGEX, String(chapter));
   }
   return url;
}
