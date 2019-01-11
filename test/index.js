window.onload = function () {
    let vue = new myVue({
        el: "#app",
        data: {
            number: 222,
            input: 2
        },
        methods: {
            add: function () {
                this.number++;
            }
        },
        computed: {
            getNumber: function () {
                return this.number + this.input;
            }
        }
    })
    console.log(vue);
}
