async function getData() {
  const json = await import("./siteData.json");

  return json;
}

export default async function Page() {
  const data = await getData();

  return <main>{data.title}</main>;
}
