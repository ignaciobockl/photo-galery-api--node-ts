export const normalizePort = (val: number | string): number | string | boolean => {
    const normPort: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(normPort)) {
      return val;
    } else if (normPort >= 0) {
      return normPort;
    } else {
      return false;
    }
};