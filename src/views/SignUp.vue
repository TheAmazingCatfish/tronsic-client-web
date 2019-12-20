<template>
    <main id="sign_up_view">
        <div id="sign_up_panel">
            <h1>用户注册</h1>
            <form id="sign_up_form">
                <label for="username">用户名</label>
                <input id="username" type="text" required="required" autocomplete="off" />
                <span class="verification-tip"></span><br />
    
                <label for="email">邮箱</label>
                <input id="email" type="email" required="required" autocomplete="off" />
                <span class="verification-tip"></span><br />
    
                <label for="phone">手机号码</label>
                <input id="phone" type="tel" pattern="^1[345789][0-9]{9}$" required="required" autocomplete="off" />
                <span class="verification-tip"></span><br />
    
                <label for="password">密码</label>
                <input id="password" type="text" required="required" autocomplete="off" />
                <span class="verification-tip"></span><br />
    
                <label for="verification_code">验证码</label>
                <input id="verification_code" type="text" required="required" autocomplete="off" style="width: 15rem;" />
                <button id="btn_get_verification_code" type="button" disabled>获取验证码</button>
                <span class="verification-tip"></span><br />
    
                <label></label>
                <input class="submit-button" type="submit" value="提 交" />
            </form>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'SignUp'
    }
</script>

<style>
    #sign_up_view {
        width: 100%;
        height: 54rem;
        background-color: #2B2B2B;
    }
    
    #sign_up_panel {
        position: fixed;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -55%);
    }

    #sign_up_panel h1 {
        padding: .625rem;
        text-align: center;
        color: white;
        text-shadow: 0 0 .3125rem royalblue;
    }

    #sign_up_form {
        width: 38rem;
        border-radius: .25rem;
        box-shadow: 0 0 .3125rem .125rem royalblue;
        padding: 1.25rem 3.5rem;
        background-color: rgba(255, 255, 255, 0.05);
    }

    #sign_up_form input,
    #sign_up_form label {
        color: white;
    }

    #sign_up_form input {
        margin: .25rem 0;
        width: 25rem;
        height: 2.5rem;
        border: solid .0625rem transparent;
        border-bottom-color: grey;
        border-radius: .125rem;
        padding: .75rem;
        background-color: transparent;
    }

    #sign_up_form input:focus {
        border-bottom-color: white;
    }

    #sign_up_form input:valid {
        border-bottom-color: royalblue;
    }

    #sign_up_form label {
        width: 5rem;
        display: inline-block;
    }

    #sign_up_form .submit-button {
        border: none;
        padding: 0;
        background-color: rgba(255, 255, 255, 0.5);
        color: black;
        transition-duration: 0.4s;
    }

    #sign_up_form .submit-button:hover {
        color: white;
    }

    #sign_up_form .verification-tip {
        margin-left: 6rem;
    }

    @keyframes activate {
        0% {
            border-color: royalblue;
        }

        20% {
            border-color: royalblue;
            box-shadow: none;
        }

        100% {
            box-shadow: 0 0 .3125rem .125rem white;
        }
    }

    @keyframes try-to-activate {
        0% {
            border-color: grey;
        }

        19% {
            border-color: grey;
            box-shadow: none;
        }

        20% {
            border-color: white;
            box-shadow: 0 0 .3125rem .125rem red;
        }

        59% {
            border-color: white;
            box-shadow: 0 0 .3125rem .125rem red;
        }

        60% {
            border-color: grey;
        }

        69% {
            border-color: grey;
            box-shadow: none;
        }

        70% {
            border-color: white;
            box-shadow: 0 0 .3125rem .125rem red;
        }

        79% {
            border-color: white;
            box-shadow: 0 0 .3125rem .125rem red;
        }

        80% {
            border-color: grey;
        }

        89% {
            border-color: grey;
            box-shadow: none;
        }

        90% {
            border-color: white;
            box-shadow: 0 0 .3125rem .125rem red;
        }

        99% {
            border-color: white;
            box-shadow: 0 0 .3125rem .125rem red;
        }

        100% {
            border-color: grey;
        }
    }

    #btn_get_verification_code {
        margin-left: .75rem;
        width: 9.25rem;
        height: 2.5rem;
        /* line-height: 18px;
        padding: 9px; */
        border-width: .125rem;
        border-style: solid;
        border-color: royalblue royalblue royalblue transparent;
        border-radius: .125rem;
        background-color: transparent;
        color: white;
        /* font-size: 16px; */
        /* cursor: pointer; */
        transition-duration: 1s;
    }

    #btn_get_verification_code:hover {
        border-color: white;
        box-shadow: 0 0 .3125rem .125rem white;
        background-color: rgba(65, 105, 225, .1);
        animation: activate 1s;
    }

    #btn_get_verification_code[disabled] {
        border-color: grey grey grey transparent;
        color: grey;
        /* cursor: not-allowed; */
    }

    #btn_get_verification_code[disabled]:hover {
        box-shadow: none;
        background-color: transparent;
        animation: try-to-activate 2s;
    }
</style>
