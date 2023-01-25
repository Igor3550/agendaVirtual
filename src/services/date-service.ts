import { badRequest } from "../errors/errors";
import { verifyDate } from "../utils/verify-date";

async function getDateHours(date: string) {
  const dateHours = await verifyDate(null, date, null, null);
  if(!dateHours.hourIsAvailable) throw badRequest();
  
  return dateHours;
}

const dateService = {
  getDateHours
}

export default dateService;
