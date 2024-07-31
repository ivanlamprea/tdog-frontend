export const useSession = () => {
    const user = () : any => {
        const token:any = useCookie('token');
        const parts = token.value.split('.');
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        return payload;
    }
    return { user }
}