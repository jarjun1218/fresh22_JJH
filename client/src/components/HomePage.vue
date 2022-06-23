<template>
    <Banner />
    
    <div v-if="postStatus" class="flex justify-center min-h-screen bg-gray-100">
        <div class="w-1/2 mt-5 mb-5 px-8 py-6 text-left bg-white shadow-lg">
            <div class="mt-10">
                <h3 class=" text-4xl font-serif font-extrabold text-center">Create Post</h3>
            </div>
            <form @submit.prevent="createPost">
                <div class="mt-10">
                    <label for="title" class="block mb-2 text-lg font-bold font-serif text-gray-900">Title</label>
                    <input required v-model="title" type="text" id="title" class="block w-full p-4 text-gray-900 border-gray-300 rounded-lg bg-gray-100">
                </div>
                <div class="mt-10">
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

    <div v-if="!postStatus" v-for="article in articles" v-bind:key="article._id" class="hover:shadow-xl">
        <div class="flex h-full bg-white rounded overflow-hidden shadow-lg mb-12">
            <router-link :to="`/articles/more/${article._id}`" class="flex w-full flex-wrap no-underline hover:no-underline">
                <div class="w-full md:w-1/3 rounded-t">	
                    <img src="https://source.unsplash.com/collection/494263/800x400" class="h-full w-full shadow">
                </div>

                <div class="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
                    <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                        <div class="w-full font-bold text-xl font-serif text-gray-900 px-6">{{article.title}}</div>
                        <p class="text-gray-800 font-serif text-base px-6 mb-5">{{FormatDate(article.createdDate)}}</p>
                    </div>

                    <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <img class="w-8 h-8 rounded-full mr-4 avatar" src="http://i.pravatar.cc/300" alt="Avatar of Author">
                            <p class="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>

    <Footer />
</template>

<script>
    import axios from 'axios'
    import router from '@/router'
    import moment from 'moment'
    import Banner from './Banner.vue'
    import Footer from './Footer.vue'

    export default {
        name: 'HomePage',
        data() {
            return {
                articles: [],
                title:'',
                innertext: ''
            }
        },
        methods: {
            FormatDate(date){
                if (date) {
                    return moment(String(date)).format('YYYY/MM/DD')
                }
            },
            PostStatus() {
                this.$store.commit("Post")
            },
            async createPost() {
                const response = await axios.post('/new',{
                    title: this.title,
                    innertext: this.innertext
                })
                if (response.data.message === 'Succese') {
                    this.$store.commit("Post")
                    router.push(`/articles/more/${response.data.article}`)
                } else {

                }
            }
        },
        mounted() {
            axios.get('/')
            .then(res => {
                this.articles = res.data;

            })
            .catch(function (error) {
                console.log(error)
            })
        },
        computed: {
            postStatus() {
                return this.$store.state.postStatus
            }
        },
        components:{
            'Banner': Banner,
            'Footer': Footer  
        }
    }
</script>
