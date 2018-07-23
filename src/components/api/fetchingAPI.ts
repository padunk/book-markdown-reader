const urlBooks = 'http://localhost:3001';

export const fetchChapter = async(url: string) => {
    const res = await fetch(url);
    return res.text();
}

const headers = {
    'Accept': 'application/json',
    'Authorization': 'books',
    'Content-Type': 'application/json',    
}

export const fetchBooks = async() => {
    const res = await fetch(`${urlBooks}/books`, { headers });
    return res.json();
}

export const addBooks = (author: string, 
    title: string,
    digit: number | null,
    start: number,
    end: number,
    id: string,
    img: string,
    url: string) => {

    fetch(`${urlBooks}/books`, { 
        body: JSON.stringify ({
            author,
            ch_digit: digit,
            ch_end: end,
            ch_start: start,
            id,
            image_src: img,
            title,
            url
        }),
        headers,
        method: 'POST',
     })
}