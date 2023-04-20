<template>
    <div class="category">
        <div class="toolbar">
            <Toolbar>
                <template #start>
                    <Button label="Добавить" @click="openModal" icon="pi pi-plus" class="mr-2" />
                </template>

                <template #end>
                    <!-- <Button icon="pi pi-search" class="mr-2" />
                    <Button icon="pi pi-calendar" severity="success" class="mr-2" />
                    <Button icon="pi pi-times" severity="danger" /> -->
                </template>
            </Toolbar>
        </div>
        <dialog-component>
            <div class="category__form">
                <div class="category__form-item">
                    <label for="title">Mashg'ulot nomi</label>
                    <input type="text" v-model="formData.title" placeholder="Tonus club" id="title">
                </div>
                <div class="category__form-item">
                    <label for="count">Mashg'ulot soni</label>
                    <input type="text" v-model="formData.count" placeholder="Tonus club" id="count">
                </div>
                <div class="category__form-item">
                    <label for="price">Narxi</label>
                    <input type="text" v-model="formData.price" placeholder="Tonus club" id="price">
                </div>
                <div class="category__form-item">
                    <label for="time">Davomiyligi</label>
                    <input type="text" v-model="formData.time" placeholder="Tonus club" id="time">
                </div>
                <div class="category__form-item">
                    <label for="category">Kategoriya</label>
                    <select name="" v-model="formData.category" id="category">
                        <option selected disabled>Choose category</option>
                        <option v-for="cat in categories" :value="cat._id" :key="cat._id">{{ cat.title }}</option>
                    </select>
                </div>
                <div class="category__form-item">
                    <div class="inline-item">
                        <label for="status">Status</label>
                        <input type="checkbox" v-model="formData.status" placeholder="Tonus club" id="status">
                    </div>
                </div>
            </div>
            
            <div class="category__form-footer">
                <button @click="postData" v-show="!isUpdate" class="services__send-btn">Send</button>
                <button @click="putData" v-show="isUpdate" class="services__send-btn">Update</button>
            </div>
        </dialog-component>
    
        <br>
        <DataTable :value="subcategories" scrollable scrollHeight="flex" tableStyle="min-width: 50rem">
            <Column field="title" header="Name" sortable></Column>
            <Column field="count" header="Count" sortable></Column>
            <Column field="price" header="Price" sortable></Column>
            <Column field="time" header="Time" sortable></Column>
            <Column field="catId.title" header="Category" sortable></Column>
            <Column header="Status" field="status" :filterMenuStyle="{ width: '14rem' }" sortable style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)"/>
                </template>
            </Column>
            <Column header="Action" field="status" :filterMenuStyle="{ width: '14rem' }" style="width: 12rem">
                <template #body="{ data }">
                    <div class="item-action">
                        <Button @click="getData(data._id)" icon="pi pi-pencil" severity="success" />
                        <Button @click="delItem(data._id)" icon="pi pi-times" severity="danger" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<script setup>
import instance from '@/services/api';
import Tag from 'primevue/tag'
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DialogComponent from "@/components/DialogComponent.vue";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import { onMounted, reactive, ref, computed } from "vue";
import { useStore } from "vuex"
const store = useStore()

const isUpdate = ref(false)
const openModal = ()=>{
    isUpdate.value = false;
    store.dispatch('setModal', true)
}
const formData = reactive({title: '', status: false})
const upId = ref(null)

const postData =()=>{
    store.dispatch('setModal', false)
    store.dispatch('addSubcategory', formData)
                formData.title = ''
                formData.count = ''
                formData.price = ''
                formData.time = ''
                formData.category = ''
                formData.status = false
                
}

const putData = ()=>{
    store.dispatch('setModal', false);
    store.dispatch('updateSubcategory', {id: upId.value, data: formData})
                formData.title = ''
                formData.count = ''
                formData.price = ''
                formData.time = ''
                formData.category = ''
                formData.status = false
}

const getData = (id)=>{
    instance.get('subcategories/'+id).then(res=>{
        formData.title = res.data.title
        formData.count = res.data.count
        formData.price = res.data.price
        formData.time = res.data.time
        formData.category = res.data.catId
        formData.status = res.data.status
        
        isUpdate.value = true;
        upId.value = res.data._id
        store.dispatch('setModal', true)
    })
}

const delItem = (id)=>{
    let text = "Bu ma'lumotni o'chirmoqchimisiz?"

    if (confirm(text) == true) {
       store.dispatch('delSubcategory', id)
    } else {
        text = "You canceled!";
    }
}

const getSeverity = (data)=>{
    if(data){
        return 'success'
    }else{
        return 'danger'
    }
}
const subcategories = computed(()=> store.getters.getSubcategories)
const categories = computed(()=> store.getters.getCategories)

onMounted(()=>{
    store.dispatch('allSubcategories')
    store.dispatch("allCategories")
})

</script>
<style lang="scss" scoped>
.item-action{
    display: flex;
    gap: 10px;
    align-items: center;
}
.category{
    padding: 10px;
    &__form-item{
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        & input, select{
            padding: 10px;
            border: 1px solid green;
            border-radius: 5px;
            &:focus{
                outline: unset;
            }
        }
        & .inline-item{
            display: flex;
            align-items: center;
            gap: 10px;
            & input{
                font-size: 48px;
                position: relative;
                bottom: -1px;
            }
        }
    }
    &__form-footer{
        display: flex;
        justify-content: flex-end;
        & button{
            padding: 5px 20px;
            border-radius: 5px;
            background: green;
            color: #FFF;
            font-size: 16px;
            border: 1px solid green;
        }
    }
}
</style>