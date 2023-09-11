import moment from "moment/moment";
import { Const } from "../constants";

export const getFormattedDate = (dateObj, format = Const.DATE_TIME_FORMATS.DATE_UI) => {
    if (!dateObj) {
      return "";
    }
    return moment(dateObj.substring(0,10)).format(format);
  };

  export const getFormattedDateforUI = (dateObj) => {
    return getFormattedDate(dateObj, Const.DATE_TIME_FORMATS.DATE_UI);
  };
  
  export const getFormattedDateforAPI = (dateObj) => {
    return getFormattedDate(dateObj, Const.DATE_TIME_FORMATS.DATE_API);
  };
  