<template>
    <div class="users">
        <toolbar-component/>
        <dialog-component>
            <form action="">
                    <div class="input__row">
                        <label for="ssn">First name</label>
                        <InputText id="ssn" placeholder="Keyword" />
                    </div>
                    <div class="input__row">
                        <label for="ssl">Last name</label>
                        <InputText id="ssl" placeholder="Keyword" />
                    </div>
                    <div class="input__row">
                        <label for="ssm">Phone number</label>
                        <InputText id="ssm" placeholder="Keyword" />
                    </div>
                    <div class="input__row end">
                        <Button label="Submit" severity="primary" />
                    </div>
            </form>
        </dialog-component>

        <table-component :data="users">
            <template #paginatorstart>
                    <Button type="button" icon="pi pi-refresh" text />
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-download" text />
            </template>
            <Column field="username" header="User name" sortable style="width: 25%"></Column>
            <Column field="phone" header="Phone number" sortable style="width: 25%"></Column>
            <Column field="roleUser" header="Role" sortable style="width: 25%"></Column>
            <Column header="Action" field="status" :filterMenuStyle="{ width: '8rem' }" style="width: 5rem">
                <template #body="{ data }">
                    <div class="item-action">
                        <Button @click="delItem(data._id)" icon="pi pi-times" severity="danger" />
                    </div>
                </template>
            </Column>
        </table-component>
    </div>
    
    
</template>
<script setup>
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext'
import DialogComponent from '@/components/DialogComponent.vue';
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import TableComponent from '../components/TableComponent.vue'
import { onMounted, computed } from 'vue';
import { useStore} from "vuex"


const store = useStore()

onMounted(()=>{
    store.dispatch('allUsers')
})

const delItem =(id)=>{

    let text = "Siz bu foydalanuvchini o'chirmoqchimisiz?"
    if (confirm(text) == true) {
        store.dispatch('delUser', id)
  } else {
    text = "You canceled!";
  }
}


const users = computed(()=> store.getters.getUsers)

</script>
<style lang="scss" scoped>
.users{
    padding: 10px;
}
</style>