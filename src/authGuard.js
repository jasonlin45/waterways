import { authState } from 'rxfire/auth';
import { auth } from './firebase';
import { push } from 'svelte-spa-router';

export function authGuard() {
    return authState(auth).subscribe(u=>{if(!u) push('/login')});;
}