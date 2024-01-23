<script setup>
    import Tr from "@/i18n/translation"
    import LanguageSwitcher from "@/components/LanguageSwitcher.vue"
</script>
<template>
    <LanguageSwitcher></LanguageSwitcher>
    <form class="form" id="kt_login_signin_form" method="POST">
        <div class="container-fluid bg-white p-0 m-0">
            <div class="row h-screen w-100">
                <div class="col d-flex flex-column h-screen">
                    <div class="d-flex justify-content-center h-screen">
                        <div class="w-4/6 d-flex align-items-center h-auto" style="max-width: 380px;">
                            <div class="container-fluid p-0 m-0">
                                <div class="d-flex justify-content-center w-100">
                                    <img src="https://res.cloudinary.com/dlh4c743j/image/upload/v1692623935/Forgot_password-cuate_1_1_1_f0omyp.svg" alt="Logo" class=""/>
                                </div>
                                <div class="form-group mt-3">
                                    <input class="form-control height-42 py-5" type="text" :placeholder="$t('static.email')" name="email" id="email" autofocus autocomplete="off" />
                                </div>

                                <div class="form-group mt-3 text-center">
                                    <button id="kt_login_signin_submit" type="submit" class="btn btn-primary btn-primary-login height-42 btn-block font-weight-bold py-4 mb-3">{{ $t("static.resetbtn") }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mb-5">
                        <router-link :to="Tr.i18nRoute({ name: 'adminLogin' })" class="badge badge-primary text-wrap ml-2">Back to admin login</router-link>
                        <router-link :to="Tr.i18nRoute({ name: 'customerLogin' })" class="badge badge-primary text-wrap ml-2">Back to customer login</router-link>
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