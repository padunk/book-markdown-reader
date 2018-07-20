
export const fetchChapter = async(url: string) => {
    const res = await fetch(url);
    return res.text();
}