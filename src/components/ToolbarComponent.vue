<template>
    <div class="toolbar">
        <Toolbar>
            <template #start>
                <Button label="Добавить" @click="openModal" icon="pi pi-plus" class="mr-2" />
                <!-- <Button label="Upload" icon="pi pi-upload" severity="success" /> -->
            </template>

            <!-- <template #end>
                <Button icon="pi pi-search" class="mr-2" />
                <Button icon="pi pi-calendar" severity="success" class="mr-2" />
                <Button icon="pi pi-times" severity="danger" />
            </template> -->
        </Toolbar>
    </div>
</template>

<script setup>

import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button'
import { useStore } from 'vuex';
import { defineEmits } from 'vue';

const emit = defineEmits(['cliked'])
const store = useStore()
const openModal = ()=>{
    emit('cliked')
    store.dispatch('setModal', true)
}

</script>
<style lang="scss" scoped>
.toolbar{
    margin-bottom: 10px;
}
</style>
