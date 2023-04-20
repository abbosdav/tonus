<template>
    <div class="about">
        <Card class="about__card card-about">
            <template #title> ТОНУС-КЛУБ </template>
            <template #content>
                <div class="card-about__content">
                    <div class="card-about__item">
                        <img alt="user header" src="https://tonus.ox-sys.com/generate-photo/107" />
                    </div>
                    <div class="card-about__item">
                        <div class="card-about__time">
                            <h4 class="about__sub-title">Время работы <i @click="toEdit" class="pi pi-pencil" style="font-size: 12px; margin-left: 10px;"></i></h4>
                            <p class="about__sub-text" v-if="timeDisplay">с {{ homeData.time.start }} до {{ homeData.time.end }}</p>
                            <div class="about__edit-row" v-if="!timeDisplay">
                                <div>
                                    <label for="c">С</label>
                                    <input @keydown.enter="(e)=>send(e.target.value, 'start')" type="text" @change="(e)=>time.start = e.target.value" id="c">
                                </div>
                                <div>
                                    <label for="do">До</label>
                                    <input @keydown.enter="(e)=>send(e.target.value, 'end')" @change="(e)=>time.end = e.target.value" type="text" id="do">
                                </div>
                            </div>
                        </div>
                        <div class="card-about__address">
                            <h4 class="about__sub-title">Адресс: <i @click="toEditAddress" class="pi pi-plus" style="font-size: 12px; margin-left: 10px;"></i></h4>
                            <div class="about__sub-text">Город Ташкент <br>
                                <div v-for="a in homeData.address" :key="a._id">
                                    <a :href="a.link" target="_blank" rel="noopener noreferrer">{{ a.title }}</a><span @click="delAddress(a._id)"><i class="pi pi-times" style="font-size: 8px"></i></span>
                                </div>
                            </div>
                            <div class="about__edit-row address" v-if="!addressDisplay">
                                <div>
                                    <label for="c">Адресс:</label>
                                    <input placeholder="A.Qodiriy 3a" @keydown.enter="(e)=>sendAddress(e.target.value, 'label')" type="text" @change="(e)=>address.label = e.target.value" id="c">
                                </div>
                                <div>
                                    <label for="f">Link:</label>
                                    <input placeholder="https//:URL" @keydown.enter="(e)=>sendAddress(e.target.value, 'link')" type="text" @change="(e)=>address.link = e.target.value" id="f">
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="card-about__item">
                        <h4 class="about__sub-title">Контактная информация<i @click="addPhone" class="pi pi-plus" style="font-size: 12px; margin-left: 10px;"></i></h4>
                        <div class="about__sub-text">
                            <div v-for="a in homeData.phones" :key="a._id">
                                    <p>{{ a.title }}</p><span @click="delPhone(a._id)"><i class="pi pi-times" style="font-size: 8px"></i></span>
                            </div>
                        </div>
                        <input placeholder="+998 93 542-30-13" v-if="phoneDisplay" @keydown.enter="(e)=>sendPhone(e.target.value)" type="text" @change="(e)=>phone = e.target.value" id="c">
                    </div>
                </div>
                
            </template>
        </Card>
    </div>
</template>

<script setup>

import Card from "primevue/card"
import { onMounted, computed, ref, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore()

const timeDisplay = ref(true);
const toEdit = ()=>{
    timeDisplay.value = false
}


const time = reactive({start:'', end:''})
const send = (value, key)=>{
    time[key]=value
    timeDisplay.value = true
    store.dispatch('remoteTime', time)
}

const address = reactive({label:'',link:''})
const addressDisplay = ref(true)
const toEditAddress = ()=>{
    addressDisplay.value = false
}

const sendAddress = (value,key)=>{
    address[key]=value
    addressDisplay.value = true;
    store.dispatch('addAddress', address)
    
}
const delAddress = (id)=>{
    store.dispatch('removeAddress', id) 
}

const delPhone = (id)=>{
    store.dispatch('removePhone', id) 
}


const phone = ref('')
const phoneDisplay = ref(false)
const addPhone =()=>{
    phoneDisplay.value=true
    
}
const sendPhone=(value)=>{
    phone.value = value
    phoneDisplay.value=false
    store.dispatch('addPhone', value)
}

const homeData = computed(()=> store.getters.getHome)

onMounted(()=>{
    store.dispatch('allData')
})

</script>

<style lang="scss" scoped>
.pi-pencil, .pi-plus{
    
    &:hover{
        cursor: pointer;
    }
}
.about{
    padding: 40px 20px;
    &__card{
        margin-bottom: 10px;
    }
    &__sub-title{
        &:hover{
            .pi-pencil, .pi-plus{
                display: inline-block;
            }
        }
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
        & span{
            margin-left: 15px;
            color: #fff;
            background-color: red;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            &:hover{
                cursor: pointer;
            }
        }
        & div{
            display: flex;
            align-items: center;
            margin-bottom: 2px;
        }
    }
    &__edit-row{
        display: flex;
        gap: 10px;
        margin-top: 10px;
        &.address{
            flex-direction: column;
            & div{
                display: flex;
                flex-direction: column;
            }
            & input{
                width: 300px;
                padding: 5px;
            }
        }
        & input{
            border-radius: 3px;
            border: 1px solid rgb(109, 106, 106);
            width: 40px;
            padding: 2px;
            font-size: 12px;
            margin-left: 2px;
            &:focus{
                outline: none;
            }
        }
    }
}
.card-about{
    &__content{
        display: flex;
        gap: 60px;
        
    }
    &__item{
        flex-basis: 33.333%;
        & img{
            width: 100%;
            height: 100%;
        }
        & input{
            padding: 5px;
            &:focus{
                outline: none;
            }
        }
    }
    &__time{
        margin-bottom: 30px;
    }
}
</style>