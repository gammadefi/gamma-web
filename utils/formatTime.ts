import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date : string) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date : string) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date : string) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date : Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function formatDate(currentDate : string){
   const [date , time] = currentDate.replace("T", " ").split(" ");
  //  console.log(date, time+":00");
   return `${date} ${time}:00`
   
}

export function toDateTime(secs : number) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  console.log(t);
  
  return fToNow(t);
}
