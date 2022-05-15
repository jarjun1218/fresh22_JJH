<template>
    <header class="header bg-gray-300 mb-5 top-0 w-full">
        <div class="inline-block m-3">
            <a href="/">
                <h1 class="text-3xl font-extrabold">JJHsu's Blog</h1>
            </a>
        </div>
        <div class="inline-block bg-gray-300 rounded top-4 right-1">
            <div> 
                <ul>
                    <li class="inline-block mr-5">
                        <a href="/articles/edit_user/<%= req.session.name %>" class="hover:bg-slate-100 text-lg transition-all rounded">ChangePassword</a>
                    </li>
                    <li class="inline-block">
                        <form action="/articles/logout?_method=DELETE" method="post" class="">
                            <button type="submit" class="hover:bg-slate-100 text-lg transition-all rounded">Log Out</button>
                        </form>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li class="inline-block mr-5">
                        <button class="show-modal hover:bg-slate-100 text-lg transition-all rounded">Login</button>
                    </li>
                    <li class="inline-block">
                        <a href="/articles/register" class="hover:bg-slate-100 text-lg transition-all rounded">Register</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Banner'
}
</script>

<style>

</style>