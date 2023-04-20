import instance from "@/services/api"


export const home = {
    state: () => ({ 
        time:{start: '8.00', end:'21.00'},
        address:[{_id: '643f94c16ea78b179be0a3bd', title: 'Abdulla qodiriy', __v: 0}],
        phones: ['+998 93 542 30 13']

    }),

    getters:{
        getHome(state){
            // return state.homeData
            return{
                time: state.time,
                address: state.address,
                phones: state.phones
            }

        },
    },

    mutations:{
        setHome(state, payload){
            state.time = payload.time
            state.address = payload.addres
            state.phones = payload.phone
        },

        setTime(state, payload){
            state.time = payload
        },
        setAddress(state, payload){
            state.address = [...state.address, payload]
        },

        setPhone(state, payload){
            state.phones = [...state.phones, payload]
        },

        // setBlog(state, payload){
        //     state.blogs.unshift(payload)
        // },

        // setEditBlog(state, payload){
        //     let index = state.blogs.findIndex(item => item._id == payload._id)
        //     if(index != -1){
        //         state.blogs[index] = payload
        //     }
        // },

        setDelAddress(state, payload){
            let index = state.address.findIndex(item => item._id == payload)
            if(index != -1){
                state.address.splice(index, 1)
            }
        },
        setDelPhone(state, payload){
            let index = state.phones.findIndex(item => item._id == payload)
            if(index != -1){
                state.phones.splice(index, 1)
            }
        },
    },

    actions: {
        allData(context){
            instance.get('home').then(res=>{
                context.commit('setHome', res.data)
                console.log(res.data);
            })
        },

        remoteTime(context, payload){
            instance.post('home/table', payload).then(res=>{
                context.commit('setTime', res.data)
            })
        },

        addAddress(context, payload){
            console.log(payload);
            instance.post('home/addresinfo', {data: payload}).then(res=>{
               context.commit('setAddress', res.data)
            })
        },

        removeAddress(context, payload){
            instance.delete('home/addresinfo/'+payload).then(res=>{
               context.commit('setDelAddress', res.data)
            })
        },


        addPhone(context, payload){
            console.log(payload);
            instance.post('home/phone', {data: payload}).then(res=>{
               context.commit('setPhone', res.data)
            })
        },

        removePhone(context, payload){
            instance.delete('home/phone/'+payload).then(res=>{
               context.commit('setDelPhone', res.data)
            })
        },
            

        // updateBlog(context, payload){
        //     instance.put('blogs/'+payload.id, payload.data).then(res =>{
        //         context.commit('setEditBlog', res.data)
        //     })
            
        // },

        // delBlog(context, payload){
        //     instance.delete('blogs/'+payload).then(res =>{
        //         context.commit('setDelBlog', res.data)
        //     })
            
        // }
    }
}
