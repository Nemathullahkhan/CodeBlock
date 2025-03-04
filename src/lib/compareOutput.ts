export const compareOldFormatOutputs = (actual: string, expected: string): boolean => {
    const normalizedActual = actual.replace(/\s+/g, " ").trim();
    const normalizedExpected = expected.replace(/\s+/g, " ").trim();
    return normalizedActual === normalizedExpected;
  };
  
  export const compareNewFormatOutputs = (actual: string, expected: string): boolean => {
    try {
      const actualArray = JSON.parse(actual);
      const expectedArray = JSON.parse(expected);
  
      if (actualArray.length !== expectedArray.length) return false;
  
      for (let i = 0; i < actualArray.length; i++) {
        if (actualArray[i].length !== expectedArray[i].length) return false;
  
        for (let j = 0; j < actualArray[i].length; j++) {
          if (actualArray[i][j] !== expectedArray[i][j]) return false;
        }
      }
  
      return true;
    } catch (error) {
      console.error("Error comparing outputs:", error);
      return false;
    }
  };