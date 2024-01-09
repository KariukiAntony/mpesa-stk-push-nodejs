// the timestamp should be in this format, YYYYMMDDHHmmss
function getTimeStamp() {

   function formatdate(time) {
     time = time.toString();
     return time.length < 2 ? "0" + time : time;
   }

   const date = new Date();
   const year = date.getFullYear();
   const month = formatdate(date.getMonth() + 1);
   const day = formatdate(date.getDate());
   const hours = formatdate(date.getHours());
   const minutes = formatdate(date.getMinutes());
   const seconds = formatdate(date.getSeconds())
   return `${year}${month}${day}${hours}${minutes}${seconds}`
 }

module.exports = getTimeStamp