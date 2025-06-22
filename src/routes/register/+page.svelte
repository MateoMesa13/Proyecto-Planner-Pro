<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { signUp } from '$lib/auth';
    
    let email = '';
    let password = '';
    let confirmPassword = '';
    let error = '';
    let loading = false;
    let fullName = '';
    let role = '';

    async function handleRegister(event: Event) {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            error = 'Las contraseñas no coinciden';
            return;
        }

        if (password.length < 6) {
            error = 'La contraseña debe tener al menos 6 caracteres';
            return;
        }

        let data;
        try {
            loading = true;
            error = '';
            data = await signUp(email, password, fullName, role as 'ADMIN' | 'USER');
        } catch (signUpError) {
            error = 'Error al registrar. Intenta de nuevo.';
            loading = false;
            return;
        }

        // If email confirmation is enabled, show success message
        if (data?.user?.identities?.length === 0) {
            error = 'Este correo ya está registrado';
            loading = false;
            return;
        }

        // Redirect to login page with success message
        goto('/?registered=true');
    }
</script>

<section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img src="/Logo.png" alt="Planner Pro" class="h-12">  
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Crear una cuenta
                </h1>
                <form class="space-y-4 md:space-y-6" on:submit={handleRegister}>
                    {#if error}
                        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">Error:</span> {error}
                        </div>
                    {/if}
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            bind:value={email}
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="nombre@ejemplo.com" 
                            required
                        >
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            bind:value={password}
                            placeholder="••••••••" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required
                        >
                    </div>
                    <div>
                        <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar contraseña</label>
                        <input 
                            type="password" 
                            name="confirm-password" 
                            id="confirm-password" 
                            bind:value={confirmPassword}
                            placeholder="••••••••" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required
                        >
                    </div>
                    <div>
                        <label for="fullName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre completo</label>
                        <input 
                            type="text" 
                            name="fullName" 
                            id="fullName" 
                            bind:value={fullName}
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Tu nombre completo" 
                            required
                        >
                    </div>
                    <div>
                        <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de usuario</label>
                        <select 
                            name="role" 
                            id="role" 
                            bind:value={role}
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                            <option value="" disabled selected>Selecciona un rol</option>
                            <option value="ADMIN">Administrador</option>
                            <option value="USER">Usuario</option>
                        </select>
                    </div>
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required>
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Acepto los <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">Términos y Condiciones</a></label>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        disabled={loading}
                    >
                        {#if loading}
                            Creando cuenta...
                        {:else}
                            Crear una cuenta
                        {/if}
                    </button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        ¿Ya tienes una cuenta? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Iniciar sesión</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>
