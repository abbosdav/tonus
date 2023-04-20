<template>
    <div class="blog">
        
        <dialog-component>
            <div class="blog__upload-block">
                <div class="blog__upload-btn">
                    <label for="ser_up" class="blog__fileupicon"><upload-component class="icon"/> {{ filen }}</label>
                    <input class="blog__fileup" id="ser_up" @change="uploadFile" type="file">
                </div>
            </div>
            <div class="blog__title">
                <label for="title"></label>
                <input type="text" v-model="formData.title" placeholder="Tonus club" id="title">
            </div>
            <textarea class="blog__area" name="" v-model="formData.desc" id="" cols="30" rows="10" placeholder="Text kiriting"></textarea>
            <div class="services__form-footer">
                <button @click="postData" v-show="!isUpdate" class="blog__send-btn">Send</button>
                <button @click="putData" v-show="isUpdate" class="blog__send-btn">Update</button>
            </div>
        </dialog-component>
        <toolbar-component @cliked="openModal"/>

        <table-component :data="blogs">
            <Column field="title" header="Title" style="width: 10rem"></Column>
            <Column header="Date" style="width: 10rem">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.createdAt) }}
                </template>
            </Column>
            <Column header="Image" style="width: 10rem">
                <template #body="slotProps">
                    <Image :src="'http://95.130.227.52:3001/'+ slotProps.data.imgUrl" alt="Image" width="120" preview/>
                </template>
            </Column>
            <Column field="desc" header="Description"></Column>
            <Column header="Action" field="status" :filterMenuStyle="{ width: '14rem' }" style="width: 12rem">
                <template #body="{ data }">
                    <div class="item-action">
                        <Button @click="getData(data._id)" icon="pi pi-pencil" severity="success" />
                        <Button @click="del(data._id)" icon="pi pi-times" severity="danger" />
                    </div>
                </template>
            </Column>
        </table-component>
    </div>
</template>
<script setup>
import TableComponent from "@/components/TableComponent.vue";
import ToolbarComponent from "@/components/ToolbarComponent.vue";
// import Card from "primevue/card"
import Image from "primevue/image"
import Column from "primevue/column";
import Button from "primevue/button";
import DialogComponent from "@/components/DialogComponent.vue";
import UploadComponent from "@/components/UploadComponent.vue"
import { useStore } from 'vuex';
import { onMounted, reactive, ref, computed } from "vue";
import instance from "@/services/api";

const store = useStore()
const isUpdate = ref(false);



const del = (id)=>{
    let text = "Bu ma'lumotni o'chirmoqchimisiz?"
    if (confirm(text) == true) {
       store.dispatch('delBlog', id)
  } else {
    text = "You canceled!";
  }
}



const filen = ref('Rasm yuklash uchun bosing');
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


const postData =()=>{
    store.dispatch('setModal', false)
    store.dispatch('createBlog', formData)
                formData.title = ''
                formData.img = ''
                formData.desc= ''
                filen.value = 'Rasm yuklash uchun bosing'
}

const upId = ref(null)

const getData = (id)=>{
    instance.get('blogs/'+id).then(res=>{
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
    store.dispatch('updateBlog', {id: upId.value, data: formData})
}

const openModal = ()=>{
    formData.title = ''
    formData.img = ''
    formData.desc= ''
    filen.value = 'Rasm yuklash uchun bosing'
    isUpdate.value = false;
    store.dispatch('setModal', true)
}

const blogs = computed(()=> store.getters.getBlogs)

onMounted(()=>{
    store.dispatch('allBlogs')
})


</script>

<style lang="scss" scoped>
.toolbar{
    margin-bottom: 10px;
}
.item-action{
    display: flex;
    gap: 10px;
}
.blog{
    padding: 10px;
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
            flex: 0 0 25%;
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
</style> 