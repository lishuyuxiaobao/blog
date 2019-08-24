new Vue({
    el: "#root",
    data() {
        return {
            showInAddModel: false,
            showInEditModel: false,
            showInDeleteModel: false,
            users: [],
            newUser: {
                username: "",
                email: "",
                mobile: ""
            },
            errorMessage: "",
            successMessage: "",
            user: ""
        }
    },
    mounted() {
        //你看到页面之前  调用的一个生命周期函数
        // alert(1);

        // 请求数据
        this.getAllUsers();

    },
    methods: {
        getAllUsers() {
            // 看接口  network - XHR
            // 400问题 客户端问题 
            // 500问题 服务器问题
            // 200  正常连接
            // 300  重定向 （微信开发应用）
            axios.get("http://localhost/vuephpcrud/api.php?action=read").then(res => {
                // console.log(res)
                this.users = res.data.users;
            }).catch(err => {
                console.log(err)
            })

            //得到数据接口  走then方法
        },
        //存储数据
        saveUser() {
            // console.log(this.newUser);
            const formData = this.toFormData(this.newUser);  //数据转换

            /**
             * @param1:请求接口
             * @param2：数据类型
             */
            axios.post("http://localhost/vuephpcrud/api.php?action=create", formData).then(res => {
                if (res.data.error) {
                    this.errorMessage = res.data.message;
                } else {
                    this.successMessage = res.data.message;
                    this.getAllUsers();
                    this.clearMessage();
                    this.newUser = { username: "", email: "", mobile: "" };
                }
            })

        },
        // 得到数据
        getUser(user) {
            this.user = user;
        },
        //编辑数据
        editUser(user) {
            // console.log(this.newUser);
            const formData = this.toFormData(user);  //数据转换

            /**
             * @param1:请求接口
             * @param2：数据类型
             */
            axios.post("http://localhost/vuephpcrud/api.php?action=update", formData).then(res => {
                if (res.data.error) {
                    this.errorMessage = res.data.message;
                } else {
                    this.successMessage = res.data.message;
                    this.getAllUsers();
                    this.clearMessage();
                }
            })

        },
        //删除数据
        deleteUser(user) {
            // console.log(this.newUser);
            const formData = this.toFormData(user);  //数据转换

            /**
             * @param1:请求接口
             * @param2：数据类型
             */
            axios.post("http://localhost/vuephpcrud/api.php?action=delete", formData).then(res => {
                if (res.data.error) {
                    this.errorMessage = res.data.message;
                } else {
                    this.successMessage = res.data.message;
                    this.getAllUsers();
                    this.clearMessage();
                }
            })

        },
        //将传来的对象转为form-data格式
        toFormData(obj) {
            var form_data = new FormData();
            for (const key in obj) {
                form_data.append(key, obj[key]);
            }
            return form_data;
        },
        clearMessage() {
            setTimeout(() => {
                this.errorMessage = "";
                this.successMessage = "";
            }, 2000)
        }


    },
    computed: {   //计算属性  必须return  需要返回值

    }
})

