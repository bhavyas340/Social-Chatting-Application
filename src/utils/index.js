export * from './constants';

export const setItemInLocalStorage = (key, value)=>{
    if(!key || !value){
        return console.error("Cannot store the LS")
    }

    const valueTOStore = typeof value != "string" ? JSON.stringify(value): value;
    localStorage.setItem(key, valueTOStore);
}

export const getItemFromLocalStorage = (key)=>{
    if(!key){
        return console.error("Cannot get the value from LS")
    }

    return localStorage.getItem(key);
}

export const removeItemFromLocalStorage = (key)=>{
    if(!key){
        return console.error("Cannot store the LS")
    }

    localStorage.removeItem(key);
}

export const getFormBody = (params) => {
    let formBody = [];
  
    for (let property in params) {
      let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
      let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123
  
      formBody.push(encodedKey + '=' + encodedValue);
    }
  
    return formBody.join('&'); // 'username=aakash&password=123213'
  };