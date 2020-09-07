export interface PossibleValue {
  id: string,
  companyId: string,
  schema: string,
  field: string,
  fields: {
    [key: string]: {
      value: string,
      captions: {
        [key: string]: string
      }
    }
  }
}
