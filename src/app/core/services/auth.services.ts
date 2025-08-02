import { Injectable, signal } from "@angular/core";
import { User } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _isLoggedIn = signal<boolean>(false);
    //naming convention used to indicate that the property is 
    // intended to be private or used internally within a class, module, or file. 

    private _currentUser = signal<User | null>(null);
    private _users: User[] = [
        { id: '5fa64b162183ce1728ff371d', username: 'Johny' },
        { id: '5fa64ca72183ce1728ff3726', username: 'Janee' },
        { id: '5fa64a072183ce1728ff3719', username: 'David' }
    ]

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();


    constructor() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            const user: User = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true)
        }
    }

    login(email: string, password: string): boolean {

        if (email && password) {
            const user = this._users[0];
            this._currentUser.set(user);
            this._isLoggedIn.set(true)

            localStorage.setItem('currentUser', JSON.stringify(user));

            return true;
        }

        return false;
    }

    register(username: string, email: string, phone: string, password: string, rePassword: string
    ): boolean {

        if (username && email && phone && password && rePassword) {
            const newUser: User = {
                id: `user_${Date.now()}`,
                username: username
            }

            this._users.push(newUser);
            this._currentUser.set(newUser);
            this._isLoggedIn.set(true)

            localStorage.setItem('currentUser', JSON.stringify(newUser));

            return true;
        }

        return false;

    }

    logout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
    }

    getCurrentUserId(): string | null {

        return this._currentUser()?.id || null;

    }

    
}