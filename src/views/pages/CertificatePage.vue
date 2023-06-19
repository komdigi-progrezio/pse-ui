<template>
  <center style="margin-top: 40px">
    <div style="width: 500px; border-style: solid; padding: 5px">
      <div>
        <img :src="data.certificate.img_badge" />
      </div>
      <div>
        <p
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nibh
          eu magna pulvinar ornare. Nunc nibh mi, lobortis a iaculis ut, dictum
          quis arcu. Duis velit augue, feugiat id metus pretium, suscipit
          fringilla sem. Integer nec felis in risus rhoncus pulvinar non sit
          amet metus. Proin sed sagittis ipsum. Etiam eu risus ut dui imperdiet
          pellentesque. Donec vestibulum velit sed turpis viverra, quis euismod
          metus dapibus. Nam vulputate nisl blandit, dignissim ante vitae,
          placerat sapien. Suspendisse consequat turpis et dolor elementum, eget
          congue magna aliquam. Nulla a orci id ex scelerisque fringilla.
          Vivamus dapibus vel nunc in mattis. Sed porttitor quam quis sem
          commodo dapibus non vitae neque.</p
        >
        <h5>{{ data.certificate.nama_internal }}</h5>
        <h5>{{ data.certificate.nama_eksternal }}</h5>
        <h5>{{ data.certificate.no_reg }}</h5>
      </div>
      <div>
        <footer> PSE - Kominfo </footer>
      </div>
    </div>
  </center>
</template>
<script>
export default {
  name: 'CertificatePage',
  data() {
    return {
      data: {
        certificate: {
          nama_internal: null,
          nama_eksternal: null,
          no_reg: null,
          img_badge: null,
        },
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get(`systems/${this.$route.params.id}`)
        .then((response) => {
          this.data.certificate.nama_internal = response.data.data.nama_internal
          this.data.certificate.nama_eksternal =
            response.data.data.nama_eksternal
          this.data.certificate.no_reg = response.data.data.no_reg
          this.data.certificate.img_badge = response.data.data.img_badge
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
  },
}
</script>
