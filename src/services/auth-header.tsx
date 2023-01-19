export default function authHeader() {
    
    const token = localStorage.getItem('token') as any;
  
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
  }