const LORAK_UPDATE = 'LORAK_UPDATE';

export const saveLorkaUpdateToLocalStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LORAK_UPDATE, new Date().toDateString());
    }
  } catch(ex) {}
}

export const checkLorkaUpdateLocalStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      const val = localStorage.getItem(LORAK_UPDATE);
      if (val) return true;
    }  
    return false;
  } catch(ex) {
    return false;
  }
}

