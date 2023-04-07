export const ROUTES = {
  main: '/',
  about: '/about',
  notFound: '*',
  form: '/form',
  cards: '/cards',
};
export const DEFAULT = 'default';
export const VALIDATION = 'validation';
export const RESET = 'reset';
export const ERROR_TEXT = {
  empty: 'This field cannot be empty.',
  symbols: 'Field must contain only letters, apostrophes and hyphens.',
  date: 'Enter your Date Of Birth.',
  dateRange: 'Date must be between ',
  country: 'Select your country.',
  fileNotSelected: 'No picture selected',
  file: 'Upload a profile picture.',
  switcher: 'Select your gender.',
  agree: 'You must agree.',
};
export const FLICKR_SEARCH_URL =
  'https://www.flickr.com/services/rest/?method=flickr.photos.search';
export const FLICKR_SEARCH_PARAMS =
  'format=json&nojsoncallback=1&media=photos&extras=owner_name,license,views,description,date_taken,url_z,url_l,original_format';
export const FLICKR_SERVER_PHOTOS_URL = 'https://live.staticflickr.com';
export const FLICKR_API_KEY = 'api_key=d2af878f1932e92147f159ded98b5234';
export const FLICKR_SORT = {
  relevance: 'relevance',
  interestingnessAsc: 'interestingness-asc',
  interestingnessDesc: 'interestingness-desc',
  datePostedAsc: 'date-posted-asc',
  datePostedDesc: 'date-posted-desc',
  dateTakenAsc: 'date-taken-asc',
  dateTakenDesc: 'date-taken-desc',
};
export const FLICKR_PHOTO_DEFAULT_FORMAT = 'png';
export const ERROR_FETCH_TEXT = 'Something went wrong! Error message:';
export const ERROR_SEARCH_TEXT = 'No results for';
export const MODALWINDOW_ANIMTYPE = {
  animScale: 'animScale' as const,
};
export const CARDSBOX_MIN_HEIGHT = 200;
