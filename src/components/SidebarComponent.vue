<template>
    <div class="sidebar">

        <!-- <Menu :model="items" />
        <Toast /> -->
        <div class="sidebar__menu">
            <ul class="sidebar__menu-list">
                <span class="sidebar__menu-label">Home</span>
                <li class="sidebar__menu-item">
                    <router-link class="sidebar__menu-link" to="/">
                        <i class="pi pi-user" style="font-size: 2rem"></i>
                        <span class="menu-title">О клубе</span>
                    </router-link>
                </li>
                <li class="sidebar__menu-item">
                    <router-link class="sidebar__menu-link" to="/services">
                        <i class="pi pi-directions" style="font-size: 2rem"></i>
                        <span class="menu-title">Наши услуги</span>
                    </router-link>
                </li>
                <li class="sidebar__menu-item">
                    <router-link class="sidebar__menu-link" to="/blogs">
                        <i class="pi pi-qrcode" style="font-size: 2rem"></i>
                        <span class="menu-title">Блоги</span>
                    </router-link>
                </li>
                <li class="sidebar__menu-item">
                    <router-link class="sidebar__menu-link" to="/equipment">
                        <i class="pi pi-users" style="font-size: 2rem"></i>
                        <span class="menu-title">Оборудование</span>
                    </router-link>
                </li>
                <li class="sidebar__menu-item">
                    <router-link class="sidebar__menu-link" to="/users">
                        <i class="pi pi-users" style="font-size: 2rem"></i>
                        <span class="menu-title">Участники</span>
                    </router-link>
                </li>
                <li class="sidebar__menu-item">
                    <router-link class="sidebar__menu-link" to="/comes">
                        <i class="pi pi-users" style="font-size: 2rem"></i>
                        <span class="menu-title">Comes</span>
                    </router-link>
                </li>
            </ul>
            <ul class="sidebar__menu-list">
                <span class="sidebar__menu-label">Magazine</span>
                <li class="sidebar__menu-item">
                    <router-link class="sidebar__menu-link" to="/category">
                        <i class="pi pi-box" style="font-size: 2rem"></i>
                        <span class="menu-title">Котегория</span>
                    </router-link>
                </li>
                <li class="sidebar__menu-item">
                    <router-link class="sidebar__menu-link" to="/subcategory">
                        <i class="pi pi-clone" style="font-size: 2rem"></i>
                        <span class="menu-title">Подкотегория</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
// import { ref } from "vue";
// import Menu from 'primevue/menu'
// import { useToast } from "primevue/usetoast";

// const toast = useToast();
// const items = ref([
//     {
//         label: 'Options',
//         items: [
//             {
//                 label: 'Update',
//                 icon: 'pi pi-refresh',
//                 command: () => {
//                     toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
//                 }
//             },
//             {
//                 label: 'Delete',
//                 icon: 'pi pi-times',
//                 command: () => {
//                     toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
//                 }
//             }
//         ]
//     },
//     {
//         label: 'Navigate',
//         items: [
//             {
//                 label: 'Vue Website',
//                 icon: 'pi pi-external-link',
//                 url: 'https://vuejs.org/'
//             },
//             {
//                 label: 'Router',
//                 icon: 'pi pi-upload',
//                 to: '/fileupload'
//             }
//         ]
//     }
// ]);
</script>
<style lang="scss" scoped>
.sidebar{
    background-color: #fff;
    height: calc(100vh - 75px);
    padding: 20px;
    &__menu{
        margin-top: 20px;
    }
    &__menu-label{
        margin: 10px 0px;
        display: inline-block;
        color: rgb(114, 114, 114);
    }
    &__menu-item{
        & .router-link-active{
            transition: all .5s ease;
            background-color: rgb(27, 187, 27);
            color: #fff;
        }
    }
    &__menu-link{
        font-size: 18px;
        display: flex;
        align-items: center;
        margin: 3px 0px;
        padding: 10px;
        border-radius: 3px;
        transition: all .5s ease;
        &:hover{
            transform:translateX(10px);
            background-color: rgb(27, 187, 27);
            color: #fff;
        }
        & .pi{
            font-size: 18px !important;
            font-weight: 500;
        }
        & .menu-title{
            padding-left: 15px;
            font-size: 18px;
        }
    }
    .p-menu{
        border: none !important;
    }
}

</style>