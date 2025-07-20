export let dataDesserts = [];

export const getData = async () => {
    const res = await fetch("/data.json");
    const data = await res.json();
    dataDesserts = data;
}