import instance from "@/services/api"


export const services = {
    state: () => ({
        services:[]
    }),

    getters:{
        getServices(state){
            return state.services
        },
    },

    mutations:{
        setServices(state, payload){
            state.services = payload
        },

        setService(state, payload){
            state.services.unshift(payload)
        },

        setEditService(state, payload){
            let index = state.services.findIndex(item => item._id == payload._id)
            if(index != -1){
                state.services[index] = payload
            }
        },

        setDelService(state, payload){
            let index = state.services.findIndex(item => item._id == payload.id)
            if(index != -1){
                state.services.splice(index, 1)
            }
        },
    },

    actions: {
        create(context, payload){
            instance.post('services', payload).then((res)=>{
                context.commit('setService', res.data)
            })
        },
        
        allServices(context){
            instance.get('services').then(res =>{
                context.commit('setServices', res.data)
            })
            
        },

        update(context, payload){
            console.log(payload);
            
            instance.put('services/'+payload.id, payload.data).then(res =>{
                context.commit('setEditService', res.data)
            })
            
        },

        delServic(context, payload){
            instance.delete('services/'+payload).then(res =>{
                context.commit('setDelService', res.data)
            })
            
        }
    }
}
