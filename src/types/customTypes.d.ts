export interface IImgUrl {
  url_z: string;
  url_l: string;
}
export interface IDataCard {
  id: number;
  imgUrl: IImgUrl;
  title: string;
  owner: string;
  views: number;
  dateTaken: string;
  description: string;
}
export interface IFlickrPhoto {
  id: string;
  server: string;
  secret: string;
  originalformat: string;
  owner: string;
  ownername: string;
  title: string;
  views: number;
  datetaken: string;
  description: {
    _content: string;
  };
  url_z: string;
  url_l: string;
}
export interface ISearchFieldProps {
  searchValue: string;
  sendInputValue: (value: string) => void;
}
export interface ICardProps {
  data: IDataCards;
  index: number;
  handleCardLoading: () => void;
}
export interface IFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  file: string;
  gender: string;
  agree: string;
}
export interface IFormProps {
  sendData: (data: IFormData) => void;
}
interface ISelectOptions {
  value: string;
  text: string;
  hidden?: boolean;
}

type typeRadioButon = {
  value: string;
  defaultChecked?: boolean;
};
export interface IPreloaderDivStyled {
  margin?: { top?: string; right?: string; bottom?: string; left?: string };
  position?: string;
}
export interface IPreloaderStyled {
  preloaderDiv?: IPreloaderDivStyled;
  circle1?: string;
  circle2?: string;
  circle3?: string;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
}
export interface IPreloaderProps {
  styled?: IPreloaderStyled;
}

export type CustomSelectProps = {
  ref?: RefObject<HTMLSelectElement>;
  error?: string;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<ISelectOptions>;
  styled?: { select?: string; error?: string };
  [x: string]: string | RefObject<HTMLSelectElement>;
};

export type CustomInputProps = {
  error?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styled?: { input?: string; error?: string };
  [x: string]: string | RefObject<HTMLInputElement>;
};

export type CustomInputFileProps = {
  error?: string;
  inputFilesLength?: number;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteFile: () => void;
  styled?: {
    fileBox?: string;
    label?: string;
    uploadBtn?: string;
    fileName?: string;
    error?: string;
  };
  fileName?: string;
  btnText?: string;
  [x: string]: string | RefObject<HTMLInputElement>;
};

export type CustomCheckboxProps = {
  error?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styled?: { error?: string };
  [x: string]: string | RefObject<HTMLInputElement>;
};

export type CustomRadioBtnProps = {
  error?: string;
  buttons: Array<typeRadioButon>;
  name: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styled?: { error?: string };
  [x: string]: string | RefObject<HTMLInputElement>;
};
