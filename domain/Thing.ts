export type Thing = {
    id: string;
    name: string;
}

export const Things = {
    make(id: string, name: string): Thing {
        return {
            id,
            name
        }
    }
}