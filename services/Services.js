/**get data */
export const get = async (URL) =>{
    const res = await fetch(URL);
    return await res.json();
}
/**post send */
export const post = async (URL,DATA) =>{
    const res = await fetch(URL,{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(DATA)
    })
}

/**edit by id */

export const editById = async (URL, id, data) =>{
    await fetch(`${URL}/${id}`,{
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
}

/**delete by id */

export const deleteById = async (URL,id) =>{
    await fetch(`${URL}/${id}`,{
        method: 'DELETE'
    })
}