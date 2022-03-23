<template>
    <div id="roll-wrapper" class="mc-root" style="top: 0px; padding: 10px 10px 0px; margin-top: 10px; margin-left: 10px; margin-right: 10px;">
        <!--roll关卡-->
        <el-row class="mc-ui-flex-center" style="margin-top: 5px; top: 0px; padding-top: 10px;" align="middle" justify="center">
            <el-col :xs="6" :sm="12" :span="6" :md="4">
                <el-button class="mc-ui-flex-start" size="medium" type="primary" icon="el-icon-refresh" @click="onCheckPoint">roll关卡</el-button>
            </el-col>
            <el-col class="mc-ui-flex-end" style="top: 0px; padding-top: 0px; text-align: center;" :xs="18" :sm="12" :span="18" :md="20">{{checkpoint}}</el-col>
        </el-row>

        <el-divider></el-divider>

        <!--优势列表-->
        <el-row>
            <el-col :xs="24">
                <el-row style="bottom: 0px;">
                    <el-col  class="mc-ui-flex-start" :xs="6" :sm="12" :span="6" :md="4">
                        <el-button class="mc-ui-flex-center" size="medium" type="primary" icon="el-icon-refresh" @click="onSuper">roll优势列表</el-button>
                    </el-col>
                    <el-col  style="padding-top: 5px;" :span="24" :xs="24">优势列表，三选二</el-col>
                </el-row>
            </el-col>
            <el-col style="left: 0px; top: 0px; padding-top: 10px;" :xs="24">
                <el-table
                        :data="goodlist1"
                        border
                        empty-text="点击按钮roll数据"
                        ref="multiple"
                        @selection-change="selectRowInSuper"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="40">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="描述">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!--隐藏区域 获取额外两项优势-->
        <div v-show=rollgood1>
            <el-row>
                <el-col :xs="24">
                    <el-row style="margin-top: 5px; top: 0px; padding-top: 10px;">
                        <el-col  class="mc-ui-flex-start" :xs="6" :sm="12" :span="6" :md="4">
                            <el-button class="mc-ui-flex-center" size="medium" type="primary" icon="el-icon-refresh" @click="onSuperAgain">roll两项额外的优势</el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col style="left: 0px; top: 0px; padding-top: 10px;" :xs="24">
                    <el-table
                            :data="goodlist2"
                            border
                            empty-text="点击按钮roll数据"
                            style="width: 100%">
                        <el-table-column
                                prop="title"
                                label="名称"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="content"
                                label="描述">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>

        <el-divider></el-divider>

        <!--劣势列表-->
        <el-row>
            <el-col :xs="24">
                <el-row>
                    <el-col class="mc-ui-flex-start" :xs="6" :sm="12" :span="6" :md="4">
                        <el-button class="mc-ui-flex-center" type="primary" size="medium" icon="el-icon-refresh" @click="onDis">roll劣势列表</el-button>
                    </el-col>
                    <el-col  style="padding-top: 5px;" :span="24" :xl="24">劣势列表，三选二</el-col>
                </el-row>
            </el-col>
            <el-col style="padding-top: 10px;" :xs="24">
                <el-col style="padding-top: 10px;" :xs="24">
                    <el-table
                            :data="badlist1"
                            border
                            ref="multipleTable"
                            @selection-change="selectRowInDis"
                            empty-text="点击按钮roll数据"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="40">
                        </el-table-column>
                        <el-table-column
                                prop="title"
                                label="名称"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="content"
                                label="描述">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-col>
        </el-row>
        <!--隐藏区域 roll第二个关卡-->
        <div v-show=rollbad1>
            <el-row class="mc-ui-flex-center" style="margin-top: 5px; top: 0px; padding-top: 10px;" align="middle" justify="center">
                <el-col :xs="6" :sm="12" :span="6" :md="4">
                    <el-button class="mc-ui-flex-start" size="medium" type="primary" icon="el-icon-refresh" @click="onCheckPointAgain">roll第二个关卡</el-button>
                </el-col>
                <el-col class="mc-ui-flex-end" style="top: 0px; padding-top: 0px; text-align: center;" :xs="18" :sm="12" :span="18" :md="20">{{checkpointAgain}}</el-col>
            </el-row>
        </div>
        <!--隐藏区域 获取额外两项劣势-->
        <div v-show="rollbad2">
            <el-row style="margin-top: 5px; top: 0px; padding-top: 10px;">
                <el-col :xs="24">
                    <el-row>
                        <el-col class="mc-ui-flex-start" :xs="6" :sm="12" :span="6" :md="4">
                            <el-button class="mc-ui-flex-center" type="primary" size="medium" icon="el-icon-refresh" @click="onDisAgain">roll额外两项劣势</el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col style="padding-top: 10px;" :xs="24">
                    <el-col style="padding-top: 10px;" :xs="24">
                        <el-table
                                :data="badlist2"
                                border
                                empty-text="点击按钮roll数据"
                                style="width: 100%">
                            <el-table-column
                                    prop="title"
                                    label="名称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="content"
                                    label="描述">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-col>
            </el-row>
        </div>

        <el-divider></el-divider>

        <!--招募需求-->
        <b>招募需求</b><br/>
        <b>默认持有 20 点数，至多招募 10 名干员</b>
        <ul>
            <li>六星干员………………4 点</li>
            <li>五星干员………………2 点</li>
            <li>四星干员………………1 点</li>
            <li>其他干员………………0 点</li>
        </ul>
        &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox"  v-model="select.dis" @click="oncheck1"/>&nbsp;&nbsp;自定义去除一项劣势效果……6 点<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox"  v-model="select.super" @click="oncheck2"/>&nbsp;&nbsp;购买一枚优势骰………8 点(最多购入一枚)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;优势与劣势效果冲突时，优势效果优先
        <!--隐藏区域 获取额外一项优势-->
        <div v-show=rollgood2>
            <el-row>
                <el-col :xs="24">
                    <el-row style="margin-top: 5px; top: 0px; padding-top: 10px;">
                        <el-col  class="mc-ui-flex-start" :xs="6" :sm="12" :span="6" :md="4">
                            <el-button class="mc-ui-flex-center" size="medium" type="primary" icon="el-icon-refresh" @click="onSuperAgain2">roll一项额外的优势</el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col style="left: 0px; top: 0px; padding-top: 10px;" :xs="24">
                    <el-table
                            :data="goodlist3"
                            border
                            empty-text="点击按钮roll数据"
                            style="width: 100%">
                        <el-table-column
                                prop="title"
                                label="名称"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="content"
                                label="描述">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <!--隐藏区域 获取额外两项优势-->
        <div v-show=rollgood3>
            <el-row>
                <el-col :xs="24">
                    <el-row style="margin-top: 5px; top: 0px; padding-top: 10px;">
                        <el-col  class="mc-ui-flex-start" :xs="6" :sm="12" :span="6" :md="4">
                            <el-button class="mc-ui-flex-center" size="medium" type="primary" icon="el-icon-refresh" @click="onSuperAgain3">roll两项额外的优势</el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col style="left: 0px; top: 0px; padding-top: 10px;" :xs="24">
                    <el-table
                            :data="goodlist4"
                            border
                            empty-text="点击按钮roll数据"
                            style="width: 100%">
                        <el-table-column
                                prop="title"
                                label="名称"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="content"
                                label="描述">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>

        <el-divider></el-divider>
        <!--点数计数器-->
        <el-input-number v-model="point"  label="拥有的点数"></el-input-number>
        &nbsp;&nbsp;
        <el-button class="mc-ui-flex-start" size="medium" type="primary" icon="el-icon-refresh" @click="onResetPoint">重置点数</el-button>
        <el-divider></el-divider>
        <!--汇总信息-->
        <div>
            <h2>Roguelike信息汇总</h2>
            <el-card class="box-card1">
                <div slot="header" class="clearfix">
                    <span><b>待挑战关卡</b></span>
                </div>
                <div class="text item">
                    <div v-if="checkpoint !=='请点击按钮roll关卡'">{{checkpoint}}</div>
                    <div v-if="checkpointAgain !=='请点击按钮roll关卡' && this.rollbad1 ">{{checkpointAgain}}</div>
                </div>
            </el-card>
            <br/>
            <el-card class="box-card2">
                <div slot="header" class="clearfix">
                    <span><b>优势列表</b></span>
                </div>
                <div v-for="o in superTotal" class="text item">
                    <input type="checkbox"/>&nbsp;&nbsp;{{o.content}}
                </div>
            </el-card>
            <br/>
            <el-card class="box-card3">
                <div slot="header" class="clearfix">
                    <span><b>劣势列表</b></span>
                </div>
                <div v-for="o in disTotal" :key="o.id" class="text item">
                    <input type="checkbox"/>&nbsp;&nbsp;{{o.content}}
                </div>
            </el-card>
        </div>
        <br/>
        <br/>
    </div>

</template>

<script>
    import roll from "./index";

    export default roll;
</script>

<style src="./index.css" lang="css"></style>