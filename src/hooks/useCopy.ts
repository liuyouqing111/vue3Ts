const useCopy = (value1: any, value2: any) => {
  if (value2) {
    for (const key in value1) {
      value1[key] = value2[key] || value2[key] === 0 ? value2[key] : value1[key]
    }
  }
}

export default useCopy
