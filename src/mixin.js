import { APP_URL } from "@/constants";

const dateStringOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
};

const timeStringOptions = {
  hour12: true,
  hour: "2-digit",
  minute: "2-digit"
};

const getLocalDateString = string => {
  //return new Date(string).toLocaleDateString("nl-NL", dateStringOptions);
  return new Date(string).toLocaleDateString();
};

const getLocalDateTimeString = string => {
  //return new Date(string).toLocaleDateString("nl-NL", dateStringOptions);
  return new Date(string).toLocaleString();
};

const getLocalTimeString = string => {
  // return new Date(string).toLocaleTimeString("nl-NL", timeStringOptions);
  return new Date(string).toLocaleTimeString();
};

const getFullName = user => {
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
    dateFormatter(string) {
      return getLocalDateString(string);
    },
    dateTimeFormatter(string) {
      return getLocalDateTimeString(string);
    },
    timeFormatter(string) {
      return getLocalTimeString(string);
    },
    appUrlFormatter(string) {
      return APP_URL + string;
    },
    fullNameFormatter(user) {
      return getFullName(user);
    }
  },
  methods: {
    getAppUrl(string) {
      return APP_URL + string;
    },
    getDateString(string) {
      return getLocalDateString(string);
    },
    getDateTimeString(string) {
      return getLocalDateTimeString(string);
    },
    getTimeString(string) {
      return getLocalTimeString(string);
    },
    getFullName(user) {
      return getFullName(user);
    },
    getAge(birthday) {
      if (birthday) {
        return new Date().getFullYear() - new Date(birthday).getFullYear();
      }
      return "-";
    }
  }
};
