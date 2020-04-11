const Swal = require("sweetalert2");
import store from "./store";
import axios from "./axios";
import html2pdf from "html2pdf.js";

/**
 * Toast
 *
 * @param message
 * @param icon
 * @constructor
 */
export const Toast = (message, icon) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });
  Toast.fire({
    icon: icon,
    title: message
  });
};

/**
 *
 * @param message
 * @param icon
 * @param position
 * @param showConfirm
 * @param timer
 * @constructor
 */
export const Alert = (message, icon, position, showConfirm, timer) => {
  Swal.fire({
    title: message ? message : "",
    icon: icon ? icon : "success",
    position: position ? position : "",
    showConfirmButton: showConfirm ? showConfirm : true,
    timer: timer ? timer : 0
  });
};

/**
 * Check if token is valid and is not expired
 * @param tokenExpiresIn
 * @returns {boolean}
 */
export const checkValidJwt = tokenExpiresIn => {
  if (tokenExpiresIn) {
    if (tokenExpiresIn > Date.now() / 1000) {
      return true;
    }
  }
  return false;
};

/**
 * Allow next action only if user is authenticated and token is not expired
 * @param to
 * @param from
 * @param next
 */
export const ifAuthenticated = (to, from, next) => {
  if (
    store.state.token.jwt != null &&
    checkValidJwt(store.state.token.expiresIn)
  ) {
    if (!store.state.user.verified) {
      next("/verify");
      return;
    }
    next();
    return;
  }
  next("/login");
};

/**
 * Allow next action only if user is not authenticated or token is expired
 * @param to
 * @param from
 * @param next
 */
export const ifNotAuthenticated = (to, from, next) => {
  if (
    store.state.token.jwt == null ||
    !checkValidJwt(store.state.token.expiresIn)
  ) {
    next();
    return;
  }
  if (!store.state.user.verified) {
    next("/verify");
    return;
  }
  next("/dashboard");
};

/**
 * Check if Admin user is authorized
 * @param to
 * @param from
 * @param next
 */
export const isAdminAuthorized = (to, from, next) => {
  if (store.state.user && store.state.user.role === "admin") {
    next();
    return;
  }
  next({ name: "404" });
};

/**
 * Check if manager user is authorized
 * @param to
 * @param from
 * @param next
 */
export const isManagerAuthorized = (to, from, next) => {
  if (
    store.state.user &&
    (store.state.user.role === "manager" || store.state.user.role === "owner")
  ) {
    next();
    return;
  }
  next({ name: "404" });
};

/**
 * Check if worker user is authorized
 * @param to
 * @param from
 * @param next
 */
export const isWorkerAuthorized = (to, from, next) => {
  if (store.state.user && store.state.user.role === "worker") {
    if (!store.state.user.companyId) {
      next({ name: "welcome" });
      return;
    }
    next();
    return;
  }
  next({ name: "404" });
};

/**
 * Actions after login
 * @param userInfo
 * @param token
 */
export const handleLogin = (token, userInfo) => {
  store.dispatch("token/updateToken", token);
  store.dispatch("user/updateUserInfo", userInfo);
  axios.defaults.headers["Authorization"] = "Bearer " + token.jwt;
};

/**
 * Actions after log out
 */
export const handleLogout = () => {
  store.dispatch("token/removeToken");
  delete axios.defaults.headers["Authorization"];
};

/**
 * Download File
 */
export const downloadFile = (blob, fileName) => {
  const fileURL = window.URL.createObjectURL(new Blob([blob]));
  const fileLink = document.createElement("a");
  fileLink.href = fileURL;
  fileLink.setAttribute("download", fileName);
  document.body.appendChild(fileLink);
  fileLink.click();
  document.body.removeChild(fileLink);
};

/**
 * Export PDF
 */
export const exportPDF = async (elementId, fileName) => {
  const element = document.getElementById(elementId);
  const opt = {
    margin: 0.35,
    filename: fileName,
    image: { type: "pdf", quality: 0.1 },
    html2canvas: { scale: 1, letterRendering: true },
    jsPDF: {
      unit: "in",
      format: "b4",
      orientation: "portrait",
      compress: true
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] }
  };
  await html2pdf()
    .from(element)
    .set(opt)
    .save();
};

/**
 * Serialize Contract Status
 */
export const serializeContractStatus = (role, status) => {
  let state = {
    text: "",
    color: ""
  };

  if (role === "worker") {
    switch (status) {
      case "open":
        state = {
          text: "Not able to see",
          color: "color-yellow"
        };
        break;
      case "pending-worker":
        state = {
          text: "Pending",
          color: "color-yellow"
        };
        break;
      case "active":
        state = {
          text: "Signed",
          color: "color-green"
        };
        break;
      case "completed":
        state = {
          text: "Completed",
          color: "color-red"
        };
        break;
    }
  }

  if (role === "manager") {
    switch (status) {
      case "open":
        state = {
          text: "Pending",
          color: "color-yellow"
        };
        break;
      case "pending-worker":
        state = {
          text: "Signed",
          color: "color-blue"
        };
        break;
      case "active":
        state = {
          text: "Signed",
          color: "color-green"
        };
        break;
      case "completed":
        state = {
          text: "Completed",
          color: "color-red"
        };
        break;
    }
  }

  return state;
};
