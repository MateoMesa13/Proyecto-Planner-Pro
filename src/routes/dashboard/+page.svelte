<script lang="ts">
    export let data;
    console.log(data);
</script>

<section class="text-black max-w-auto p-4">
  <h1 class="text-2xl font-bold mb-4">
    Welcome to your dashboard
    {#if data.userData && data.userData.length > 0}
      {data.userData[0].full_name}
    {/if}
  </h1>
  <p class="mb-4">
    Hiciste login con el mail:
    {#if data.userData && data.userData.length > 0}
      {data.userData[0].email}
    {/if}
  </p>
  <p class="w-full break-words bg-gray-100 p-3 rounded mt-4">Token de tu sesión: <span class="font-mono break-all">{data.accessToken}</span></p>
</section>

