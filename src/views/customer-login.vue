<script setup>
import Tr from "@/i18n/translation"
import LanguageSwitcher from "@/components/LanguageSwitcher.vue"
// here we watch and update ref value - Bonus
// import { ref, onMounted } from 'vue'
// let lang = localStorage.getItem('user-locale')
// if(lang){
//             if(lang === 'ar'){
//                 import ("../assets/material-icons.min.css");
//                 console.log(lang)
//             }else{
//                 import("../assets/material-icons.min.css")
//                 console.log(lang)
//             }
//         }
// onMounted(() => {
//     lang
// })
// let lang = localStorage.getItem('user-locale')
        // if(!lang) localStorage.setItem('user-locale',this.$i18n.locale)
        // //section added:
        // if(lang){
        //     if(lang === 'ar'){
        //         import ("../assets/material-icons.min.css");
        //         console.log("arabic")
        //     }else{
        //         import("../assets/material-icons.min.css")
        //         console.log("enn")
        //     }
        // }
</script>
<template>
    <LanguageSwitcher></LanguageSwitcher>
    <form class="form" id="kt_login_signin_form" method="POST">
        <div class="container-fluid bg-white p-0 m-0">
            <div class="row h-screen w-100">
                <div class="col bg-blue-100 bg-image d-none d-lg-block">
                    <div class="d-flex justify-content-center h-screen">
                        <div class="w-4/6 flex flex-col justify-center align-items-center">
                                <img style="width: 100%;" src="https://res.cloudinary.com/dlh4c743j/image/upload/v1692533386/shipper_platform_login_crlhtz.svg" alt="">
                                <h2>{{ $t("home.header") }}</h2>
                            </div>
                    </div>
                </div>
                <div class="col d-flex flex-column h-screen">
                    <div class="d-flex justify-content-center h-screen">
                        <div class="w-4/6 d-flex align-items-center h-auto" style="max-width: 380px;">
                            <div class="container-fluid p-0 m-0">
                                <div class="d-flex justify-content-center w-100">
                                    <img src="https://res.cloudinary.com/dlh4c743j/image/upload/v1692533967/ss-logo_tpetsd.webp" alt="Logo" class="mb-4"
                                        style="width: 144px;" />
                                </div>
                                <div class="form-group mt-3">
                                    <input class="form-control height-42 py-5" type="text" :placeholder="$t('static.email')" name="email" id="email" autofocus autocomplete="off" />
                                </div>

                                <div class="form-group mt-3">
                                    <input class="form-control height-42" type="password" :placeholder="$t('static.password')" autocomplete="off" name="password" id="password" />
                                </div>

                                <div class="form-group flex justify-center">
                                    <div class="checkbox-inline justify-center mr-12">
                                        <label class="checkbox m-0 flex remember_me">
                                            <input type="checkbox" name="remember"/>
                                            <span></span>
                                        </label>
                                        <span>{{ $t("static.remember") }}</span>
                                    </div>
                                    <div class="forgot-password ml-12">
                                        <router-link :to="Tr.i18nRoute({ name: 'forgotPassword' })"
                                            class="text-primary ml-1">
                                            {{ $t("static.forgot") }}
                                        </router-link>
                                    </div>
                                </div>
                                <div class="form-group mt-3 text-center">
                                    <button id="kt_login_signin_submit" type="submit" class="btn btn-primary btn-primary-login height-42 btn-block font-weight-bold py-4 mb-3">{{ $t("static.signbtn") }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mb-5">
                        <router-link :to="Tr.i18nRoute({ name: 'adminLogin' })" class="badge badge-primary text-wrap">{{ $t("customer.header") }}</router-link>
                    </div>
                    <div class="d-flex justify-content-center pb-4">
                        <div class="d-flex align-items-end">
                            <div class="text-center">
                                {{ $t("static.rights") }} <a href="https://silkysys.com" target="_blank"
                                    class="text-primary ml-1">Silky Systems</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<style scoped>
@import "../assets/material-icons.min.css";
@import "../assets/side-menu.css";
@import "../assets/style.bundle.css";

</style>