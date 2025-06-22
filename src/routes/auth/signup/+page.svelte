<script lang="ts">
    import { signUp } from '$lib/auth';
    import { validateEmail } from '$lib/utils';
    let email = '', password = '', error = '';
  
    async function handleLogin() {
      try {
        if (!validateEmail(email)) {
          throw new Error('Invalid email format');
        }
        await signUp(email, password);
        window.location.href = '/dashboard';
      } catch (err: any) {
        error = err.message;
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleLogin}>
    <input placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button>Sign Up</button>
    {#if error}<p>{error}</p>{/if}
  </form>
  