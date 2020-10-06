<template>
    <div class="c-app flex-row align-items-center">
        <CContainer>
            <CRow class="justify-content-center">
                <CCol md="5">
                    <CCardGroup>
                        <CCard class="p-4">
                            <CCardBody>
                                <CForm @submit.prevent="login" method="POST">
                                    <h1>Login</h1>
                                    <p class="text-muted">
                                        Sign In to your account
                                    </p>
                                    <div
                                        v-if="showMessage"
                                        class="alert alert-danger alert-dismissible fade show"
                                        role="alert"
                                    >
                                        {{ message }}
                                        <button
                                            class="close"
                                            type="button"
                                            data-dismiss="alert"
                                            aria-label="Close"
                                            @click="dismissError"
                                        >
                                            <span aria-hidden="true"> × </span>
                                        </button>
                                    </div>
                                    <CInput
                                        v-model="form.username"
                                        placeholder="Masukan Email atau Username"
                                        autocomplete="username email"
                                    >
                                        <template #prepend-content
                                            ><CIcon name="cil-user"
                                        /></template>
                                    </CInput>
                                    <CInput
                                        v-model="form.password"
                                        placeholder="Password"
                                        type="password"
                                        autocomplete="curent-password"
                                    >
                                        <template #prepend-content
                                            ><CIcon name="cil-lock-locked"
                                        /></template>
                                    </CInput>
                                    <CRow>
                                        <CCol col="6" class="text-left">
                                            <CButton
                                                type="submit"
                                                color="primary"
                                                class="px-4"
                                            >
                                                Login
                                            </CButton>
                                        </CCol>
                                        <CCol col="6" class="text-right">
                                            <CButton color="link" class="px-0">
                                                Forgot password?
                                            </CButton>
                                            <!-- <CButton color="link" class="d-lg-none">Register now!</CButton> -->
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                        <!-- <CCard
                    color="primary"
                    text-color="white"
                    class="text-center py-5 d-md-down-none"
                    body-wrapper
                    >
                    <CCardBody>
                        <h2>Sign up</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <CButton
                        color="light"
                        variant="outline"
                        size="lg"
                        >
                        Register Now!
                        </CButton>
                    </CCardBody>
                    </CCard> -->
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            showMessage: false,
            message: '',
        };
    },
    methods: {
        // goRegister(){
        //   this.$router.push({ path: 'register' });
        // },
        dismissError() {
            this.showMessage = false;
        },
        login() {
            this.showMessage = false;

            this.$store
                .dispatch('auth/retrieveToken', {
                    username: this.form.username,
                    password: this.form.password,
                })
                .then(() => {
                    this.$router.push('admin/dashboard');
                })
                .catch((error) => {
                    console.log();
                    this.form.password = null;
                    this.showMessage = true;
                    this.message = error.response.data;
                });
        },
    },
};
</script>
