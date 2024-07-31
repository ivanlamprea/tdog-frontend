export const useProfile = () => useState<object>('image', () => { 
    const userCookie = useCookie('user');
    if(userCookie.value) {
        return userCookie.value;
    }
    else {
        return 'default.png'
    }
});

// export const useProfile = () => useState<any>('profilestate', () => useDefaultProfile().value);

// export const useDefaultProfile = () => {
//     const user = useCookie('user');
//     return user;    
// }