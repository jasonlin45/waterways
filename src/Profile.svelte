<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>

<h3>Hi {displayName}!</h3>
<img src={photoURL} width="100" alt="user avatar">
<p>your userID is {uid}</p>