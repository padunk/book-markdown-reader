export const CHAPTER_REGEX = /\d{1,2}(?=\w*\.)/ig;

export const htmlValue = event => node => {
   let target = 'currentTarget';
   let value = 'value';
   return [event][target][node][value];
}

export const trimValue = value => value.trim();
