<template>
  <section class="section">
    <div class="container">
      <h2 class="title has-text-centered">Register!</h2>

      <Notification v-if="error" :message="error" />

      <form method="post" @submit.prevent="register">

<div class="field">
          <label class="label">Referral Code</label>
          <div class="control">
            <input
              v-model="referralCode"
              type="text"
              class="input"
              name="referralCode"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input
              v-model="firstName"
              type="text"
              class="input"
              name="firstNAme"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input
              v-model="lastName"
              type="text"
              class="input"
              name="lastName"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              v-model="email"
              type="email"
              class="input"
              name="email"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Cell Number</label>
          <div class="control">
            <input
              v-model="phoneNumber"
              type="number"
              class="input"
              name="phoneNumber"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              v-model="password"
              type="password"
              class="input"
              name="password"
              required
            />
          </div>
        </div>
        <div class="control">
          <v-btn
            type="reset"
            elevation="5"
            large
            outlined
            :style="{ color: 'black' }"
            @click.prevent="() => reset()"
            >Cancel</v-btn
          >
          <v-btn
            type="submit"
            elevation="5"
            large
            outlined
            :style="{ color: 'black', backgroundColor: '#47cf73' }"
            >Submit</v-btn
          >
        </div>
      </form>

      <div class="has-text-centered" style="margin-top: 20px">
        Already got an account?
        <nuxt-link :to="{ path: '/user/login' }">Login</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  components: {
    Notification,
  },

  data() {
    return {
      firstName: 'kelum',
      lastName: 'sampath',
      email: 'edirisingheemks@gmail.com',
      phoneNumber: '0775227113',
      password: '1234',
      referralCode:'OVwZbPnz',
      error: null,
    }
  },

  methods: {
    reset() {
      alert('DdS')
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.phoneNumber = ''
      this.password = ''
      this.referralCode=''
    },
    async register() {
      try {
        await this.$axios.post(
          'user/register',
          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            password: this.password,
            referralCode:this.referralCode
          },
          this.$store.getters['index/getHttpHeaderHash']
        )

        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })

        this.$router.push('/')
      } catch (e) {
        alert('error')
        this.error = e.response.data.message
      }
    },
  },
}
</script>