<template>
    <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '40vw' }" @update:visible="handleClose">
        <slot></slot>
    </Dialog>
</template>

<script>
    import Dialog from 'primevue/dialog';
    import { computed } from "vue";
    import { useStore } from 'vuex';

    export default {
        components:{
            Dialog
        },
        setup(){
            const store = useStore()
            const visible = computed(()=> store.getters.getModelState)

            const handleClose = ()=>{
                store.dispatch('setModal', false)
            }

            return{
                visible,
                handleClose
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>