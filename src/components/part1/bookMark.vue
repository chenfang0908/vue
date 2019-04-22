<template>
<div class="m-b-20">
        <span>书签：</span>
        <div class="tree-menu">
            <div class="tree-btn" @click="show('show',showTree)">
                书签
                <span v-if="checkLength">({{checkLength}})</span>
                <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="tree" ref="box" v-show="showTree">
                <el-scrollbar style="height:100%">
                    <el-tree
                        :data="tree"
                        :props="defaultProps"
                        node-key="id"
                        accordion
                        :default-checked-keys="defaultCheckedkeys"
                        show-checkbox
                        ref="tree"
                        :check-strictly="true"
                        @check="handleNodeClick"
                    ></el-tree>
                </el-scrollbar>
            </div>
        </div>
</div>
    
</template>
<script>
export default {
    name: "bookMark",
    props: {
        callback: {
            type:Function,
            default: function(){}
        },
        otherData: {
            type : Array,
            default: []
        },
    },
    data() {
        return {
            tree: [],
            checkLength: 0,
            defaultCheckedkeys: [],
            allBookmarkId: [],
            currentAllChildId: [],
            lastAllId: [], //用来判断是否是第一次加载， 以及是否有新增加的bookmark  其他地方可以增加和删除所以每次点击显示的时候需要同步
            allCheckId: [],
            showTree: false,
            cancelIdAll: false,
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    created() {
        this.close();
    },
    mounted() {
        this.show();   //目的用来显示数量
    },
    methods: {
        show(text,btn) {
            if(text && btn) {
                this.showTree = !this.showTree;
                return;
            }

            this.$http.get("/ccp/tvucc-user/bookmark/getAllChildBookmarkTree")
                .then(res => {
                    if (res.data.errorCode == "0x0") {
                        let result = [];
                        result = res.data.result;

                        result.unshift({
                            bookmarkName: "All",
                            id: "all",
                            children: []
                        });
                        result = result.concat(this.otherData);
                        this.tree = result;
                        // 获取所有的id
                        this.allBookmarkId = [];
                        this.formatAllBookmarkId(this.tree);

                        // 用来判断是否是第一次加载
                        let addId = [];
                        let deleteId = [];
                        let commonId = [];
                        if (this.lastAllId.length) {
                            // 判断是否有增加和删除的bookmark
                            this.allBookmarkId.map(v => {
                                this.lastAllId.map(val => {
                                    if (v == val) {
                                        commonId.push(v);
                                    }
                                });
                            });
                            addId = this.allBookmarkId.filter(v => {
                                return commonId.indexOf(v) < 0;
                            });
                            deleteId = this.lastAllId.filter(v => {
                                return commonId.indexOf(v) < 0;
                            });
                        }
                        this.lastAllId = this.allBookmarkId;

                        // 先去除删除的id 在合并新增的id
                        this.allCheckId = this.allCheckId.filter(v => {
                            return deleteId.indexOf(v) < 0;
                        });
                        this.allCheckId = this.allCheckId.concat(addId);

                        if (deleteId.length) {
                            // 若除了删除之外的 其他的全部勾选 则删除后勾选all
                            if (
                                this.allCheckId.length ==
                                this.allBookmarkId.length - 1
                            ) {
                                let deleteAndUncheck = deleteId.filter(v => {
                                    return this.allCheckId.indexOf(v) < 0;
                                });
                                if (deleteAndUncheck.length) {
                                    this.allCheckId.push("all");
                                }
                            }
                        }

                        this.showTree = text ? !this.showTree : false;
                        // 默认勾选项
                        this.defaultCheckedkeys = [];
                        this.formatData(this.tree);
                        this.allCheckId = this.defaultCheckedkeys;
                        // 统计数量
                        this.checkLength =
                            this.allCheckId.length == this.allBookmarkId.length
                                ? this.allCheckId.length - 1
                                : this.allCheckId.length;

                        // 每次点击都要发送请求 避免新增的id和删除的id
                        // 发送请求 筛选设备
                        if(text && (deleteId.length || addId.length))  this.sendFilterInfo(this.allCheckId);
                    }
                });
        },
        close() {
            document.addEventListener('click',(e)=>{
        　　　　if(!this.$refs.box.contains(e.target)){
        　　　　　　this.showTree = false;
        　　　　}
        　　})
            
        },
        handleNodeClick(data) {
            //点击复选框
            let currentId = data.id;
            // 获取当前所有子级的id
            this.currentAllChildId = [];
            data.children && this.formatDataId(data.children);
            // 选中所有的id
            let checkIdAll = this.$refs.tree.getCheckedKeys();

            let newIdArray = [];
            if (currentId == "all") {
                if (!checkIdAll.includes(currentId)) {
                    // 取消all 取消全部
                    newIdArray = [];
                    this.cancelIdAll = true;
                } else {
                    // 选中all 则全部选中
                    newIdArray = this.allBookmarkId;
                }
            } else {
                if (!checkIdAll.includes(currentId)) {
                    // 当取消当前选中时，取消选中所有下级
                    newIdArray = checkIdAll.filter(
                        v => !this.currentAllChildId.includes(v)
                    );
                    // 取消 all
                    newIdArray = newIdArray.filter(v => v != "all");
                } else {
                    // 当选中当前时，选中所有下级
                    newIdArray = checkIdAll.concat(this.currentAllChildId);
                    if (
                        !checkIdAll.includes("all") &&
                        newIdArray.length == this.allBookmarkId.length - 1
                    ) {
                        newIdArray.push("all");
                    }
                }
            }

            this.$refs.tree.setCheckedKeys(newIdArray);
            this.allCheckId = newIdArray;

            // 统计数量
            this.checkLength =
                this.allCheckId.length == this.allBookmarkId.length
                    ? this.allCheckId.length - 1
                    : this.allCheckId.length;

            // 发送请求 筛选设备
            this.sendFilterInfo(newIdArray);
        },
        sendFilterInfo(newIdArray) {
            // 数据处理
            let allIds = this.allCheckId.length == this.allBookmarkId.length ? ["all"] : newIdArray;
            let bookmark = {
                bookmardIds: "",
                Unclassified: false,
                Token: false
            };

            if (allIds.includes("Unclassified") || allIds.includes("all")) {
                bookmark.Unclassified = true;
                allIds = allIds.filter(v => v != "Unclassified");
            }
            if (allIds.includes("Token") || allIds.includes("all")) {
                bookmark.Token = true;
                allIds = allIds.filter(v => v != "Token");
            }
            bookmark.bookmardIds = allIds.join(",");
            // 发送请求 筛选设备
            console.info(232,bookmark);
            this.callback(bookmark);
        },
        formatAllBookmarkId(data) {
            // 获取所有的bookmarkId
            data.map((val, key) => {
                this.allBookmarkId.push(val.id);
                //如果有子组就递归调用
                val.children && this.formatAllBookmarkId(val.children);
            });
        },
        formatData(data) {
            // 格式化初始数据  获取defaultCheckedkeys
            data.map((val, key) => {
                val.label = val.bookmarkName;
                if (this.allCheckId.length) {
                    this.allCheckId.map(v => {
                        if (v == val.id) {
                            this.defaultCheckedkeys.push(val.id);
                        }
                    });
                } else {
                    if (this.cancelIdAll) {
                        this.defaultCheckedkeys = [];
                    } else {
                        this.defaultCheckedkeys.push(val.id);
                    }
                }
                // val.children = val.bookmarkList;

                //如果有子组就递归调用
                val.children && this.formatData(val.children);
            });
        },
        formatDataId(data) {
            // 筛选出当前的所有子级id
            data.map((val, key) => {
                this.currentAllChildId.push(val.id);
                //如果有子组就递归调用
                val.children && this.formatDataId(val.children);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.m-b-20{
    margin-bottom: 20px;
    text-align: left;
    >span{
        display: inline-block;
        width: 100px;
        text-align: right;
    }
    .tree-menu {
        display: inline-block;
        width: 110px;
    }
}
.tree-menu {
    position: relative;
    font-size: 14px;
    text-align: center;
}
.tree-btn {
    background: #444;
    border: none;
    border-radius: 5px;
    color: #fff;
    padding: 3px 5px;
    cursor: pointer;
}
.tree {
    position: absolute;
    top: 29px;
    left: 0px;
    z-index: 2;
    height: 300px;
    min-width: 100%;
    /deep/ .el-scrollbar__wrap {
        overflow: inherit;
        overflow-y: auto;
    }
    /deep/ .el-tree {
        background: #444;
        padding: 5px 5px 5px 5px;
        border-radius: 5px;
        min-width: 125px;
        color: #fff;
        .el-checkbox .el-checkbox__inner {
            height: 15px;
            width: 15px;
            background: #fff;
            border-color: #fff;
            margin-top: 3px;
        }
        .el-tree-node{
            &:focus > .el-tree-node__content{
                background: none;
            }
        }
    }
    /deep/ .el-tree-node__content {
        padding-right: 10px;
        &:hover{
            background-color:rgba(57,170,80,.25);
        }
    }
    /deep/ .el-scrollbar__view {
        border-radius: 5px;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.56);
    }
}
/deep/ .el-checkbox .el-checkbox__inner::after {
    border-right: 1px solid #33ab4f;
    border-bottom: 1px solid #33ab4f;
}
</style>
