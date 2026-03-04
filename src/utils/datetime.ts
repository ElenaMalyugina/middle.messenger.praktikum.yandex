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

export const getTimeString = (dateTimeString: string)=>{
    const date = new Date(dateTimeString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
}