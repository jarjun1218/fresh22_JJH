<template>
    <div class="flex justify-center min-h-screen bg-gray-100">
        <div class="px-8 py-6 mt-10 mb-16 text-left bg-white shadow-lg">
            <h3 class="text-2xl font-bold mt-5 text-center">Create a New Account!</h3>
            <form @submit.prevent="Register">
                <div class="mt-4">
                    <div>
                        <label class="block mt-3" for="name">Name</label>
                        <input required v-model="name" type="text" placeholder="name" class="w-full px-4 py-2 mt-2 border rounded-md">
                    </div>
                    <div>
                        <label class="block mt-3" for="email">Email</label>
                        <input required v-model="email" type="text" placeholder="email" class="w-full px-4 py-2 mt-2 border rounded-md">
                    </div>
                    <div>
                        <label class="block mt-3">Password</label>
                        <input required v-model="password" type="password" placeholder="password" class="w-full px-4 py-2 mt-2 border rounded-md">
                    </div>
                    <div>
                        <label class="block mt-3">Comfirm Password</label>
                        <input required v-model="comfirmPassword" type="password" placeholder="comfirm password" class="w-full px-4 py-2 mt-2 border rounded-md">
                    </div>
                    <div class="flex items-baseline justify-center">
                        <button class="px-6 py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-gray-900">Send</button>
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
        name: 'Register',
        data() {
            return {
                name: '',
                email: '',
                password: '',
                comfirmPassword: ''
            }
        },
        methods: {
            async Register() {
                if (this.password === this.comfirmPassword) {
                    const response = await axios.post('/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    })
                    if (response.data.message === 'Succese') {
                        router.replace('/login')
                    } else {
                        router.replace('/register')
                    }
                }
            }
        }
    }
</script>