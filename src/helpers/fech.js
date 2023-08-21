
// const baseUrl = process.env.REACT_APP_API_URL
 const baseUrl = 'http://localhost:4000/api'


export const fechWithoToken = (endpoint,data, method = 'GET')=>{

    const url = `${baseUrl}/${endpoint}`

    if(method === 'GET'){
        return fetch(url)
    }else{
        return fetch(url,{
            method,
            headers:{
                'Content-type': 'application/json'
            },
            body:JSON.stringify(data),
        })
    }

}

export const fechToken = (endpoint,data, method = 'GET')=>{

    const url = `${baseUrl}/${endpoint}`
    const token = localStorage.getItem('token') || ''

    if(method === 'GET'){
        return fetch(url,{
            method,
            headers:{
                'x-token':token,
            }
        })
    }else{
        return fetch(url,{
            method,
            headers:{
                'Content-type': 'application/json',
                'x-token':token,
            },
            body:JSON.stringify(data),
        })
    }

}