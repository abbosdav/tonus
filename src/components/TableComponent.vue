<template>
    <div class="card">
        <DataTable :value="props.data" scrollable :scrollHeight="tableHeight" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}" class="p-datatable">
            <slot/>
        </DataTable>
    </div>
</template>
<script setup>
import DataTable from 'primevue/datatable'
import { ref, defineProps } from 'vue';
const props = defineProps(['data'])

const tableHeight = ref(`${window.innerHeight - 280}px`)
</script>
