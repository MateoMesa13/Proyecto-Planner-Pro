<script lang="ts">

	import type { LayoutProps } from './$types';
  import Sidebar from '../../components/sidebar/Sidebar.svelte';
	let { children }: LayoutProps = $props();
</script>
  
<Sidebar {children} />