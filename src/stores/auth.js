// import { defineStore } from "pinia";
// import axios from "axios";

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     token: null || localStorage.getItem("token"),
//       didLogOut: false ,
//       error: null,
//   }),

//   mutations: {
//     setAdmin(state, payload) {
//       state.token = payload.tenant_id;
//       state.didLogOut = false;
//     },
//     setError(state, payload) {
//       state.error = payload;
//     },
//   },
//   getters: {
//     isAuthenticated(state) {
//       return state.token !== null;
//     },
//     getErrorMessage(state) {
//       return state.error;
//     },
//   },
//   actions: {
//     async login(data) {
  
//         const response = await axios.post("https://logistics.sandbox.silkysystems.com/api/admin/auth/login", {
//                 login: data.email,
//                 password: data.password,
//             });
//         if (response.data.status === 200 && response.data.message === "success") {
//           let dataResponse = response.data.data;
  
//         //   localStorage.setItem("role1", dataResponse.user.role);
//           localStorage.setItem("lang", dataResponse.local);
  
//           localStorage.setItem("token", dataResponse.token);
//           commit("setAdmin", {
//             idToken: dataResponse.token,
//           });
  
//           commit("setError", null);
//         //   localStorage.setItem("token", response.data.idToken);
//         } else {
//           commit("setError", response.data.message);
//         console.log("setError", response.data.status);
//         }
//       },
//   },
// });

import { defineStore } from "pinia";
import axios from "axios";

 const useAuthStore = defineStore("auth", {

});

const state = function () {
  return {
    token: null || localStorage.getItem("token"),
      didLogOut: false ,
      error: null,
  };
};
const getters = {
    isAuthenticated(state) {
        return state.token !== null;
      },
      getErrorMessage(state) {
        return state.error;
      },
};
const mutations = {
    setAdmin(state, payload) {
        state.token = payload.tenant_id;
        state.didLogOut = false;
      },
      setError(state, payload) {
        state.error = payload;
      },
};
const actions = {
  async login(data) {
    const response = await axios.post(
      "https://logistics.sandbox.silkysystems.com/api/admin/auth/login",
      {
        login: data.email,
        password: data.password,
      }
    );
    if (response.data.status === 200 && response.data.message === "success") {
      let dataResponse = response.data.data;

      //   localStorage.setItem("role1", dataResponse.user.role);
      localStorage.setItem("lang", dataResponse.locale);

      localStorage.setItem("token", dataResponse.token);
      // setAdmin()
      // commit("setAdmin", {
      //   idToken: dataResponse.token,
      // });

      // commit("setError", null);
      //   localStorage.setItem("token", response.data.idToken);
    } else {
      // commit("setError", response.data.message);
      console.log("setError", response.data.status);
    }
  },
};
export default {
  namespaced: true,
  name: "login",
  state,
  getters,
  actions,
  mutations,
};

