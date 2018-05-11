<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">正向订单</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item label="状态">
          <el-select placeholder="全部状态" v-model="easyForm.orderStatus">
            <el-option :label="t.name" :key="t.id" :value="t.id" v-for="t in totalOrderStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="easyForm.orderNumber" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="easyForm.memberName" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="getAdvanceSearch">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-button @click="select">导入</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button @click="addOrder">新增</el-button>-->
        <!--</el-form-item>-->
      </el-form>

      <el-table
        :data="tableData"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        :row-key="getRowKeys">
        <el-table-column
          type="selection"
          width="55"
          :reserve-selection="true"
          prop="orderId">
        </el-table-column>
        <el-table-column prop="orderNumber" label="订单号">

        </el-table-column>
        <el-table-column prop="memberName" label="客户名称">

        </el-table-column>
        <el-table-column prop="paymentPrice" label="订单金额">

        </el-table-column>
        <el-table-column label="下单时间" sortable>
          <template slot-scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="createUserName" label="状态">
          <template slot-scope="scope">
            <span v-for="t in totalOrderStatus" v-if="scope.row.orderStatus == t.id">{{t.name}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="createUserName" label="付款状态">-->

        <!--</el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more cursorpoint"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeDetail(scope.row.orderId)">订单详情</el-dropdown-item>
                <!--<el-dropdown-item @click.native="verify(scope.row.orderId)">审核</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right"></pagination>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form" inline>
          <el-form-item label="订单状态">
            <el-select placeholder="全部状态" v-model="form.orderStatus">
              <el-option :label="t.name" :key="t.id" :value="t.id" v-for="t in totalOrderStatus"></el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="订单号">
            <el-input placeholder="请输入订单号 " v-model="form.orderNumber" class="long-input">

            </el-input>
          </el-form-item>

          <el-form-item label="客户名称">
            <el-input placeholder="输入客户名称" v-model="form.memberName" class="form-input">

            </el-input>
          </el-form-item>
          <el-form-item label="商品信息">
            <el-input placeholder="输入商品名称/编码/条形码/关键字" v-model="form.goodsQueryInfo" class="form-input"
                      style="width: 320px;">

            </el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <!--<el-form-item label="订单状态">-->
          <!--<getcheckbox-->
          <!--@getCheckList="getCheckList"-->
          <!--:dataList="totalOrderStatus">-->
          <!--</getcheckbox>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="付款状态">-->
          <!--<el-checkbox-group v-model="form.payType">-->
          <!--<el-checkbox v-for="t in totalPaymentStatus" :key="t.name" :label="t.name"></el-checkbox>-->
          <!--</el-checkbox-group>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="订单标签">-->
          <!--<el-checkbox-group v-model="form.storeStatus">-->
          <!--<el-checkbox v-for="t in totalOrderTags" :key="t.name" :label="t.name"></el-checkbox>-->
          <!--</el-checkbox-group>-->
          <!--</el-form-item>-->
        </el-form>
        <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
        <el-button @click="advanceSearch = false">取消</el-button>
        <el-button @click="clearOrder">清空</el-button>
        <el-button @click="outputFile">导出</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        form: {
          orderNumber: '',//订单编号
          orderStatus: '',//订单状态
          dateRange: null,
          memberName: '',//客户名称
          goodsQueryInfo: '',//商品信息
          beginDate: '',//开始日期
          endDate: '',//结束日期
        },
        easyForm: {//简单查询
          orderStatus: '',
          orderNumber: '',
          memberName: ''
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        totalStores: [],
        totalOrderStatus: [
          {
            name: '全部状态',
//            id:1
          },
          {
            name: '待付款订单',
            id: 1
          },
          {
            name: '待确认收货订单',
            id: 2
          },
          {
            name: '待发货订单',
            id: 3
          },
          {
            name: '待评价订单',
            id: 4
          },
          {
            name: '订单已完成',
            id: 5
          },
          {
            name: '取消订单',
            id: 6
          },
          {
            name: '退款和退货订单',
            id: 7
          },
          {
            name: '已关闭',
            id: 8
          },
          {
            name: '已完成 ',
            id: 98
          },
        ],//订单状态
        advanceSearch: false,
        searchType: 1,//1是简单搜索，2是高级搜索
        selectedData: [],
        loading: false,
        getRowKeys(row) {
          return row.orderId;
        },
      }
    },
    components: {
      'pagination': require('../../../components/pagination'),
      'getcheckbox': require('../../../components/getcheckbox'),
    },
    activated() {
      this.searchType === 1 ? this.select(localStorage.getItem('pageSizeList'), localStorage.getItem('pageNumList')) : this.advanceSelect(localStorage.getItem('pageSizeList'), localStorage.getItem('pageNumList'));
    },
    methods: {
      getAdvanceSearch() {
        this.advanceSearch = true;
        this.form = {
          orderNumber: '',//订单编号
          orderStatus: '',//订单状态
          dateRange: null,
          memberName: '',//客户名称
          goodsQueryInfo: '',//商品信息
          beginDate: '',//开始日期
          endDate: '',//结束日期
        };
      },
      handleSelectionChange(rows) {
        this.selectedData = [];
        if (rows) {
          rows.forEach(row => {
            if (row) {
              this.selectedData.push(row.orderId);
            }
          })
        }
      },
      outputFile() {//导出
        let url = 'admin/order/exportOrder?token=' + localStorage.getItem('token');
        let str = '';
        if (this.form.dateRange === null) {
          this.$confirm('此操作将导出全部数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.advanceSearch = false;
            location.href = url;
            this.$message({
              type: 'success',
              message: '导出成功!'
            });
          }).catch(() => {
            this.advanceSearch = false;
            this.$message({
              type: 'info',
              message: '已取消导出'
            });
          });
        } else {

          let beginDate = this.form.dateRange === null ? '' : this.form.dateRange[0];
          beginDate = '"'+beginDate+'"';
          beginDate =beginDate.split('+')[0]+'"';
          let reg1 = /^[\'\"]+|[\'\"]+$/g;
          this.form.beginDate = beginDate.replace(reg1,"");
          let endDate = this.form.dateRange === null ? '' : this.form.dateRange[1];
          endDate = '"'+endDate+'"';
          endDate =endDate.split('+')[0]+'"';
          let reg2 = /^[\'\"]+|[\'\"]+$/g;
          this.form.endDate = endDate.replace(reg2,"");
          str =
            '&beginDate=' + this.form.beginDate +
            '&endDate=' + this.form.endDate +
            '&orderStatus=' + this.form.orderStatus;
          this.$confirm('此操作将导出已选数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            location.href = url + str;
            console.log('str', url + str);
            this.advanceSearch = false;
            this.$message({
              type: 'success',
              message: '导出成功!'
            });
          }).catch(() => {
            this.advanceSearch = false;
            this.$message({
              type: 'info',
              message: '已取消导出'
            });
          });
        }
      },
      clearOrder() {
        let self = this
        self.form.orderNumber = '',//订单编号
          self.form.orderStatus = '',//订单状态
          self.form.dateRange = null,
          self.form.memberName = '',//客户名称
          self.form.goodsQueryInfo = '',//商品信息
          self.form.beginDate = '',//开始日期
          self.form.endDate = ''
      },
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.searchType === 1 ? this.select(page.size, page.num) : this.advanceSelect(page.size, page.num);
        localStorage.setItem('pageSizeList', page.size);
        localStorage.setItem('pageNumList', page.num);
      },
      getCheckList(e) {
        this.form.orderStatus = e;
      },
      // verify(id){//审核
      //   let url = '/order/saleorder/verify/' + id;
      //   this.$router.push(url);
      // },
      select(size, num) {//查询
        let self = this;
        let requestData = {
          pageSize: size,
          pageNum: num,
          orderType: 2,
          orderNumber: self.easyForm.orderNumber,
          orderStatus: self.easyForm.orderStatus,
          memberName: self.easyForm.memberName
        };
        self.httpApi.order.viewOrderListByQuery(requestData, function (data) {
          self.searchType = 1;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      advanceSelect(size, num) {
        let self = this;
        self.form.beginDate = self.form.dateRange === null ? '' : self.form.dateRange[0];
        self.form.endDate = self.form.dateRange === null ? '' : self.form.dateRange[1];
        let requestData = {
          pageSize: size,
          pageNum: num,
          orderType: 2,
//          orderNumber: self.form.orderNumber,//订单编号
//          orderStatus: self.form.orderStatus,//订单状态
//          dateRange: self.form.dateRange,
//          memberName: self.form.memberName,//客户名称
//          goodsQueryInfo: self.form.goodsQueryInfo,//商品信息
//          beginDate: self.form.beginDate,//开始日期
//          endDate: self.form.endDate
        };

        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.order.viewOrderListByQuery(requestData, function (data) {
          self.advanceSearch = false;
          self.searchType = 2;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },

      seeDetail(id) {
        let url = '/order/saleorder/detail/' + id;
        this.$router.push(url);
      },
    }
  }
</script>
<style>
  .cursorpoint {
    cursor: pointer;
  }
</style>
