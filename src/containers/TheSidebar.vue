<template>
    <CSidebar
        fixed
        :minimize="minimize"
        :show="show"
        @update:show="
            (value) => $store.commit('dashboard/set', ['sidebarShow', value])
        "
    >
        <CSidebarBrand class="d-md-down-none" to="/">
            <img
                src="@/assets/images/logo.svg"
                alt="PSE"
                height="35"
                class="c-sidebar-brand-full"
            />
            <!-- <img
                src="@/assets/images/logo.svg"
                alt="PSE"
                height="35"
                class="c-sidebar-brand-minimized"
            /> -->
            <p class="c-sidebar-brand-minimized">PSE</p>
        </CSidebarBrand>

        <CRenderFunction flat :content-to-render="$options.nav" />
        <CSidebarMinimizer
            class="d-md-down-none"
            @click.native="
                $store.commit('dashboard/set', ['sidebarMinimize', !minimize])
            "
        />
    </CSidebar>
</template>

<script>
import nav from './_nav';

export default {
    name: 'TheSidebar',
    nav,
    computed: {
        show() {
            return this.$store.state.dashboard.sidebarShow;
        },
        minimize() {
            return this.$store.state.dashboard.sidebarMinimize;
        },
    },
};
</script>
