import { ZodError } from "zod";

function getTimeAgo(date: Date) {
    const currentDate = new Date();
    const pastDate = new Date(date);
    const timeDiff = currentDate.getTime() - pastDate.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return years === 1 ? "1 year ago" : years + " years ago";
    }
    if (weeks > 0) {
      return weeks === 1 ? "1 week ago" : weeks + " weeks ago";
    }
    if (days > 0) {
      return days === 1 ? "1 day ago" : days + " days ago";
    }
    if (hours > 0) {
      return hours === 1 ? "1 hour ago" : hours + " hours ago";
    }
    if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
    }
    return seconds <= 30 ? "just now" : seconds + " seconds ago";
  }


  function getErrorsFromZod(parsedResult: ZodError) {
    const flattenedErrors = parsedResult.flatten().fieldErrors;
    // console.log("flattenedErrors", flattenedErrors);

    const errors: any = {};
    for (const key in flattenedErrors) {
      errors[key] =
        flattenedErrors[key as keyof typeof flattenedErrors]?.join(", also ");
    }
    return errors;
  }

  export default {
    getTimeAgo,
    getErrorsFromZod
  }


export async function sleep(miliseconds: number){

    return await new Promise(resolve => setTimeout(resolve, miliseconds));
 
 }