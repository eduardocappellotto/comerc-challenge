<template>
    <div class="flex flex-col min-h-screen">
        <CHeader />

        <main class="flex-grow h-full">
            <router-view></router-view>
        </main>

        <CFooter />
    </div>
</template>
  