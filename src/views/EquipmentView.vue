<template>
   <div class="equipment">
        <dialog-component>
            <div class="equipment__upload-block">
                <div class="equipment__upload-btn">
                    <label for="ser_up" class="equipment__fileupicon"><upload-component class="icon"/> {{ filen }}</label>
                    <input class="equipment__fileup" id="ser_up" @change="uploadFile" type="file">
                </div>
            </div>
            <div class="equipment__title">
                <label for="title"></label>
                <input type="text" v-model="formData.title" placeholder="Tonus club" id="title">
            </div>
            <textarea class="equipment__area" name="" v-model="formData.desc" id="" cols="30" rows="10" placeholder="Text kiriting"></textarea>
            <div class="equipment__form-footer">
                <button @click="postData" v-show="!isUpdate" class="equipment__send-btn">Send</button>
                <button @click="putData" v-show="isUpdate" class="equipment__send-btn">Update</button>
            </div>
        </dialog-component>
        
        <toolbar-component @cliked="openModal"/>

        <table-component :data="eqps">
            <Column field="title" header="Title" style="width: 10rem"></Column>
            <Column header="Date" style="width: 10rem">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.createdAt) }}
                </template>
            </Column>
            <Column header="Image" style="width: 10rem">
                <template #body="slotProps">
                    <Image :src="'http://95.130.227.52:3001/'+ slotProps.data.imgUrl" alt="Image" width="120" preview></Image>
                    <!-- <img width="100" :src="'http://localhost:5000/'+ slotProps.data.imgUrl" :alt="slotProps.data.image" class="w-6rem shadow-2 border-round" /> -->
                </template>
            </Column>
            <Column field="desc" header="Description"></Column>
            <Column header="Action" field="status" :filterMenuStyle="{ width: '14rem' }" style="width: 12rem">
                <template #body="{ data }">
                    <div class="item-action">
                        <Button @click="getData(data._id)" icon="pi pi-pencil" severity="success" />
                        <Button @click="delItem(data._id)" icon="pi pi-times" severity="danger" />
                    </div>
                </template>
            </Column>
        </table-component>
    </div>
</template>
<script setup>
import Image from "primevue/image";
import Button from "primevue/button";
import ToolbarComponent from "@/components/ToolbarComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import Column from "primevue/column";
import { onMounted, reactive, ref, computed } from "vue";
import instance from "@/services/api";
import { useStore } from "vuex"
import UploadComponent from "@/components/UploadComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";
const store = useStore()
const filen = ref('Rasm yuklash uchun bosing');
const isUpdate = ref(false)
const selectedFile = ref(null)



const formData = reactive({img:'', desc: ''})

const uploadFile =(event)=>{
    selectedFile.value = event.target.files[0]
    filen.value = selectedFile.value.name
    const fd = new FormData();
    fd.append('image', selectedFile.value, selectedFile.value.name);

    instance.post('upload', fd).then(res =>{
        formData.img = res.data
    })
}

const postData =()=>{
    store.dispatch('setModal', false)
    store.dispatch('addEqps', formData)
                formData.title = ''
                formData.img = ''
                formData.desc= ''
                filen.value = 'Rasm yuklash uchun bosing'
}
const upId = ref(null)
const getData = (id)=>{
    instance.get('equipments/'+id).then(res=>{
        formData.title = res.data.title
        formData.img = res.data.imgUrl
        formData.desc= res.data.desc
        filen.value = res.data.imgUrl
        isUpdate.value = true;
        upId.value = res.data._id
        store.dispatch('setModal', true)
    })
}

const putData = ()=>{
    store.dispatch('setModal', false)
    store.dispatch('updateEqps', {id: upId.value, data: formData})
}

const delItem = (id)=>{
    let text = "Bu ma'lumotni o'chirmoqchimisiz?"
    if (confirm(text) == true) {
       store.dispatch('delEqps', id)
  } else {
    text = "You canceled!";
  }
}

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
    return day+'.'+month+'.'+year
}

const openModal = ()=>{
    formData.title = ''
    formData.img = ''
    formData.desc= ''
    filen.value = 'Rasm yuklash uchun bosing'
    isUpdate.value = false;
    store.dispatch('setModal', true)
}

const eqps = computed(()=> store.getters.getEqps)
onMounted(()=>{
    store.dispatch('allEqps')
})
</script>
<style lang="scss" scoped>
.item-action{
    display: flex;
    gap: 10px;
    align-items: center;
}
.toolbar{
    margin: 10px;
}
.card{
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
}
.p-card{
    margin: 10px;
}
.equipment{
    &__send-btn{
        padding: 10px 30px;
        border-radius: 5px;
        background-color: rgb(19, 192, 19);
        color: #fff;
        font-size: 18px;
        border: unset;
        margin-top: 5px;
        &:hover{
            cursor: pointer;
        }
    }
    &__title{
        display: flex;
        flex-direction: column;
        & input{
            padding: 15px 5px;
            border-radius: 5px;
            border: 1px solid green;
            margin: 10px 0px 20px 0px;
            &:focus{
                outline: none;
            }
        }
        
    }
    &__fileup{
        display: none;
    }
    &__form-footer{
        display: flex;
        justify-content: flex-end;
    }
    &__area{
        width: 100%;
        border-radius: 5px;
        border: 1px solid green;
        padding: 5px;
        outline: none;
        &:focus{
            border: 1px solid rgb(56, 214, 56);
        }
    }
    &__upload-block{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid green;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 10px;
        &:hover{
            color: rgb(26, 201, 64);
            transition: color .5s ease;
        }
    }
    &__fileupicon{
        display: flex;
        align-items: center;
        width: 100%;
        &:hover{
            cursor: pointer;
        }
        
        & .icon{
            font-size: 36px;
            margin-right: 20px;
        }
        
    }
    &__btn{
        position: absolute;
        z-index: 9;
        bottom: 30px;
        right: 8%;
    }
    &__cards{
        overflow: auto;
        height: calc(100vh - 182px);
    }
    
    &__card{
        position: relative;
        margin-bottom: 15px;
    }
    
    &__sub-text{
        margin: 10px 0px;
        & a{
            color: rgb(21, 59, 226);
            &:hover{
                color: rgb(21, 59, 226);
                text-decoration: underline;
            }
        }
    }
}
.card-services{
    &__content{
        display: flex;
        gap: 30px;
        
    }
    &__btns{
        display: flex;
        gap: 20px;
        position: absolute;
        top: 20px;
        right: 20px;

    }
    &__item{
        &.img{
            flex: 0 0 10%;
        }
        &.desc{
            flex: 1 1 auto;
        }
        & img{
            width: 100%;
            height: 100%;
        }
    }
    &__time{
        margin-bottom: 30px;
    }
}

.p-speeddial-button.p-button.p-button-icon-only {
    width: 10px !important; 
    height: 10px; 
}
</style>