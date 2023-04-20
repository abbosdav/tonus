import instance from "@/services/api"


export const blogs = {
    state: () => ({
        blogs:[]
    }),

    getters:{
        getBlogs(state){
            return state.blogs
        },
    },

    mutations:{
        setBlogs(state, payload){
            state.blogs = payload
        },

        setBlog(state, payload){
            state.blogs.unshift(payload)
        },

        setEditBlog(state, payload){
            let index = state.blogs.findIndex(item => item._id == payload._id)
            if(index != -1){
                state.blogs[index] = payload
            }
        },

        setDelBlog(state, payload){
            let index = state.blogs.findIndex(item => item._id == payload.id)
            if(index != -1){
                state.blogs.splice(index, 1)
            }
        },
    },

    actions: {
        createBlog(context, payload){
            console.log(context,'create');
            instance.post('blogs', payload).then((res)=>{
                context.commit('setBlog', res.data)
            })
        },
        
        allBlogs(context){
            instance.get('blogs').then(res =>{
                context.commit('setBlogs', res.data)
            })
            
        },

        updateBlog(context, payload){
            instance.put('blogs/'+payload.id, payload.data).then(res =>{
                context.commit('setEditBlog', res.data)
            })
            
        },

        delBlog(context, payload){
            instance.delete('blogs/'+payload).then(res =>{
                context.commit('setDelBlog', res.data)
            })
            
        }
    }
}
