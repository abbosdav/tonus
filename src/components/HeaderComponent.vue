<template>
    <div class="header">
        <div class="header-topbar__left">
            <h1>TONUS CLUB</h1>
            <!-- <Button class="header-topbar__btn" icon="pi pi-arrow-left" severity="warning" rounded aria-label="Notification" /> -->
        </div>
        <div class="header-topbar__right">
            <div class="header-topbar__actions-left">
                <!-- <ul class="header-topbar__megamenu">
                    <li class="header-topbar__megamenu-item">
                        <MegaMenu :model="items" />
                    </li>
                </ul> -->
            </div>
            <div class="header-topbar__actions-right">
                <ul class="header-topbar__actions-list">
                    <li class="header-topbar__actions-item search">
                        <i class="pi pi-search" style="font-size: 22px"></i>
                    </li>
                    <li class="header-topbar__actions-item notification">
                        <i class="pi pi-bell" style="font-size: 22px"></i>
                    </li>
                    <li class="header-topbar__actions-item menu">
                        <i class="pi pi-table" style="font-size: 22px"></i>
                    </li>
                    <li class="header-topbar__actions-item avatar">
                        <i @click="logout()" class="pi pi-arrow-left" style="font-size: 22px"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
// import MegaMenu from 'primevue/megamenu'
// import Button from 'primevue/button'
// import { ref } from "vue";
import { removeCookie } from '@/utils/cookies';
import { useRouter } from 'vue-router';
const router = useRouter()
const logout =()=>{
    removeCookie('accessToken')
    router.push('/login')
}

// const items = ref([
//     {
//         label: 'Videos',
//         icon: 'pi pi-fw pi-video',
//         items: [
//             [
//                 {
//                     label: 'Video 1',
//                     items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
//                 },
//                 {
//                     label: 'Video 2',
//                     items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
//                 }
//             ],
//             [
//                 {
//                     label: 'Video 3',
//                     items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }]
//                 },
//                 {
//                     label: 'Video 4',
//                     items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }]
//                 }
//             ]
//         ]
//     },
//     {
//         label: 'Users',
//         icon: 'pi pi-fw pi-users',
//         items: [
//             [
//                 {
//                     label: 'User 1',
//                     items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
//                 },
//                 {
//                     label: 'User 2',
//                     items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
//                 }
//             ],
//             [
//                 {
//                     label: 'User 3',
//                     items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
//                 },
//                 {
//                     label: 'User 4',
//                     items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
//                 }
//             ],
//             [
//                 {
//                     label: 'User 5',
//                     items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
//                 },
//                 {
//                     label: 'User 6',
//                     items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
//                 }
//             ]
//         ]
//     }
// ]);
</script>
<style lang="scss">
@import '../styles/components/header.scss';
</style>
