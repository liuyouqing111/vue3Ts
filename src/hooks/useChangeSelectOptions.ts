const useChangeSelectOptions = (list: any[], label: string, value: string) => {
  const newArr = []
  for (const item of list) {
    newArr.push({
      label: item[label],
      value: item[value]
    })
  }

  return newArr
}

export default useChangeSelectOptions
