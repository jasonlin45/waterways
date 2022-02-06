import Login from './Login.svelte';
import Main from './Main.svelte';

export default {
    '/': Login,
    '/login': Login,
    '/home': Main,
    '*': Login,
}