import instance from "@/services/api"


export const subcategory = {
    state: () => ({
        subcategories:[]
    }),

    getters:{
        getSubcategories(state){
            return state.subcategories
        },
    },

    mutations:{
        setSubcategories(state, payload){
            state.subcategories = payload
        },

        setSubcategory(state, payload){
            state.subcategories.unshift(payload)
        },

        setEditSubcategory(state, payload){
            let index = state.subcategories.findIndex(item => item._id == payload._id)
            if(index != -1){
                state.subcategories[index] = payload
            }
        },

        setDelSubcategory(state, payload){
            let index = state.subcategories.findIndex(item => item._id == payload.id)
            if(index != -1){
                state.subcategories.splice(index, 1)
            }
        },
    },

    actions: {
        addSubcategory(context, payload){
            instance.post('subcategories', payload).then((res)=>{
                context.commit('setSubcategory', res.data)
            })
        },
        
        allSubcategories(context){
            instance.get('subcategories').then(res =>{
                context.commit('setSubcategories', res.data)
            })
            
        },

        updateSubcategory(context, payload){
            instance.put('subcategories/'+payload.id, payload.data).then(res =>{
                context.commit('setEditSubcategory', res.data)
            })
            
        },

        delSubcategory(context, payload){
            instance.delete('subcategories/'+payload).then(res =>{
                context.commit('setDelSubcategory', res.data)
            }) 
        }
    }
}
