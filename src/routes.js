import Login from './Login.svelte';
import Main from './Main.svelte';
import Profile from './Profile.svelte';
import Dashboard from './Dashboard.svelte';

export default {
    '/': Login,
    '/login': Login,
    '/home': Main,
    '/profile': Profile,
    '/dashboard': Dashboard,
    '*': Login,
}