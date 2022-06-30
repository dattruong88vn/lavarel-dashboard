import moment from "moment"

export const formatDate = (datestamp: number, formatType: string) => {
  return moment(datestamp).format(formatType)
}