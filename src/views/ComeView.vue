<template>
    <div class="comes">
        <Toolbar>
            <template #start>
                <div class="card flex justify-content-center">
                    <Calendar v-model="date" />
                    <Button @click="getData()" icon="pi pi-sync" class="ml-2" />
                </div>
            </template>

            <template #end>
                <Button label="Bce" severity="success" icon="pi pi-search" class="mr-2" />
                <!-- <Button icon="pi pi-times" severity="danger" /> -->
            </template>
        </Toolbar>

        <DataTable :value="users" scrollable :scrollHeight="tableHeight"  dataKey="id" tableStyle="min-width: 50rem">
            <Column field="userId.username" sortable header="Name"></Column>
            <Column field="userId.phone" sortable header="Phone number"></Column>
            <Column header="Date" field="createdAt" :filterMenuStyle="{ width: '14rem' }" sortable style="min-width: 12rem">
                <template #body="{ data }">
                    {{ formatDate(data.createdAt) }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import Calendar from "primevue/calendar"
import Toolbar from 'primevue/toolbar';
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
// import TableComponent from "@/components/TableComponent.vue";
import { ref, computed, onMounted } from "vue";
import { useStore} from "vuex"

const tableHeight = ref(`${window.innerHeight - 200}px`)
const store = useStore()

const formatDate =(date)=>{
    let objectDate = new Date(date);
    let day = objectDate.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = objectDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let year = objectDate.getFullYear();
    let hour = objectDate.getHours();
    if (hour < 10) {
        hour = `0${month}`;
    }

    let minute = objectDate.getMinutes();
    if (minute < 10) {
        minute = `0${month}`;
    }
    let seconds = objectDate.getSeconds();
    if (seconds < 10) {
        seconds = `${month}`;
    }
    

    return hour+':'+minute+':'+seconds+'   '+ day+'/'+month+'/'+year
}


const users = computed(()=> store.getters.getCheckUsers)

const date = ref(new Date());
const getData =()=>{
    let d = new Date(date.value)
    let day = d.getDate()
    d.setDate(day+1)
    store.dispatch('checkUsers', d)
}

onMounted(()=>{
    let d = new Date(date.value)
    store.dispatch('checkUsers', d)
})


</script>
<style lang="scss" scoped>
.comes{
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.ml-2{
    margin-left: 10px;
}
</style>