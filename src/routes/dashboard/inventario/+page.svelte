<script lang="ts">
    import { Button, Badge, Modal, Input, Label, Select } from 'flowbite-svelte';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { PenOutline, TrashBinOutline, PlusOutline } from 'flowbite-svelte-icons';

    // Elimina $props y $state, usa variables reactivas estándar de Svelte
    // const data = $props();
    export let data: any;

    // Datos de ejemplo para el inventario
    let items = [
        { id: 1, nombre: 'Laptop HP', categoria: 'Tecnología', cantidad: 15, estado: 'Disponible' },
        { id: 2, nombre: 'Silla de oficina', categoria: 'Mobiliario', cantidad: 25, estado: 'Disponible' },
        { id: 3, nombre: 'Proyector Epson', categoria: 'Tecnología', cantidad: 8, estado: 'En mantenimiento' },
        { id: 4, nombre: 'Escritorio ejecutivo', categoria: 'Mobiliario', cantidad: 12, estado: 'Disponible' },
        { id: 5, nombre: 'Impresora láser', categoria: 'Tecnología', cantidad: 5, estado: 'Agotado' },
    ];

    // Estado del modal
    let showModal = false;
    let editingItem: { id: number; nombre: string; categoria: string; cantidad: number; estado: string } | any = null;
    let isEditing = false;

    // Función para abrir el modal de edición/creación
    function openEditModal(item: Record<string, any> | null = null) {
        isEditing = item !== null;
        editingItem = item && typeof item === 'object'
            ? { ...item }
            : { id: Date.now(), nombre: '', categoria: '', cantidad: 0, estado: 'Disponible' };
        showModal = true;
    }

    // Función para guardar cambios
    function saveItem(e: Event) {
        e.preventDefault();
        if (editingItem) {
            if (isEditing) {
                const index = items.findIndex(i => i.id === editingItem!.id);
                if (index !== -1) {
                    items[index] = { ...editingItem };
                }
            } else {
                items = [...items, { ...editingItem }];
            }
        }
        showModal = false;
    }

    // Función para eliminar un ítem
    function deleteItem(id: number) {
        if (confirm('¿Estás seguro de que deseas eliminar este ítem?')) {
            items = items.filter(item => item.id !== id);
        }
    }

    // Verificar si el usuario es administrador
    $: isAdmin = data?.userData?.[0]?.role === 'admin';
</script>

<section class="p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Gestión de Inventario</h1>
        {#if isAdmin}
            <Button onclick={() => openEditModal()}>
                <PlusOutline class="mr-2 h-4 w-4" />
                Agregar ítem
            </Button>
        {/if}
    </div>

    <div class="overflow-x-auto">
        <Table hoverable>
            <TableHead>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Categoría</TableHeadCell>
                <TableHeadCell>Cantidad</TableHeadCell>
                <TableHeadCell>Estado</TableHeadCell>
                {#if isAdmin}
                    <TableHeadCell>Acciones</TableHeadCell>
                {/if}
            </TableHead>
            <TableBody>
                {#each items as item (item.id)}
                    <TableBodyRow class="hover:bg-gray-50">
                        <TableBodyCell>{item.id}</TableBodyCell>
                        <TableBodyCell class="font-medium text-gray-900">{item.nombre}</TableBodyCell>
                        <TableBodyCell>{item.categoria}</TableBodyCell>
                        <TableBodyCell>{item.cantidad}</TableBodyCell>
                        <TableBodyCell>
                            <Badge color={
                                item.estado === 'Disponible' ? 'green' :
                                item.estado === 'En mantenimiento' ? 'yellow' : 'red'
                            }>
                                {item.estado}
                            </Badge>
                        </TableBodyCell>
                        {#if isAdmin}
                            <TableBodyCell class="flex space-x-2">
                                <Button size="xs" color="blue" onclick={() => openEditModal(item)}>
                                    <PenOutline class="h-3 w-3" />
                                </Button>
                                <Button size="xs" color="red" onclick={() => deleteItem(item.id)}>
                                    <TrashBinOutline class="h-3 w-3" />
                                </Button>
                            </TableBodyCell>
                        {/if}
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>

    <!-- Modal para agregar/editar ítem -->
    <Modal title={isEditing ? 'Editar ítem' : 'Agregar nuevo ítem'} bind:open={showModal} on:close={() => showModal = false}>
        <form on:submit={saveItem} class="space-y-4">
            <div>
                <Label for="nombre" value="Nombre" />
                <Input
                    id="nombre"
                    value={editingItem?.nombre}
                    required
                    placeholder="Ej: Laptop HP"
                />
            </div>
            <div>
                <Label for="categoria" value="Categoría" />
                <Select id="categoria" value={editingItem?.categoria} required>
                    <option value="" disabled selected>Seleccione una categoría</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Mobiliario">Mobiliario</option>
                    <option value="Suministros">Suministros</option>
                    <option value="Oficina">Oficina</option>
                </Select>
            </div>
            <div>
                <Label for="cantidad" value="Cantidad" />
                <Input
                    id="cantidad"
                    type="number"
                    min="0"
                    value={editingItem?.cantidad}
                    required
                />
            </div>
            <div>
                <Label for="estado" value="Estado" />
                <Select id="estado" value={editingItem?.estado} required>
                    <option value="Disponible">Disponible</option>
                    <option value="En mantenimiento">En mantenimiento</option>
                    <option value="Agotado">Agotado</option>
                </Select>
            </div>
            <div class="flex justify-end space-x-3 pt-4">
                <Button color="gray" type="button" onclick={() => showModal = false}>
                    Cancelar
                </Button>
                <Button type="submit" color="blue">
                    {isEditing ? 'Guardar cambios' : 'Agregar'}
                </Button>
            </div>
        </form>
    </Modal>
</section>