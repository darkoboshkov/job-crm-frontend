const dateStringOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

const dateFormatter = function(date) {
  return date.toLocaleDateString("nl-NL", dateStringOptions);
};

export default dateFormatter;