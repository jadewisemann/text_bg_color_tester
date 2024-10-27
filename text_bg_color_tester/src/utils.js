export const fetchFromJson = async (domain) => {
  try {
    const response = await fetch(domain);
    const data = await response.json();
    const updateData = removeDuplicates(data)
    return updateData
  } catch (error) {
    console.error('Failed to load colors:', error);
    return []
  }
};

export const removeDuplicates = array => {
  const seen = new Set();
  return array.filter(item => {
    const serialized = JSON.stringify(item);
    if (seen.has(serialized)) {
      return false;
    }
    seen.add(serialized);
    return true;
  });
}

const SAFE_COLOR_NAMES = new Set([
  "black", "white", "red", "lime", "blue", "yellow", "cyan",
  "magenta", "gray", "grey", "maroon", "green", "navy",
  "teal", "olive", "purple", "silver", "aqua", "fuchsia"
]);

const HEX_COLOR_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const isValidColor = color => 
  SAFE_COLOR_NAMES.has(color.toLowerCase()) || HEX_COLOR_PATTERN.test(color);

export const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};
  