<template>
    <div class="flex justify-center min-h-screen bg-gray-100">
        <div class="mt-16 h-1/2 px-8 py-6 text-left bg-white shadow-lg">
            <h3 class="text-2xl font-bold text-center">Login to your account</h3>
            <form @submit.prevent="Login">
                <div class="mt-4">
                    <div>
                        <label class="block" for="email">Email</label>
                        <input v-model.trim="email" type="text" placeholder="Email" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    </div>
                    <div class="mt-4">
                        <label class="block">Password</label>
                        <input v-model="password" type="password" placeholder="Password" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    </div>
                    <div class="flex items-baseline justify-between">
                        <button type="submit" class="px-6 py-2 mt-4 mr-5 text-white bg-gray-600 rounded-lg hover:bg-gray-900">Login</button>
                        <router-link to="/register" class="text-xs ml-5 text-gray-600 hover:underline ">Don't have an account?</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from '@/router'

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async Login() {
                const response = await axios.post('/login', {
                    email: this.email,
                    password: this.password,
                })
                if (response.data.message === "Succese") {
                    // this.$store.state.isLogined = true
                    // this.$store.state.loginAccount = response.data.name 
                    this.$store.commit("Logined")
                    router.replace('/')
                } else {
                    router.replace('/login')
                }
            }
        }
    }
</script>