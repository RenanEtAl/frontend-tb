import { API } from '../config'

// API related code 


export const signup = (user) => {
    //console.log(name,email,password)
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}


export const signin = (user) => {
    //console.log(name,email,password)
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const authenticate = (data, next) => {
    // if there's window object
    if (typeof window !== 'undefined') {
        // save jwt as a JSON data
        localStorage.setItem('jwt', JSON.stringify(data))
        next() // callback func, can be used to reupdate the state
    }
}

export const signout = (next) => {
    if(typeof window !== 'undefined'){
        // remove the token in localStorage
        localStorage.removeItem('jwt')
        next()
        // make request to API
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
        .then(response => {
            console.log('signout', response)
        })
        .catch(err=> console.log(err))
    }
}

export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false
    }
    // check if jtw is in the localstorage
    if(localStorage.getItem('jwt')){
        // parse it into json
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}