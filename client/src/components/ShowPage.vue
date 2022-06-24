<template>
    <div class="flex flex-col h-screen justify-between">
        <Banner />

        <div v-if="postStatus" class="flex justify-center min-h-screen bg-gray-100">
            <div class="w-1/2 mt-5 mb-5 px-8 py-6 text-left bg-white shadow-lg">
                <div class="mt-5">
                    <h3 class=" text-4xl font-serif font-extrabold text-center">Create Post</h3>
                </div>
                <form @submit.prevent="CreatePost">
                    <div class="mt-5">
                        <label for="title" class="block mb-2 text-lg font-bold font-serif text-gray-900">Title</label>
                        <input required v-model="title" type="text" id="title" class="block w-full p-4 text-gray-900 border-gray-300 rounded-lg bg-gray-100">
                    </div>
                    <div class="mt-5">
                        <label for="innertext" class="block mb-2 text-lg font-bold font-serif text-gray-900">Inner Text</label>
                        <textarea required v-model="innertext" type="text" id="innertext" class="block w-full px-4 pt-5 pb-16 bg-gray-100 border-gray-300 text-gray-900 rounded-lg "/>
                    </div>
                    <div class="flex items-baseline justify-center">
                        <button type="submit" class="px-6 py-2 mt-4 mr-4 text-white bg-gray-600 rounded-lg hover:bg-gray-900">Post</button>
                        <button @click="PostStatus" class="px-6 py-2 mt-4 ml-4 text-white bg-red-400 rounded-lg hover:bg-red-700 border-2 border-gray-200">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="editStatus" class="flex justify-center min-h-screen bg-gray-100">
            <div class="w-1/2 mt-5 mb-5 px-8 py-6 text-left bg-white shadow-lg">
                <div class="mt-5">
                    <h3 class=" text-4xl font-serif font-extrabold text-center">Edit Your Post</h3>
                </div>
                <form @submit.prevent="EditPost">
                    <div class="mt-5">
                        <label for="title" class="block mb-2 text-lg font-bold font-serif text-gray-900">Title</label>
                        <input required v-model="article.title" type="text" id="title" class="block w-full p-4 text-gray-900 border-gray-300 rounded-lg bg-gray-100">
                    </div>
                    <div class="mt-5">
                        <label for="innertext" class="block mb-2 text-lg font-bold font-serif text-gray-900">Inner Text</label>
                        <textarea required v-model="article.innertext" type="text" id="innertext" class="block w-full px-4 pt-5 pb-24 bg-gray-100 border-gray-300 text-gray-900 rounded-lg "/>
                    </div>
                    <div class="flex items-baseline justify-center">
                        <button type="submit" class="px-6 py-2 mt-4 mr-4 text-white bg-gray-600 rounded-lg hover:bg-gray-900">Send</button>
                        <button @click="EditStatus" class="px-6 py-2 mt-4 ml-4 text-white bg-red-400 rounded-lg hover:bg-red-700 border-2 border-gray-200">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="!postStatus && !editStatus" class="bg-white">
            <div class="container px-4 mx-auto">
                <div class="flex flex-wrap -mx-4">
                    <div class="w-full lg:w-1/2 px-4 mb-5 lg:mb-0">
                        <div class="mb-10">
                            <div class="mb-5">
                                <span class="inline-block py-px px-2 mb-4 text-xs leading-5 text-red-500 bg-red-100 font-medium uppercase rounded-9xl">Hot Post</span>
                                <h3 class="mb-5 text-3xl md:text-4xl text-coolGray-900 font-bold tracking-tighter font-serif">{{article.title}}</h3>
                                <div class="flex justify-between">
                                    <p class="text-coolGray-500 font-medium font-mono">{{article.account}} at {{ FormatDate(article.createdDate)}}</p>
                                    <div v-if="isLogined && this.$store.state.loginAccount === article.account" class="">
                                        <button @click="EditMessageStatus" class="ml-2">Edit</button>
                                        <button @click="DeletePost" class="ml-2">Delete</button>
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </div>
                        <div class="">
                            <p class="mb-5 text-lg font-medium leading-7 text-coolGray-500">{{article.innertext}}</p>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2 px-4">
                        <div class="mx-10 my-10">
                            <div class="my-5 w-full">
                                <p class="text-xl font-bold font-serif">Comment</p>
                            </div>

                            <div v-if="!messages.length" class="mb-5">
                                    <p class=" font-medium font-mono">No Comment Here</p>
                            </div>

                            <div v-if="messages.length" v-for="message in messages" v-bind:key="messages._id" class="">
                                <div class="w-full flex flex-col flex-grow flex-shrink mt-5">
                                    <div class="flex bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                                        <img class="flex-none w-8 h-8 mr-4 rounded-full" src="http://i.pravatar.cc/100">
                                        <p class="flex-1 font-bold text-md text-gray-900">{{message.account}}</p>
                                        <p class="text-gray-800 font-serif text-base px-6 mb-5">{{FormatDate(message.date)}}</p>
                                    </div>

                                    <div class="flex-none bg-white rounded-b rounded-t-none overflow-hidden shadow-lg">
                                        <div class="flex items-center justify-between">
                                            <p class="text-gray-800 font-serif text-base px-12 mb-5">{{message.content}}</p>
                                            <div v-if="isLogined && this.$store.state.loginAccount === message.account" class="">
                                                <button @click="EditMessageStatus" class="mr-2 text-sm hover:underline">Edit</button>
                                                <button @click="DeleteMessage(message._id)" class="mr-5 text-sm hover:underline">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="editMessageStatus && this.$store.state.loginAccount === message.account" class="flex justify-end mt-3">
                                    <form @submit.prevent="EditMessage(message._id, message.content)" class="">
                                        <input required v-model="message.content" id="message" rows="5" class="inline-block pr-16 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300" placeholder="" />
                                        <button type="submit" class=" inline-block text-xl font-serif mx-3 rounded hover:bg-gray-200 hover:shadow-md hover:underline">Send</button>
                                    </form>
                                </div>
                            </div>
                            <hr class="mb-5">
                            <div v-if="isLogined">
                                <form @submit.prevent="CreateMessage" class="">
                                    <label for="message" class="block mb-2 text-md font-serif font-bold text-gray-900">Your Comment</label>
                                    <input required v-model="message" id="message" rows="4" class="inline-block p-2.5 pr-16 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300" placeholder="Leave somthing..." />
                                    <button type="submit" class=" inline-block text-xl font-serif mx-3 rounded hover:bg-gray-200 hover:shadow-md hover:underline">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div> 
</template>

<script>
    import axios from 'axios'
    import router from '@/router'
    import moment from 'moment'
    import Banner from './Banner'
    import Footer from './Footer'

    export default {
        name: 'showpage',
        data() {
            return {
                article: [],
                messages: [],
                message: '',
                title:'',
                innertext: '',
                account: '',
                editStatus: false,
                editMessageStatus: false,
            }
        },
        methods: {
            FormatDate(date) {
                if (date) {
                    return moment(String(date)).format('YYYY/MM/DD')
                }
            },
            async CreatePost() {
                const response = await axios.post('/new',{
                    title: this.title,
                    innertext: this.innertext
                })
                if (response.data.message === 'Succese') {
                    this.$store.commit("Post")
                    router.replace(`/articles/more/${response.data.article}`)
                } else {

                }
                
            },
            async EditPost() {
                const response = await axios.put(`/${this.$route.params.id}`, {
                    title: this.article.title,
                    innertext: this.article.innertext
                })
                if (response.data.message === 'Succese') {
                    this.$store.commit("Edit")
                    router.go(0)
                }
            },
            DeletePost() {
                axios.delete(`/${this.$route.params.id}`)
                router.push('/')
            },
            CreateMessage() {
                axios.post(`/new_message/${this.$route.params.id}`, { message: this.message })
                router.go(0)
                //router.replace({ path: `/articles/more/${this.$route.params.id}` })
            },
            EditMessage(id, content) {
                axios.put(`/edit_message/${id}`, { message: content })
                router.go(0)
                //router.replace({ path: `/articles/more/${this.$route.params.id}` })
            },
            DeleteMessage(id) {
                axios.delete(`/delete_message/${id}`)
                router.go(0)
                //router.replace({ path: `/articles/more/${this.$route.params.id}` })
            },
            PostStatus() {
                this.$store.commit("Post")
            },
            EditStatus() {
                this.editStatus = !this.editStatus
            },
            EditMessageStatus() {
                this.editMessageStatus = !this.editMessageStatus
            }
        },
        mounted() {
            axios.get(`/more/${this.$route.params.id}`)
            .then(res => {
                this.article = res.data.article
                this.messages = res.data.messages
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        computed: {
            isLogined() {
                return this.$store.state.isLogined
            },
            postStatus() {
                return this.$store.state.postStatus
            },
        },
        components: {
            'Banner': Banner,
            'Footer': Footer
        }
    }
</script>
