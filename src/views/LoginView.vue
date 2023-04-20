<template>
  <div class="login">
    <div class="center">
      <h1> Login</h1>
      <form @submit.prevent="onSubmit">
        <div class="err_field" v-show="errMassage">
          <p>{{ errMassage }}</p>
        </div>
        <div class="txt_field">
          <input type="text" v-model="formData.phone" placeholder="" required>
          <label>Phone number</label>
          <span></span>
        </div>
        <div class="txt_field">
          <input type="password" v-model="formData.password" required autocomplete="on">
          <label>Password</label>
          <span></span>
        </div>

        <div class="pass"></div>
        <input type="submit"  value="Login">
        <div class="signup_link">Not a member? <a href="http://192.168.24.29:8081/fitness">Signup</a></div>
      </form>
    </div>
  </div>
  
</template>
<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import instance from '@/services/api';
import { setCookie } from '../utils/cookies'
export default {
  setup() {
    const router = useRouter()
      const formData = reactive({phone:'', password:''});
      const errMassage = ref(null)

    const onSubmit = (e)=>{
      e.preventDefault()
      instance.post('auth/admin', formData).then((res)=>{

        if(res.status == 200){
          setCookie('accessToken', res.data.bearerToken)
          router.push('/')
        }
      }).catch((err)=>{
    
        if(err.response.data.errors.length == 0){
          errMassage.value = err.response.data.massage
        }else{
          errMassage.value = err.response.data.errors[0].msg
        }
      })
    }


    return{
      onSubmit, formData, errMassage
    }
  },
}
</script>
<style lang="scss" scoped>
.login{
  background: linear-gradient(120deg, #2980b9, #8e44ad);
  height: 100vh;
  overflow: hidden;
}
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background: white;
    border-radius: 10px;
  }

  .center h1 {
    margin-top: 20px;
    text-align: center;
    padding: 0 0 20px 0;
    border-bottom: 1px solid silver;
  }

  .center form {
    padding: 0 40px;
    box-sizing: border-box;
  }

  form .txt_field {
    position: relative;
    border-bottom: 2px solid #adadad;
    margin: 30px 0;
  }

  form .err_field p{
    color: #fff;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
    background-color: rgb(231, 139, 139);
    padding: 12px;
  }

  .txt_field input {
    width: 100%;
    padding: 0 5px;
    height: 40px;
    font-size: 16px;
    border: none;
    background: none;
    outline: none;
  }


  .txt_field label {
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: 0.3s;
  }

  .txt_field span::before {
    content: "";
    position: absolute;
    top: 40px;
    left: 0;
    width: 0%;
    height: 2px;
    background: #2691d9;

    transition: 0.3s;
  }

  .txt_field input:focus ~ label,
  .txt_field input:valid ~ label {
    top: -5px;
    color: #2691d9;
  }

  .txt_field input:focus ~ span::before,
  .txt_field input:valid ~ span::before {
    width: 100%;
  }

  .pass {
    margin: -5px 0px 15px 5px;
    color: #a6a6a6;
    cursor: pointer;
  }

  .pass:hover {
    text-decoration: underline;
  }

  input[type="submit"] {
    margin-top: 20px;
    width: 100%;
    height: 50px;
    border: 1px solid;
    background: #2691d9;
    font-size: 18px;
    border-radius: 25px;

    font-weight: 700;
    color: #e9f4fb;
    outline: none;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    border-color: #2691d9;
    transition: 0.5s;
  }
  .signup_link {
    margin: 30px 0;
    text-align: center;
    font-size: 16px;
    color: #666666;
  }

  .signup_link a {
    color: #2691d9;
    text-decoration: none;
  }

  .signup_link a:hover {
    text-decoration: underline;
  }

</style>
