export default function formatString(string, permittedLength) {
  if (string.length > permittedLength) {
    return (string = `${string.slice(0, permittedLength)}...`);
  }
  return string;
}
