<template>

    <div class="main-wrapper">

        <!--布局-->
        <el-container>
             <!--左导航-->
            <el-aside width="200px">
                <!--Logo部分-->
                <div class="aside-logo-wrapper">
                    <!--@标识src下-->
                    <img src="../../assets/yashe.jpg" alt="">
                    <span>BRSblackshoot</span>
                </div>
                <!--导航菜单-->
                <el-scrollbar>
                    <el-menu
                            active-text-color="#F56C6C"
                            text-color="#606266"
                            router
                            default-active="1">
                    <!--router  路由-->

                        <!--自定义组件 读取mysql中的菜单栏信息 for循环渲染出来 不过我的个人项目没有在mysql设置相关的库 所以这个功能我就不用了-->
                        <!--<customitem v-for="(item,index) in menuList" :key="index" :item="item">-->

                        <!--</customitem>-->


                        <!--&lt;!&ndash;导航头&ndash;&gt;-->
                        <!--点击对应菜单时 就等于在地址栏追加index的值 然后令el-main中的<router-view/>动态渲染 index的值对应的网站在routes中配置-->
                        <el-menu-item index="/welcome">
                            <i class="el-icon-s-home"></i>
                            <span slot="title">welcome</span>
                        </el-menu-item>

                        <el-menu-item index="/">
                            <i class="el-icon-menu"></i>
                            <span slot="title">明日方舟虚拟肉鸽</span>
                        </el-menu-item>

                        <!--&lt;!&ndash;商品相关&ndash;&gt;-->
                        <!--<el-submenu index="2">-->
                            <!--<template slot="title">-->
                                <!--<i class="el-icon-location"></i>-->
                                <!--<span>商品相关</span>-->
                            <!--</template>-->
                            <!--<el-menu-item index="/brand">-->
                                <!--<i class="el-icon-menu"></i>-->
                                <!--<span slot="title">品牌管理</span>-->
                            <!--</el-menu-item>-->
                            <!--<el-menu-item index="/category">-->
                                <!--<i class="el-icon-menu"></i>-->
                                <!--<span slot="title">分类管理</span>-->
                            <!--</el-menu-item>-->

                            <!--<el-menu-item index="/good">-->
                                <!--<i class="el-icon-menu"></i>-->
                                <!--<span slot="title">商品管理</span>-->
                            <!--</el-menu-item>-->
                        <!--</el-submenu>-->

                        <!--&lt;!&ndash;员工相关&ndash;&gt;-->
                        <!--<el-submenu index="3">-->
                            <!--<template slot="title">-->
                                <!--<i class="el-icon-location"></i>-->
                                <!--<span>员工相关</span>-->
                            <!--</template>-->
                            <!--<el-menu-item index="/dept">-->
                                <!--<i class="el-icon-menu"></i>-->
                                <!--<span slot="title">部门管理</span>-->
                            <!--</el-menu-item>-->
                            <!--<el-menu-item index="/admin">-->
                                <!--<i class="el-icon-menu"></i>-->
                                <!--<span slot="title">员工管理</span>-->
                            <!--</el-menu-item>-->
                        <!--</el-submenu>-->

                        <!--&lt;!&ndash;系统管理&ndash;&gt;-->
                        <!--<el-submenu index="4">-->
                            <!--<template slot="title">-->
                                <!--<i class="el-icon-location"></i>-->
                                <!--<span>系统管理</span>-->
                            <!--</template>-->
                            <!--<el-menu-item index="/role">-->
                                <!--<i class="el-icon-menu"></i>-->
                                <!--<span slot="title">角色管理</span>-->
                            <!--</el-menu-item>-->
                            <!--<el-menu-item index="/menu">-->
                                <!--<i class="el-icon-menu"></i>-->
                                <!--<span slot="title">权限管理</span>-->
                            <!--</el-menu-item>-->

                            <!--&lt;!&ndash;日志相关&ndash;&gt;-->
                            <!--<el-submenu index="5">-->
                                <!--<template slot="title">-->
                                    <!--<i class="el-icon-location"></i>-->
                                    <!--<span>日志相关</span>-->
                                <!--</template>-->
                                <!--<el-menu-item index="5-1">-->
                                    <!--<i class="el-icon-menu"></i>-->
                                    <!--<span slot="title">登录日志</span>-->
                                <!--</el-menu-item>-->
                                <!--<el-menu-item index="5-2">-->
                                    <!--<i class="el-icon-menu"></i>-->
                                    <!--<span slot="title">操作日志</span>-->
                                <!--</el-menu-item>-->
                            <!--</el-submenu>-->

                            <!--</el-submenu>-->

                    </el-menu>
                </el-scrollbar>

            </el-aside>
            <!--右导航-->
            <el-container>
                <!--右导航头-->
                <el-header></el-header>
                <!--右主题内容-->
                <el-main>

                    <!--动态渲染-->
                    <div class="main-box">

                        <router-view/>
                    </div>

                </el-main>
            </el-container>
        </el-container>

    </div>

</template>

<script>
    import  mains from "./index.js"
    export default mains


</script>

<style scoped lang="scss">
    .main-wrapper {
        height: 100%;
    }

    .el-header {
        background-color: #8cb1d6;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #fff;
        color: #333;


    .aside-logo-wrapper {
        text-align: center;
        background-color: #8cb1d6;
        height: 60px;
        line-height: 60px;

    img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 8px;
    }

    span {
        font-weight: 500;
        color: #fff;
        font-family: "黑体";
    }


    }


    }

    .el-scrollbar {
        height: calc(100% - 60px);
    }

    .el-main {
        background-color: #E9EEF3;
        color: #606266;
        padding: 6px 0 0 6px;

    .main-box {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 15px 0px 0px 15px;
        box-sizing: border-box;
    }


    }

    .el-container {
        height: 100%;
    }


</style>