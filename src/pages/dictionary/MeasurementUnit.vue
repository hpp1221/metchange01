<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">计量单位</h3>
      <el-button @click="createUnit" style="float: right">新增</el-button>
      <!--新增弹框-->
      <el-dialog title="新增计量单位" :visible.sync="dictionaryUnitCreate">
        <el-form :model="form">
          <el-form-item label="单位名称" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createSure">确 定</el-button>
          <el-button @click="dictionaryUnitCreate = false">取 消</el-button>
        </div>
      </el-dialog>
      <div class="dictionaryclassify-main">
        <ul class="dictionarybrand-content">
          <li v-for="item in list" class="iconfont icon-erp-R">{{item.name}}
            <el-button class="el-icon-delete icon-deletechilddependent" v-on:click="deleteUnit(item)">删除
            </el-button>
          </li>
        </ul>
      </div>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="margin-top: 110px;">
      </pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dictionaryUnitCreate: false,//新增
        list: [],
        form: {
          name: ''
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: '',
        formLabelWidth: '80px'
      };
    },
    components: {
      'pagination': require('../../components/pagination')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.getUnitList(page.size, page.num);
      },
      getUnitList(size, num) {//单位列表
        let self = this
        let requestData = {
          pageSize: size,
          pageNo: num
        };
        self.httpApi.goodsCat.unitList(requestData, function (data) {
          self.list = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      createUnit() {//新增单元
        this.dictionaryUnitCreate = true;
        this.form = {name: ''};
      },
      createSure() {//新增确定
        let self = this
        let requestData = {
          goodsUnit:self.form
        };
        self.httpApi.goodsCat.createUnit(requestData, function (data) {
          self.dictionaryUnitCreate = false
          self.$message.success('添加成功')
          self.getUnitList(self.pageSize, self.pageNum)
        });
      },
      deleteUnit(item){//删除
        let self = this;
        let requestData = {unitId: item.id};
        self.$confirm('请确认是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.goodsCat.deleteUnit(requestData, function (data) {
            self.$message.success('删除成功');
            self.getUnitList(self.pageSize, self.pageNum)
          });
        })
      }
    }
  };
</script>
