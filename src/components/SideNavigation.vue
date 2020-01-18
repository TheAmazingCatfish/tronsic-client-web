<template>
    <aside>
        <nav class="sidenav">
            <div class="sidenav-section">
                <router-link class="sidenav-item" to="/">
                    <icon name="home" />首页
                </router-link>
                <a class="sidenav-item" href="">
                    <icon name="whatshot" />热门
                </a>
                <a class="sidenav-item" href="">
                    <icon name="subscriptions" />已订阅
                </a>
            </div>

            <hr class="section-devider" />

            <div class="sidenav-section">
                <a class="sidenav-item" href="">
                    <icon name="folder" />媒体库
                </a>
                <a class="sidenav-item" href="">
                    <icon name="history" />历史记录
                </a>
                <a class="sidenav-item" href="">
                    <icon name="local_offer" />已购买
                </a>
                <a class="sidenav-item" href="">
                    <icon name="favorite" />喜欢的视频
                </a>
            </div>

            <hr class="section-devider" />

            <div class="sidenav-section">
                <a class="sidenav-item" href="">
                    <icon name="settings_applications" />设置
                </a>
                <a class="sidenav-item" href="">
                    <icon name="help" />帮助
                </a>
                <a class="sidenav-item" href="">
                    <icon name="feedback" />反馈
                </a>
            </div>
        </nav>
        <nav class="sidenav simplified active">
            <router-link class="sidenav-item active" to="/" title="首页">
                <icon name="home" />
            </router-link>
            <router-link class="sidenav-item" to="/popular" title="热门">
                <icon name="whatshot" />
            </router-link>
            <router-link class="sidenav-item" to="/subscriptions" title="已订阅">
                <icon name="subscriptions" />
            </router-link>
            <router-link class="sidenav-item" to="/library" title="媒体库">
                <icon name="folder" />
            </router-link>
        </nav>
    </aside>
</template>

<script>
export default {
    name: 'SideNavigation'
}
</script>

<style>
.sidenav {
    position: fixed;
    top: 4rem;
    bottom: 0;
    z-index: 1000;
    width: 15rem;
    background-color: rgba(77, 77, 77, 0.7);
    color: white;
    transform: translateX(-100%);
    transition-duration: 0.5s;
}

.sidenav.simplified {
    top: 8rem;
    bottom: auto;
    width: auto;
}

.sidenav.active {
    transform: none;
}

.sidenav-section {
    width: 100%;
    padding: 0.5rem 0;
}

.sidenav-item {
    display: block;
    padding: 0.4rem 1.5rem;
    color: inherit;
    font-size: 0.875rem;
    text-align: left;
}

.simplified .sidenav-item {
    padding: 1.25rem;
    text-align: center;
}

.sidenav-item:hover {
    background-color: rgba(255, 215, 0, 0.2);
}

.sidenav-item.router-link-exact-active {
    background-color: rgba(65, 105, 225, 0.4);
}

/* 侧导航栏条目下的图标 */
.sidenav-item .icon {
    margin-right: 1.5rem;
}

.simplified .sidenav-item .icon {
    margin-right: 0;
}

.sidenav-item.router-link-exact-active .icon {
    color: gold;
}
</style>
