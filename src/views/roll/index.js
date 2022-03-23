import {findCheckPoint, findSuperiority, findDisadvantaged,findSuperiorityAgain,findDisadvantagedAgain,findSuperiorityAgain2} from "@/api/roll";//引入axios的请求
let roll = {
    //给个名字
    name: "index",
    //定义各种变量、对象、数组
    data() {
        return {
            //关卡
            checkpoint: '请点击按钮roll关卡',
            //优势列表1
            goodlist1: [],
            goodlist1select:[],
            //劣势列表1
            badlist1: [],
            badlist1select:[],

            //优势列表2 roll到额外两项优势时记录获取的优势
            goodlist2:[],
            rollgood1:false,

            //优势列表3 购买优势骰 额外一项优势
            goodlist3:[],
            rollgood2:false,

            //优势列表4 如果在优势骰获得的一项优势是“roll到额外两项优势” 就再来一个区域
            goodlist4:[],
            rollgood3:false,

            //劣势列表1 二次roll关卡
            checkpointAgain:'请点击按钮roll关卡',
            rollbad1:false,

            //劣势列表2 获取额外两项劣势
            badlist2:[],
            rollbad2:false,

            //记录招募需求的两个复选框勾选情况 false为不勾选 当用户点击复选框后 这里的值会动态改变
            select:{
                dis:false,
                super:false
            },
            //编队的计数器
            point:20,

            //汇总 选中的列表
            superTotal:[],
            disTotal:[],
        }
    },
    //钩子函数 在每一步操作后更新统计结果 但是并不会实时改变 必须在页面数据发生变化才行 单纯勾选复选框不能触发
    beforeUpdate() {
        // 统计所有优势项目
        this.superTotal=this.goodlist1select;
        if (this.rollgood1===true){
            this.superTotal=this.superTotal.concat(this.goodlist2)
        };
        if (this.rollgood2===true){
            this.superTotal=this.superTotal.concat(this.goodlist3)
        };
        if (this.rollgood3===true){
            this.superTotal=this.superTotal.concat(this.goodlist4)
        };
        // 统计所有劣势项目
        this.disTotal=this.badlist1select;
        if (this.rollbad2===true){
            this.disTotal=this.disTotal.concat(this.badlist2)
        };
    },
    //定义各种方法，包括对导入的方法的调用
    methods: {
        //三个基础功能
        async onCheckPoint() {
            let data = await findCheckPoint();
            this.checkpoint = data.title
        },
        async onSuper(){
            let data = await  findSuperiority();
            this.goodlist1 = data.superiorityList;
            //每次roll关卡时 要清空goodlist2 避免上一次roll关卡时选择了相关优势项 令这个数组保存了一些关卡 影响后面的操作
            //从理论上说 用户可以在单次roll中随时切换优势项 所以选择了在用户点击按钮彻底重roll优势项时才执行这个清空操作
            this.goodlist2 =[];
        },
        async onDis(){
            let data = await  findDisadvantaged();
            this.badlist1 = data.disadvantagedList;
            //理由同上
            this.badlist2 = [];
        },

        //优势列表 记录用户选中的优势项
        selectRowInSuper(){
            //将勾选的数据存入数组
            this.goodlist1select=this.$refs.multiple.selection;
            //如果用户勾选了优势项目
            if (this.goodlist1select) {
                //假定没有id==20的数据（“额外获得2项优势”），把按钮隐藏
                this.rollgood1=false;
                this.goodlist1select.forEach(row =>{
                        if (row.number == 20){
                            //显示隐藏区域
                            this.rollgood1=true;
                        }
                    }
                )
            }
        },
        //roll额外两项优势
        async onSuperAgain(){
            let data = await  findSuperiorityAgain(this.goodlist1.concat(this.goodlist3).concat(this.goodlist4));
            this.goodlist2 = data.superiorityList;
        },

        //劣势列表 记录用户选中的劣势项
        selectRowInDis(){
            this.badlist1select=this.$refs.multipleTable.selection;
            if (this.badlist1select) {
                //假定没有id==19和id==20的数据，把按钮隐藏
                this.rollbad1=false;
                this.rollbad2=false;
                this.badlist1select.forEach(row =>{
                        if (row.number == 19){
                            this.rollbad1=true;
                        }
                        if (row.number==20) {
                            this.rollbad2=true;
                            //由于存在用户手滑点掉之前选定的id=20的劣势条目的可能，在之前用户就选定这个条目并roll到“再打一次其他关卡”，所以要判断，如果真的存在就显示回来
                            this.badlist2.forEach(d =>{
                                if (d.number ==19){
                                    this.rollbad1=true;
                                }
                            })
                        }
                    }
                )
            }
        },
        //roll第二个关卡
        async onCheckPointAgain() {
            let data = await findCheckPoint();
            //判重 递归直到拿到的不是相同的关卡 然后输出
            if (data.title==this.checkpoint) {
                this.onCheckPointAgain();
            }else{
                this.checkpointAgain = data.title
            }
        },
        //roll额外两项劣势
        async onDisAgain(){
            let data = await  findDisadvantagedAgain(this.badlist1);
            this.badlist2 = data.disadvantagedList;
            //需要判断badlist1是否存在id==19（额外关卡）的数据 如果有的话 就不能改变rollbad1的值
            let aid = false;
            this.badlist1.forEach(i =>{
                if (i.number ==19) {
                    aid=true
                }
            });
            //badlist1没有id==19做如下操作，如果有id==19，就不用管badlist2里有什么了，这里的目的就是确保badlist2里有id==19时，能显示出该显示的区域
            if (aid === false) {
                //假定badlist2中没有id==19的数据，把按钮隐藏
                this.rollbad1=false;
                this.badlist2.forEach(d =>{
                    if (d.number ==19){
                        this.rollbad1=true;
                    }
                })
            }
        },

        //招募需求 点数重置
        async onResetPoint(){
            this.point=20;
        },
        //去除一项劣势效果
        oncheck1(){
            if (this.select.dis===false){
                //启用这个选项
                this.point=this.point-6;
            }
            if (this.select.dis===true){
                //不启用这个选项
                this.point=this.point+6;
            }
        },
        //购买一枚优势骰 用户点击招募需求的复选框时会触发这个函数
        oncheck2(){
            if (this.select.super===false){
                //启用这个选项
                this.point=this.point-8;
                //显示隐藏区域
                this.rollgood2=true;
            }
            if (this.select.super===true){
                //不启用这个选项
                this.point=this.point+8;
                //隐藏区域
                this.rollgood2=false;
                //为了避免对后面再次开启优势骰的影响 既然点掉了 就把goodlist3清空 同时连带着把goodlist4清空 同时将可能显示的rollgood3隐藏
                this.goodlist3=[];
                this.rollgood3=false;
            }
        },
        //使用优势骰 获得额外一项优势
        async onSuperAgain2(){
            //将前面roll到的 优势列表1+优势列表2 传给后端 后端回传的结果要排除这些优势项
            let data = await findSuperiorityAgain2(this.goodlist1.concat(this.goodlist2));
            this.goodlist3 = data.superiorityList;
            //当用户触发onSuperAgain2函数时说明点击了按钮 执行重roll 那么必须清空goodlist4 避免之前的roll影响
            this.goodlist4=[];
            //默认没有拿到“额外获取两项优势” 所以要隐藏区域
            this.rollgood3=false;
            //如果roll到“额外获取两项优势” 就在下面显示隐藏区域3 显示roll的区域
            if (this.goodlist3[0].id==20){
                this.rollgood3=true;
            }
        },
        //如果额外优势是“额外获得2项优势” 则执行下面的操作
        async onSuperAgain3(){
            //将前面roll到的 优势列表1+优势列表2+优势列表3 传给后端 后端回传的结果要排除这些优势项
            let data = await findSuperiorityAgain(this.goodlist1.concat(this.goodlist2).concat(this.goodlist3));
            this.goodlist4 = data.superiorityList;
        },
    }
};
//千万记得最后要导出js对象 因为index.vue那边要导入这个js对象
export default roll;