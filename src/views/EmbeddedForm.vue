<script setup lang="ts">
import { ref, computed, watch } from "vue";
import PageSpinner from "@/components/loader/PageSpinner.vue";
import ProgressBar from "@/components/embedded_forms/ProgressBar.vue";
import SuccessPage from "@/components/embedded_forms/SuccessPage.vue";
import FormTitle from "@/components/embedded_forms/FormTitle.vue";
import PageSection from "@/components/embedded_forms/PageSection.vue";
import type { ProgressData } from "@/types/EmbeddedForm";
import { useRoute, useRouter } from "vue-router";
import { BASE_URL } from "@/utils/EnvironmentService";
import ExpiredForm from "@/components/embedded_forms/ExpiredForm.vue";

const expired = ref<boolean>(false);
const data = ref<any>({});
const router = useRouter();
const route = useRoute();
const active_page = ref<number>(1);
const form_has_error = ref<boolean>(false);
const is_saving_form = ref<boolean>(false);
const is_page_loaded = ref<boolean>(false);

const progressData = computed((): Array<ProgressData> => {
  if (!data.value.pages || data.value.pages.length < 1) return [] as ProgressData[];

  return data.value.pages.map((page: any, index: number): ProgressData => {
    return {
      name: page.name,
      position: index + 1
    };
  });
});

const currentPageIndex = computed(() => {
  if (active_page.value < 1) return 0;
  return active_page.value - 1;
});

const maxPage = computed(() => {
  return data.value.pages.length;
});

const successPage = computed(() => {
  return maxPage.value + 1;
});

/**
 * Proceed to the next page
 * @return {void}
 */
const nextPage = () => {
  const max_page = maxPage.value;

  const success_page = successPage.value;

  if (active_page.value >= success_page) return;

  if (active_page.value < max_page) {
    // Validate and proceed to next page
    return (validateCurrentPage()) ? active_page.value += 1 : false;
  }

  if (active_page.value === max_page) {
    // Validate page and submit form
    return (validateCurrentPage()) ? submitForm() : false;
    // Then go to success page
  }

  return;

};

/**
 * Back to previous page
 * @return {void}
 */
const prevPage = () => {
  if (active_page.value === 1)
    return;
  return active_page.value -= 1;

};

/**
 * Transform Page fields on page load
 * @param {Array} pages
 * @return {Array} pages 
 */
const transformPageFields = (pages: Array<any>) => {
  return pages.map(page => {
    for (let index = 0; index < page.sections.length; index++) {
      const section = page.sections[index];
      if (page.sections[index].type == 'nested') {
        const key_name = (section.container_name) ? section.container_name : 'nested';

        page.sections[index]['error'] = { [String(key_name)]: '' };
        page.sections[index][String(key_name)] = { ['value']: [] };
      }

      for (let field_index = 0; field_index < page.sections[index].fields
        .length; field_index++) {
        const field = page.sections[index].fields[field_index];
        page.sections[index].fields[field_index]['error'] = "";

        if (['text', 'phone', 'email', 'dropdown'].includes(field.type)) {
          page.sections[index].fields[field_index]['value'] = "";
        } else if (field.type == 'number') {
          page.sections[index].fields[field_index]['value'] = 0;
        } else {
          page.sections[index].fields[field_index]['value'] = "";
        }

      }
    }

    return page;
  });
};

/**
 * Validate the current page/step of the form
 * @returns {Boolean}
 */
const validateCurrentPage = () => {
  const clearErrors = () => {
    data.value.pages[currentPageIndex.value].sections.forEach((section: any) => {
      if (section.type == 'nested') {
        const key_name: string = section.container_name ? section.container_name : 'nested';

        section['error'][String(key_name)] = '';
      }
      section.fields.forEach((field: any) => {
        field.error = "";
      });
    });
  };

  clearErrors();

  let error_count = 0;

  data.value.pages[currentPageIndex.value].sections.forEach((section: any) => {
    if (section.type == 'nested') {
      const key_name: string = section.container_name ? section.container_name : 'nested';

      if (section[String(key_name)].value && section[String(key_name)].value.length < 1) {
        error_count += 1;

        section['error'][String(key_name)] = 'This is required !';
      }

    } else {
      section.fields.forEach((field: any) => {
        if (field.is_active) {
          if (field.type === 'number') {
            if (field.is_required && field.value !== 0 && !field.value) {
              field.error = "This is required !";
              error_count += 1;
            }
          } else if (field.is_required && !field.value) {
            field.error = "This is required !";
            error_count += 1;
          }
        }
      });
    }
  });

  return (error_count === 0) ? true : false;
};


/**
 * Submit Form 
 * @return {void}
 */
const submitForm = () => {

  const uri = `/api/embedded-forms`;

  const form = data.value;

  if (!form) return;

  console.log(form)

  active_page.value = successPage.value;

  // this.is_saving_form = true;

  // const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //         'X-Tenant': `${tenantID}`,
  //         'Content-Type': 'application/json',
  //         'accepts': 'application/json'
  //     },
  //     body: JSON.stringify(form),
  //     redirect: 'follow'
  // };

  // const result = await fetch(uri, requestOptions);

  // this.is_saving_form = false;

  // let response = await result.json();

  // if (result.ok) {
  //     this.resetPage();

  //     alert(`${response.data.name} created successfully`);
  // } else {
  //     alert(`Error saving form`);
  // }
};

/**
 * Fetch Form Data
 * @return {void}
 */
const fetchFormData = async () => {
  /**
   * Redirects to 404
   * @return {void}
   */
  const redirectTo404 = (): void => {
    router.push({ path: "/not-found" });
  };

  is_page_loaded.value = false;

  const { tenant, code } = route.params;

  try {

    const response = await fetch(`${BASE_URL}/embedded-forms/${code}`, {
      headers: {
        Accepts: "application/json",
        'X-Tenant': String(tenant)
      }
    });

    if (response.ok) {

      const result = await response.json();

      if (result.status === 200) {

        if (!Boolean(result.data.is_active)) return expired.value = true;

        data.value = {
          ...result.data,
          pages: transformPageFields(result.data.pages)
        };

        is_page_loaded.value = true;

      } else {
        // Notify if error with the form
        alert('There is an error loading form');
      }

    } else {
      redirectTo404();
    }

  } catch (error: any) {
    redirectTo404();
  }

};

/**
 * Back to services button
 * @return {void}
 */
const backToServices = () => {
  active_page.value = 1;
  form_has_error.value = false;
  is_saving_form.value = false;
};

watch(data, () => {

}, {
  deep: true
});

// Created Hook
const onPageLoad = (): any => {
  fetchFormData();
};

onPageLoad();
</script>

<template>
  <PageSpinner v-if="!is_page_loaded" />
  <div v-else class="p-4 md:p-8 w-screen h-screen overflow-hidden flex justify-center">
    <div class="!h-full !w-full lg:max-w-7xl overflow-auto bg-white shadow-md rounded-lg p-4 flex flex-col">
      <!-- Success Page -->
      <div class="bg-white w-full m-auto" v-if="active_page === successPage">
        <SuccessPage @back-to-service="backToServices" />
      </div>
      <!-- Success Page Ends -->

      <!-- Expired -->
      <ExpiredForm v-else-if="expired" />
      <!-- Expired Form -->

      <!-- Multi Form -->
      <div v-else class="card-body p-8">
        <!-- Form  -->
        <form class="flex flex-col justify-center">
          <FormTitle :data="{
            name: data.name,
            description: data.description
          }" />
          <div class="w-full md:w-[80%] mt-12 mx-auto">
            <ProgressBar :active="active_page" :data="progressData" />
          </div>

          <!-- Form Box Container -->
          <div class="mt-10">
            <PageSection :active-page="active_page" :pages="data.pages" />
          </div>
          <!-- Form Box Container Ends -->
        </form>
        <!-- Form Ends -->

        <div class="flex justify-end mt-8 gap-2">
          <button v-if="active_page > 1" type="button" @click="prevPage"
            class="rounded-lg text-sm py-2 px-4 font-medium  capitalize w-[30%] md:w-[20%]"
            :class="{ 'bg-stone-100 text-carton-200': active_page < maxPage, 'border border-primary text-primary bg-white hover:bg-primary hover:text-white': active_page === maxPage }"
            :disabled="is_saving_form">
            prev</button>
          <button type="button" @click="nextPage"
            class="rounded-lg text-sm py-2 px-4 font-medium text-white capitalize w-[30%] md:w-[20%]"
            :class="{ 'bg-primary': active_page !== maxPage, 'bg-secondary': active_page === maxPage }"
            :disabled="is_saving_form">
            <span v-if="active_page === maxPage">submit</span>
            <span v-else>next</span>
          </button>
        </div>
      </div>
      <!-- Multi Form Ends -->
    </div>
  </div>
</template>
