import instance from "@/services/api"


export const users = {
    state: () => ({
        users:[],
        checked:[]
    }),

    getters:{
        getUsers(state){
            return state.users
        },

        getCheckUsers(state){
            return state.checked
        },
    },

    mutations:{
        setUsers(state, payload){
            state.users = payload
        },
        
        setCheckUsers(state, payload){
            state.checked = payload
        },

        setDelUser(state, payload){
            let index = state.users.findIndex(item => item._id == payload)
            if(index != -1){
                state.users.splice(index, 1)
            }
        },
    },

    actions: {
        allUsers(context){
            instance.get('users').then(res =>{
                context.commit('setUsers', res.data)
            })
            
        },

        checkUsers(context, payload){
                console.log(payload);
            instance.get('check', {params:{date:payload}}).then(res =>{
                context.commit('setCheckUsers', res.data)
            })
            
        },

        delUser(context, payload){
            instance.delete('users/'+payload).then(res =>{
                context.commit('setDelUser', res.data)
            })
        }
    }
}
