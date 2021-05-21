export default function timeStampToDate(timeStamp, request) {
  if (timeStamp === null) {
    return null;
  }
  const dateObject = new Date(timeStamp * 1000);
  const longDateFormat = dateObject
    .toLocaleString('en-GB', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toString();
  
  const mediumDateFormat = dateObject
  .toLocaleString('en-GB', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
  .toString();

  const shortDateFormat = dateObject
  .toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric'
  })
  .toString();

  const onlyHourFormat = dateObject
  .toLocaleString('en-GB', {
    hour: 'numeric',
  })
  .toString();

  const today = new Date(Date.now());
  const todayDateFormat = today
    .toLocaleString('en-GB', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
    .toString();

    if (request === 'getLongFormat') {
      return longDateFormat
    }

    if (request === 'getMediumFormat') {
      if (todayDateFormat === mediumDateFormat) {
        return 'Today';
      }
      return mediumDateFormat
    }

    if (request === 'getHourOnly') {
      return onlyHourFormat
    }

    return shortDateFormat
}
