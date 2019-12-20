<template>
    <nav class="navbar">
        <div class="navbar-part">
            <button
                class="sidenav-toggle"
                type="button"
                v-on:click="$emit('sidenav-toggle-click')"
            >
                <icon name="menu" />
            </button>
            <router-link class="navbar-item navbar-brand" to="/">
                Tronsic
            </router-link>
        </div>

        <form class="navbar-part">
            <input
                class="navbar-search-input"
                type="search"
                placeholder="Search"
            />
            <button class="navbar-search-button" type="submit">
                <icon name="search" />
            </button>
        </form>

        <div id="navbar_user_entry" class="navbar-part">
            <div
                id="navbar_user_menu"
                class="navbar-part"
                v-if="userIsSignedIn"
            >
                <div class="navbar-item dropdown">
                    <a class="dropdown-toggle" href="">
                        <icon name="video_call" />
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="">
                                <span class="fas fa-file-video"></span> 上传视频
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="">
                                <span class="fas fa-video"></span> 开始直播
                            </a>
                        </li>
                    </ul>
                </div>

                <button class="navbar-item" href="" title="消息通知">
                    <icon name="notifications" />
                </button>

                <div class="navbar-item dropdown">
                    <a id="navbar_user" class="dropdown-toggle" href="">
                        <img
                            class="navbar-user-avatar"
                            src="img/default_avatar.jpg"
                            alt="user-avatar"
                        />
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="">
                                <span class="fas fa-user"></span> 个人信息
                            </a>
                        </li>
                        <li>
                            <hr class="section-devider" />
                            <a class="dropdown-item" href="">
                                <span class="fas fa-sign-out"></span> 退出登录
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="login_register_entrance" class="navbar-part" v-else>
                <button class="navbar-item" type="button">登录</button>
                <router-link class="navbar-item" to="/sign-up">
                    注册
                </router-link>
            </div>

            <a class="navbar-item" href="" title="下载客户端">
                <icon name="get_app" style="fill: gold;" />
            </a>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavigationBar',
    data: function () {
        return {
            userIsSignedIn: false
        };
    }
};
</script>

<style>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding-left: 1rem;
    background-color: rgba(44, 44, 44, 0.7);
}

.navbar-part {
    display: flex;
    align-items: center;
}

.navbar-item {
    display: inline-block;
    margin-right: 1rem;
    min-width: 1.5rem;
    color: white;
    text-align: center;
    white-space: nowrap;
}

.navbar-item.active {
    color: gold;
}

.navbar-brand {
    font-size: 1.25rem;
}

.navbar-search-input {
    width: 25vw;
    min-width: 16rem;
    height: 2.5rem;
    padding: 0.75rem;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    background-color: rgba(255, 255, 255, 0.7);
}

.navbar-search-button {
    margin-right: 1rem;
    width: 4rem;
    height: 2.5rem;
    border: 0.0625rem solid gold;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    background-color: transparent;
    color: gold;
}

.navbar-search-button:hover {
    background-color: gold;
    color: white;
}

.navbar-user-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    vertical-align: middle;
}

.sidenav-toggle {
    margin-right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    border: 0.0625rem solid grey;
    border-radius: 0.25rem;
    background-color: transparent;
    color: gold;
}
</style>
