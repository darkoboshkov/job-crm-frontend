const timeStringOptions = {
  hour12: true,
  hour: "2-digit",
  minute: "2-digit"
};

const timeFormatter = function(date) {
  return date.toLocaleTimeString("nl-NL", timeStringOptions);
};

export default timeFormatter;
