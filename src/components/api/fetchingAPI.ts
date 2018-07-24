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

export const addBook = (author: string, 
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
     .then(res => res.json())
}

export const editBook = (
    author: string, 
    title: string,
    digit: number,
    start: number,
    end: number,
    id: number | string,
    img: string,
    url: string) => {

    fetch(`${urlBooks}/books/${id}`, { 
        body: JSON.stringify ({
            book_author: author,
            book_title: title,
            chapter_digit: digit,
            chapter_end: end,
            chapter_start: start,
            image_src: img,
            url
        }),
        headers,
        method: 'PUT',
     })
     .then(res => res.json())
}

export const DELETE_BOOK = (id: string | number) => {
    fetch(`${urlBooks}/books/${id}`, {
        headers,
        method: 'DELETE'
    })
    .then(res => res.json())
}