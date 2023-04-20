import instance from "@/services/api"


export const eqps = {
    state: () => ({
        eqps:[]
    }),

    getters:{
        getEqps(state){
            return state.eqps
        },
    },

    mutations:{
        setEqps(state, payload){
            state.eqps = payload
        },

        setEqp(state, payload){
            state.eqps.unshift(payload)
        },

        setEditEqp(state, payload){
            let index = state.eqps.findIndex(item => item._id == payload._id)
            if(index != -1){
                state.eqps[index] = payload
            }
        },

        setDelEqp(state, payload){
            let index = state.eqps.findIndex(item => item._id == payload.id)
            if(index != -1){
                state.eqps.splice(index, 1)
            }
        },
    },

    actions: {
        addEqps(context, payload){
            instance.post('equipments', payload).then((res)=>{
                context.commit('setEqp', res.data)
            })
        },
        
        allEqps(context){
            instance.get('equipments').then(res =>{
                context.commit('setEqps', res.data)
            }) 
        },

        updateEqps(context, payload){
            instance.put('equipments/'+payload.id, payload.data).then(res =>{
                context.commit('setEditEqp', res.data)
            }) 
        },

        delEqps(context, payload){
            instance.delete('equipments/'+payload).then(res =>{
                context.commit('setDelEqp', res.data)
            }) 
        }
    }
}
