<template>
    <div class="text-center absolute top-3 right-1/4 sm:right-4 z-10">
    <div class="relative inline-flex self-center">
        <svg class="text-white bg-primary absolute top-0 right-0 m-2 pointer-events-none p-2 rounded" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 38 22" version="1.1">
            <title>F09B337F-81F6-41AC-8924-EC55BA135736</title>
            <g id="ZahnhelferDE—Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="ZahnhelferDE–Icon&amp;Asset-Download" transform="translate(-539.000000, -199.000000)" fill="#ffffff" fill-rule="nonzero">
                    <g id="Icon-/-ArrowRight-Copy-2" transform="translate(538.000000, 183.521208)">
                        <polygon id="Path-Copy" transform="translate(20.000000, 18.384776) rotate(135.000000) translate(-20.000000, -18.384776) " points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631"/>
                    </g>
                </g>
            </g>
        </svg>
        <select @change="switchLanguage" class="text-2xl font-bold rounded border-2 border-primary text-gray-600 h-14 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
            <option
                v-for="sLocale in supportedLocales"
                :key="`locale-${sLocale}`"
                :value="sLocale"
                :selected="locale === sLocale"
            >
                {{ t(`locale.${sLocale}`) }}
            </option>
    </select>
    </div>
</div>
  </template>
  
  <script setup>
    import { useI18n } from 'vue-i18n'
    import { useRouter } from "vue-router"
    import Tr from "@/i18n/translation"
    import { ref, onMounted } from 'vue'
  
        const { t, locale } = useI18n()
  
        const supportedLocales = Tr.supportedLocales
  
        const router = useRouter()
        
        let lang = localStorage.getItem('user-locale')
        import (`../assets/${lang}.css`);

        const switchLanguage = async (event) => {
          const newLocale = event.target.value
          await Tr.switchLanguage(newLocale)
          if(newLocale === 'ar'){
                document.getElementsByTagName('Body')[0].style.direction = "rtl"
                console.log(newLocale)
            }else{
                document.getElementsByTagName('Body')[0].style.direction = "ltr"
                console.log(newLocale)
            }
          try {
            await router.replace({ params: { locale: newLocale } })
          } catch(e) {
            console.log(e)
            router.push("/")
          }
        }
        
  </script>