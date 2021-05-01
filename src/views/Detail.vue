<template>
    <div>
        {{ code }}
    </div>
</template>

<script>
export default {
    name: 'Detail',
    data() {
        return {
            code: this.$route.params.code
        }
    },
    mounted() {
        this.getInitData(this.code)
    },
    methods: {
        getInitData(code) {
            this.$stock_api.stock_company(code).then((res) => {
                console.log(res)
            })
        }
    }

}
</script>