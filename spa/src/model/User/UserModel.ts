class UserModel {
    userId: number = 0;
    socialUid: string = '';
    name: string = '';
    photo?: string | null;
    token: string = '';
    userName: string = '';
    email: string = '';
    phone: string = '';
    constructor() { }
}

export default UserModel;
