<template>
    <div class="flex flex-col h-screen justify-between">
        <Banner />
        <div class="bg-white">
            <div class="container px-4 mx-auto">
                <div class="flex flex-wrap -mx-4">
                    <div class="w-full lg:w-1/2 px-4 mb-5 lg:mb-0">
                        <span class="inline-block py-px px-2 mb-4 text-xs leading-5 text-red-500 bg-red-100 font-medium uppercase rounded-9xl">Hot Post</span>
                        <h3 class="mb-5 text-3xl md:text-4xl text-coolGray-900 font-bold tracking-tighter font-serif">{{article.title}}</h3>
                        <p class="mb-6 text-base leading-8 text-coolGray-500 font-semibold font-serif">{{article.account}} at {{ FormatDate(article.createdDate)}}</p>
                        <p class="mb-5 text-lg font-medium leading-7 text-coolGray-500">{{article.innertext}}</p>
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
                                <div class="w-full flex flex-col flex-grow flex-shrink">
                                    <div class="flex bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                                        <img class="flex-none w-8 h-8 mr-4 rounded-full" src="http://i.pravatar.cc/100" alt="">
                                        <p class="flex-1 font-bold text-md text-gray-900">{{message.account}}</p>
                                        <p class="text-gray-800 font-serif text-base px-6 mb-5">{{FormatDate(message.date)}}</p>
                                    </div>

                                    <div class="flex-none mb-10 bg-white rounded-b rounded-t-none overflow-hidden shadow-lg">
                                        <div class="flex items-center justify-between">
                                            <p class="text-gray-800 font-serif text-base px-12 mb-5">{{message.content}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="mb-5">
                            <div v-if="isLogined">
                                <form @submit.prevent="CreateMessage" class="">
                                    <label for="message" class="block mb-2 text-md font-serif font-bold text-gray-900">Your Comment</label>
                                    <input required v-model="message" id="message" rows="4" class="inline-block p-2.5 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300" placeholder="Leave somthing..." />
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
                message: ''
            }
        },
        methods: {
            FormatDate(date) {
                if (date) {
                    return moment(String(date)).format('YYYY/MM/DD')
                }
            },
            CreateMessage() {
                axios.post(`/new_message/${this.$route.params.id}`, { message: this.message })
                router.go(0)
                //router.replace({ path: `/articles/more/${this.$route.params.id}` })
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
            }
        },
        components: {
            'Banner': Banner,
            'Footer': Footer
        }
    }
</script>
