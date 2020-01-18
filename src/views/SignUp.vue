<template>
    <main id="sign_up_view">
        <div id="sign_up_panel">
            <h1>用户注册</h1>
            <form id="sign_up_form" v-on:submit="signUp">
                <label for="username">用户名</label>
                <input
                    id="username"
                    v-model="username"
                    type="text"
                    pattern="^[\u4e00-\u9fa5\w-]{3,20}$"
                    required="required"
                    title="3-20个字符，支持汉字、数字、英文字母、下划线和减号，不支持纯数字。"
                    v-on:input="validateUsername"
                    v-on:propertychange="validateUsername"
                /><br />
                <span class="tip">{{ usernameValidationTip }}</span><br />
    
                <label for="password">密码</label>
                <input
                    id="password"
                    v-model="password"
                    type="text"
                    pattern="^[\w`~!@#$%^&*()-=+[\]{};:'&quot;\\|,.<>/?]{8,16}$"
                    required="required"
                    title="8-16个字符，可包含数字、英文字母和半角标点符号。"
                    v-on:input="validatePassword"
                    v-on:propertychange="validatePassword"
                /><br />
                <span class="tip">{{ passwordValidationTip }}</span><br />
    
                <!-- <label for="email">邮箱</label>
                <input
                    id="email"
                    v-model="email"
                    type="email"
                    required="required"
                    v-on:input="validateEmail"
                    v-on:propertychange="validateEmail"
                /><br />
                <span class="tip"></span><br /> -->
    
                <label for="phone">手机号</label>
                <input
                    id="phone"
                    v-model="phone"
                    type="tel"
                    pattern="^1[345789][0-9]{9}$"
                    required="required"
                /><br />
                <span class="tip"></span><br />
    
                <label for="verification_code">验证码</label>
                <input
                    id="verification_code"
                    v-model="verificationCode"
                    type="text"
                    required="required"
                    style="width: 15rem;"
                />
                <button
                    id="btn_get_verification_code"
                    type="button"
                    v-bind:disabled="!phone"
                >获取验证码</button><br />
                <span class="tip"></span><br />
    
                <label></label>
                <input class="submit-button" type="submit" value="提 交" />
            </form>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'SignUp',
        data: function () {
            return {
                username: '',
                email: '',
                phone: '',
                password: '',
                verificationCode: '',
                usernameValidationTip: '',
                passwordValidationTip: ''
            };
        },
        methods: {
            validateUsername() {
                if (!this.username) {
                    this.usernameValidationTip = '';
                } else if (!/^[\u4e00-\u9fa5\w-]+$/.test(this.username)) {
                    this.usernameValidationTip = '用户名不支持汉字、数字、英文字母、下划线和减号以外的字符';
                } else if (this.username.length < 3) {
                    this.usernameValidationTip = '';
                } else if (this.username.length > 20) {
                    this.usernameValidationTip = '用户名最多支持20个字符';
                } else {
                    this.$axios({
                        method: 'get',
                        url: 'api/user/get',
                        params: {
                            username: this.username
                        }
                    }).then(response => {
                        if (response.data) {
                            this.usernameValidationTip = '用户名已存在';
                        } else {
                            this.usernameValidationTip = '';
                        }
                    });
                }
            },
            validateEmail() {
                
            },
            validatePassword() {
                if (!this.password) {
                    this.passwordValidationTip = '';
                } else if (!/^[\w`~!@#$%^&*()-=+[\]{};:'";\\|,.<>/?]+$/.test(this.password)) {
                    this.passwordValidationTip = '密码不支持数字、英文字母和半角标点符号以外的字符';
                } else if (this.password.length < 8) {
                    this.passwordValidationTip = '';
                } else if (this.password.length > 16) {
                    this.passwordValidationTip = '密码最多支持16个字符';
                } else {
                    this.passwordValidationTip = '';
                }
            },
            signUp() {
                
            }
        }
    };
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
        width: 37rem;
        border-radius: .25rem;
        box-shadow: 0 0 .3125rem .125rem royalblue;
        padding: 1.75rem 3.5rem;
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
        
        /* 消除在 Chrome 下 input 获取焦点时的样式 */
        outline: none;
    }

    #sign_up_form input:valid {
        border-bottom-color: royalblue;
    }
    
    #sign_up_form input:invalid {
        /* 消除在 Firefox 下 input 值不合法时的样式 */
        box-shadow: none;
    }

    #sign_up_form label {
        width: 4rem;
    }

    #sign_up_form .submit-button {
        border: none;
        padding: 0;
        background-color: rgba(255, 255, 255, 0.5);
        color: black;
        transition-property: background-color, color;
        transition-duration: 0.4s;
    }

    #sign_up_form .submit-button:hover {
        background-color: rgba(65, 105, 225, 0.5);
        color: white;
    }

    #sign_up_form .tip {
        margin-left: 6rem;
        font-size: .75rem;
        color: gold;
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
        border-width: .125rem;
        border-style: solid;
        border-color: royalblue royalblue royalblue transparent;
        border-radius: .125rem;
        background-color: transparent;
        color: white;
        transition-property: border-color, box-shadow, background-color; 
        transition-duration: 1s;
    }

    #btn_get_verification_code:not([disabled]):hover {
        border-color: white;
        box-shadow: 0 0 .3125rem .125rem white;
        background-color: rgba(65, 105, 225, .1);
        animation: activate 1s;
    }

    #btn_get_verification_code[disabled] {
        border-color: grey grey grey transparent;
        color: grey;
    }

    #btn_get_verification_code[disabled]:hover {
        /* box-shadow: none;
        background-color: transparent; */
        animation: try-to-activate 2s;
    }
</style>
