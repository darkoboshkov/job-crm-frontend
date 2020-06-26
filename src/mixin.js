import { appUrl } from "@/constants";
import English from "./plugins/i18n/languages/English.json";
import i18n from "./plugins/i18n";

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
    return new Date(string).toLocaleDateString("nl-NL", dateStringOptions);
    // return new Date(string).toLocaleDateString("en-US", dateStringOptions);
  }
  return "";
};

const convertLocalDateTimeString = string => {
  if (string) {
    return new Date(string).toLocaleDateString("nl-NL", dateStringOptions);
    // return new Date(string).toLocaleString("en-US", dateTimeStringOptions);
  }
  return "";
};

const convertLocalTimeString = string => {
  if (string) {
    return new Date(string).toLocaleTimeString("nl-NL", timeStringOptions);
    // return new Date(string).toLocaleTimeString("en-US", timeStringOptions);
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

const filterErrors = (message, key) => {
  if (message) {
    if (Array.isArray(message)) {
      const items = message.filter(error => error.param === key);
      if (items.length) {
        if (items[0].msg in English["validation"]) {
          return i18n.t(`validation.${items[0].msg}`);
        } else {
          return items[0].msg;
        }
      } else {
        return "";
      }
    } else if (!key) {
      if (message in English["validation"]) {
        return i18n.t(`validation.${message}`);
      } else {
        return message;
      }
    }
  }
  return "";
};

const contractStatus = (status, intermediaryStatus) => {
  let result = "";
  if (status === "open" || intermediaryStatus === "open") {
    result = "open";
  } else if (status === "pending" || intermediaryStatus === "pending") {
    result = "pending";
  } else if (status === "failed" || intermediaryStatus === "failed") {
    result = "failed";
  } else {
    result = "active";
  }
  return result;
};

export default {
  data() {
    return {
      dateStringOptions,
      dateTimeStringOptions,
      timeStringOptions
    };
  },
  filters: {
    dateFormatter(string) {
      return convertLocalDateString(string);
    },
    dateTimeFormatter(string) {
      return convertLocalDateTimeString(string);
    },
    errorFormatter(errors, key = null) {
      return filterErrors(errors, key);
    },
    appUrlFormatter(string) {
      return appUrl + string;
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
    }
  },
  methods: {
    getISODateString(string) {
      return convertISODateString(string);
    },
    getAppUrl(string) {
      return appUrl + string;
    },
    getDateString(string) {
      return convertLocalDateString(string);
    },
    getDateTimeString(string) {
      return convertLocalDateTimeString(string);
    },
    getFullName(user) {
      return convertFullName(user);
    },
    getAge(birthday) {
      if (birthday) {
        return new Date().getFullYear() - new Date(birthday).getFullYear();
      }
      return "-";
    },
    getContractType(companyId, hiringCompanyId) {
      return companyId === hiringCompanyId ? "worker" : "company";
    },
    getContractStatus(status, intermediaryStatus) {
      return contractStatus(status, intermediaryStatus);
    }
  }
};
