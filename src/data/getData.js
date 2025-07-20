
export const getData = async () => {
    const res = await fetch("/data.json");
    const data = await res.json();
    return data;
}