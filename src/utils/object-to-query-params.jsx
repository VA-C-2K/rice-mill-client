export function objectToQueryString(obj) {
    const params = new URLSearchParams();
    
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value);
      }
    });
  
    return params.toString();
  }