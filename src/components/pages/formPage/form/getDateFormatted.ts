export default function getDateFormatted(dateMax: Date, dateMinYears?: number) {
  const year = dateMinYears ? dateMax.getFullYear() - dateMinYears : dateMax.getFullYear();
  const month = dateMax.getMonth() + 1;
  const monthFormatStr = month < 10 ? '0' + month : month;
  const dayFormatStr = dateMax.getDate() < 10 ? '0' + dateMax.getDate() : dateMax.getDate();
  return `${year}-${monthFormatStr}-${dayFormatStr}`;
}
