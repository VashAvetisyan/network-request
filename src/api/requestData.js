const requestData = (method, url, data = null) => {
    return fetch(url, {
        method,
        headers: data ? { 'Content-Type' : 'application/json'} : {},
        body: data ? JSON.stringify(data) : null
    })
        .then(res => {
            if(res.status < 400){
                return res.json()
            }else{
                throw new Error("Network Error")
            }
        })
}


const getAllPosts = (method, url, data = null) => {
    return requestData('GET', 'https://jsonplaceholder.typicode.com/posts')
}

const getAllTodos = () => {
    return requestData('GET', 'https://jsonplaceholder.typicode.com/todos')
}

export {getAllPosts, getAllTodos}