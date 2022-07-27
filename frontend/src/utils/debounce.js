function debounce(cb) {
  let debounceTimer = null;

  return function (...args) {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      cb(...args);
    }, 150);
  };
}

export default debounce;
