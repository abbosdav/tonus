import instance from "@/services/api"


export const category = {
    state: () => ({
        categories:[]
    }),

    getters:{
        getCategories(state){
            return state.categories
        },
    },

    mutations:{
        setCategories(state, payload){
            state.categories = payload
        },

        setCategory(state, payload){
            state.categories.unshift(payload)
        },

        setEditCategory(state, payload){
            let index = state.categories.findIndex(item => item._id == payload._id)
            if(index != -1){
                state.categories[index] = payload
            }
        },

        setDelCategory(state, payload){
            let index = state.categories.findIndex(item => item._id == payload.id)
            if(index != -1){
                state.categories.splice(index, 1)
            }
        },
    },

    actions: {
        addCategory(context, payload){
            instance.post('categories', payload).then((res)=>{
                context.commit('setCategory', res.data)
            })
        },
        
        allCategories(context){
            instance.get('categories').then(res =>{
                context.commit('setCategories', res.data)
            })
            
        },

        updateCategory(context, payload){
            instance.put('categories/'+payload.id, payload.data).then(res =>{
                context.commit('setEditCategory', res.data)
            })
            
        },

        delCategory(context, payload){
            instance.delete('categories/'+payload).then(res =>{
                context.commit('setDelCategory', res.data)
            }) 
        }
    }
}
