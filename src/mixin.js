import { APP_URL } from "@/constants";

const timeStringOptions = {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
};

const dateStringOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
};

const dateTimeStringOptions = {
  ...dateStringOptions,
  ...timeStringOptions
};

const convertLocalDateString = string => {
  if (string) {
    //return new Date(string).toLocaleDateString("nl-NL", dateStringOptions);
    return new Date(string).toLocaleDateString("en-US", dateStringOptions);
  }
  return "";
};

const convertLocalDateTimeString = string => {
  if (string) {
    //return new Date(string).toLocaleDateString("nl-NL", dateStringOptions);
    return new Date(string).toLocaleString("en-US", dateTimeStringOptions);
  }
  return "";
};

const convertLocalTimeString = string => {
  if (string) {
    // return new Date(string).toLocaleTimeString("nl-NL", timeStringOptions);
    return new Date(string).toLocaleTimeString("en-US", timeStringOptions);
  }
  return "";
};

const convertISODateString = string => {
  if (string) {
    return new Date(string).toISOString().slice(0, 10);
  }
  return "";
};

const convertFullName = user => {
  let name = "";
  if (user && user.firstName) {
    name = user.firstName;
  }
  if (user && user.middleName) {
    name = name + " " + user.middleName;
  }
  if (user && user.lastName) {
    name = name + " " + user.lastName;
  }
  return name;
};

export default {
  filters: {
    dateISOFormatter(string) {
      return convertISODateString(string);
    },
    dateFormatter(string) {
      return convertLocalDateString(string);
    },
    dateTimeFormatter(string) {
      return convertLocalDateTimeString(string);
    },
    timeFormatter(string) {
      return convertLocalTimeString(string);
    },
    appUrlFormatter(string) {
      return APP_URL + string;
    },
    fullNameFormatter(user) {
      return convertFullName(user);
    },
    fileSizeFormatter(bytes) {
      const decimals = 2;
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
  },
  methods: {
    getISODateString(string) {
      return convertISODateString(string);
    },
    getAppUrl(string) {
      return APP_URL + string;
    },
    getDateString(string) {
      return convertLocalDateString(string);
    },
    getDateTimeString(string) {
      return convertLocalDateTimeString(string);
    },
    getTimeString(string) {
      return convertLocalTimeString(string);
    },
    getFullName(user) {
      return convertFullName(user);
    },
    getAge(birthday) {
      if (birthday) {
        return new Date().getFullYear() - new Date(birthday).getFullYear();
      }
      return "-";
    }
  }
};
