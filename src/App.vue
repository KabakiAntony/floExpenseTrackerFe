<script>
</script>

<template>
    <header>
        <!-- Logo -->
        <a href="#" class="logo">FloET</a>
        <!-- Hamburger icon -->
        <input class="side-menu" type="checkbox" id="side-menu"/>
        <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>
        <!-- Menu -->
        <nav>
            <ul class="menu">
                <li><a href="#">Username</a></li>
                <li><a href="#">Log Out</a></li>
            </ul>
        </nav>
    </header>
<router-view/>
<footer>
    <p>&copy; FloET 2022&nbsp;&nbsp;<a href="https://twitter.com/kabakiantony">Developed by</a></p>
</footer>
</template>

<style>
@import '@/assets/base.css';
</style>
