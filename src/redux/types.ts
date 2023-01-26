type Company = {
    name: string,
    salary: number,
}
type AppState = {
    name: string,
    title: string,
    companies: Company[],
}

export { Company, AppState };