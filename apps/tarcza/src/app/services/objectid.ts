export function objectID(): string {
    const timestamp = (new Date().getTime() / 1000).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16).toString(16)).toLowerCase();
}
