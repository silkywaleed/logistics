<script setup>
import Tr from "@/i18n/translation"
import LanguageSwitcher from "@/components/LanguageSwitcher.vue"
import { ref } from "vue";
import store from "@/stores/auth"
// import { useAuthStore } from "../stores/auth";


const data = ref({
  email: "",
  password: "",
});

const commit = {

}

const login = async (data) => {
      try {
        await this.$store.dispatch("login", data);
      } catch (e) {
        console.log(e);
      }
    }

</script>
<template>
    <LanguageSwitcher></LanguageSwitcher>
    <form @submit.prevent="store.actions.login(data)" class="form" id="kt_login_signin_form">
        <div class="container-fluid bg-white p-0 m-0">
            <div class="row h-screen w-100">
                <div class="col bg-blue-100 bg-image d-none d-lg-block">
                    <div class="d-flex justify-content-center h-screen">
                        <div class="w-4/6 flex flex-col justify-center align-items-center">
                                <img style="width: 100%;" src="https://res.cloudinary.com/dlh4c743j/image/upload/v1692533386/admin_login_vdqqcn.svg" alt="">
                                <h2>{{ $t("home.header") }}</h2>
                            </div>
                    </div>
                </div>
                <div class="col d-flex flex-column h-screen">
                    <div class="d-flex justify-content-center h-screen">
                        <div class="w-4/6 d-flex align-items-center h-auto" style="max-width: 380px;">
                            <div class="container-fluid p-0 m-0">
                                    <!-- 
                                        @error('email') is-invalid @enderror  
                                        <span class="invalid-feedback" role="alert">
                                            <strong>dfd</strong>
                                        </span>
                                    -->
                                <div class="d-flex justify-content-center w-100">
                                    <img src="https://res.cloudinary.com/dlh4c743j/image/upload/v1692533967/ss-logo_tpetsd.webp" alt="Logo" class="mb-4"
                                        style="width: 144px;" />
                                </div>
                                <div class="form-group mt-3">
                                    <input class="form-control height-42 py-5" v-model="data.email" type="email" :placeholder="$t('static.email')" name="email" id="email" autofocus autocomplete="off" />
                                </div>

                                <div class="form-group mt-3">
                                    <input class="form-control height-42" v-model="data.password" type="password" :placeholder="$t('static.password')" autocomplete="off" name="password" id="password" />
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
                                    <button type="submit" id="kt_login_signin_submit" class="btn btn-primary btn-primary-login height-42 btn-block font-weight-bold py-4 mb-3">{{ $t("static.signbtn") }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mb-5">
                        <router-link :to="Tr.i18nRoute({ name: 'customerLogin' })" class="badge badge-primary text-wrap">{{ $t("admin.header") }}</router-link>
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