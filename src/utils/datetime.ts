export const getDayYearString = (dateString:string) =>{
  const date = new Date(dateString);
  const day = date.getDate();
  // Получаем месяц в родительном падеже
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}г.`;
}

export const isEqualDay = (comparedDateStr:string, currentDateStr?:string)=>{
    const comparedDate = new Date(comparedDateStr);
    const currentDate = currentDateStr?  new Date(currentDateStr) : new Date();

    const comparedDateTimeStamp = new Date(comparedDate.getFullYear(), comparedDate.getMonth(), comparedDate.getDate()).getTime();
    const currentDateTimeStamp = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();

    const result = comparedDateTimeStamp === currentDateTimeStamp;

    return result;
}

export const getDateOrTimeString = (dateTimeString: string)=>{
    const date = new Date(dateTimeString);

    if(isEqualDay(dateTimeString)){
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    }
    else{
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()+1).padStart(2, '0');
        return `${day}.${month}`;
    }
}

export const getTimeString = (dateTimeString: string)=>{
    const date = new Date(dateTimeString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}
