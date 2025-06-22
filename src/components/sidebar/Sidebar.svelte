<script lang="ts">
  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarDropdownWrapper,
    SidebarButton,
    uiHelpers
  } from "flowbite-svelte";
  import {
    ChartOutline,
    ArrowRightToBracketOutline,
    CogOutline
  } from "flowbite-svelte-icons";
  import { page } from "$app/state";
  import { signOut } from '$lib/auth';
  import { goto } from '$app/navigation';

  type MenuItem = {
    name: string;
    href?: string;
    icon?: any;
    type?: string;
    subItems?: MenuItem[];
  };

  let { children } = $props();
  let activeUrl = $state(page.url.pathname);
  let isDemoOpen = $state(false);
  const demoSidebarUi = uiHelpers();
  const closeDemoSidebar = demoSidebarUi.close;

  $effect(() => {
    isDemoOpen = demoSidebarUi.isOpen;
    activeUrl = page.url.pathname;
  });

  const routes: MenuItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: ChartOutline },
    { name: "Inventario", href: "/dashboard/inventario", icon: ChartOutline },
  ];

  async function handleSignOut() {
    await signOut();
    goto('/');
  }
</script>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2" />

<Sidebar
  {activeUrl}
  backdrop={false}
  isOpen={isDemoOpen}
  closeSidebar={closeDemoSidebar}
  params={{ x: -50, duration: 50 }}
  class="z-50 h-screen"
  divClass="overflow-y-auto h-full flex flex-col justify-between px-3 py-4 bg-gray-50 dark:bg-gray-800"
  position="fixed"
  activeClass="p-2"
  nonActiveClass="p-2"
>
  <SidebarGroup>
    {#each routes as route}
      {#if route.type === "dropdown"}
        <SidebarDropdownWrapper label={route.name}>
          {#if route.subItems}
            {#each route.subItems as subItem}
              <SidebarItem label={subItem.name} href={subItem.href}>
                {#snippet icon()}
                  {#if subItem.icon}
                    <subItem.icon class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  {/if}
                {/snippet}
              </SidebarItem>
            {/each}
          {/if}
        </SidebarDropdownWrapper>
      {:else}
        <SidebarItem label={route.name} href={route.href}>
          {#snippet icon()}
            {#if route.icon}
              <route.icon class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            {/if}
          {/snippet}
        </SidebarItem>
      {/if}
    {/each}
  </SidebarGroup>

  <SidebarGroup border>
    <!-- svelte-ignore event_directive_deprecated -->
    <button type="button" on:click={handleSignOut} style="background:none;border:none;width:100%;text-align:left;padding:0;">
      <SidebarItem label="Salir">
        {#snippet icon()}
          <ArrowRightToBracketOutline class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        {/snippet}
      </SidebarItem>
    </button>
  </SidebarGroup>
</Sidebar>

<div class="h-screen overflow-auto p-4 md:ml-64">
  {@render children()}
</div>
