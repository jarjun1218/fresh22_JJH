<template>
    <div class="article m-5 ">
        <div>
            <button class="hover:bg-slate-300 transition-all rounded text-xl text-white show-articleModal">New Article</button>
        </div>
        <div>
            <ul class="mb-5">
                <li v-for="article in articles" :key= "article" class="m-5">
                    <a href="/articles/more/article.id" class="mb-3 text-xl font-bold text-white transition-all rounded hover:bg-slate-300">{{article.title}}</a>
                    <div class="text-xs text-gray-200">
                        {{article.createdDate.toLocaleDateString()}}
                        Created By {{article.account}}  
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data: {
        
    }
}
</script>
