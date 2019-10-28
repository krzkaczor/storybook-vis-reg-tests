// We are using multiplication by 31 to ensure better uniqueness
// 31 * p === (p << 5) - p
// This trick is taken from this book https://www.amazon.com/Effective-Java-3rd-Joshua-Bloch/dp/0134685997
const hashCode = (str: string) => [...str].reduce((p, c) => c.charCodeAt(0) + ((p << 5) - p), 0);

export const generateColor = (str: string) => {
  const hash = hashCode(str);

  const color = (hash & 0x00ffffff).toString(16).toUpperCase();

  return "#00000".substring(0, 7 - color.length) + color;
};
