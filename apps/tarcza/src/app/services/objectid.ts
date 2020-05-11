export function objectID(): string {
    const timestamp = Math.floor((new Date().getTime() / 1000)).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => Math.floor((Math.random() * 16)).toString(16)).toLowerCase();
}
