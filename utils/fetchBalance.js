export default async function fetchBalance() {
  try {
    const res = await fetch("https://x.com/midesofek");
    const data = res.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}

console.log(fetchBalance());
