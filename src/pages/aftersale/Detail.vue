<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">售后订单详情</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="订单号 :">
          {{easyForm.orderNumber}}
        </el-form-item>

        <el-form-item label="下单时间 :">
          {{moment(easyForm.order.createTime).format('YYYY-MM-DD HH:mm:ss')}}
        </el-form-item>
        <el-button style="float: right" @click="returnOrderList">返回</el-button>
        <el-table :data="easyForm.order.orderItemList" border>
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <!--<el-table-column label="主图" width="80" prop="goodsImg">-->
          <!--<template slot-scope="scope">-->
          <!--<img v-lazy="scope.row.goodsImg" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="商品编码" prop="goodsSkuNumber">

          </el-table-column>
          <el-table-column label="商品名称" prop="goodsTitle">

          </el-table-column>
          <el-table-column label="规格" prop="goodsSku">

          </el-table-column>
          <el-table-column label="数量" prop="number">

          </el-table-column>
          <el-table-column label="单位" prop="goodsSkuUnit">

          </el-table-column>
          <el-table-column label="单价" prop="putPrice">

          </el-table-column>
          <el-table-column label="物流运费" prop="transportationFee">

          </el-table-column>
        </el-table>
        <el-form-item>
          <div>
            <p>总金额 : {{easyForm.order.totalPrice}}</p>
          </div>
          <div>
            <p>优惠金额 : {{totalReducePrice}}</p>
          </div>
          <div>
            <p>应付金额 : {{easyForm.order.paymentPrice}}</p>
          </div>
        </el-form-item>
        <br>
        <el-form-item label="退款金额">
          <el-input v-model="easyForm.refundPrice" :disabled="true"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="售后原因">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="多行输入"
            :disabled="true"
            v-model="easyForm.comment"
            style="width:500px;">
          </el-input>
        </el-form-item>
        <br>
        <el-form-item label="售后图片">
          <div v-for="(u,index) in easyForm.orderAftersalesVoucherList" :key="index"
               style="float: left;margin-right: 50px;text-align: center">
            <img :src="u.url" alt="" @click="clickAfterImg(u.url)">
          </div>
        </el-form-item>
        <br>
        <el-form-item label="处理结果">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="多行输入"
            v-model="easyForm.response"
            :disabled="true"
            style="width:650px;">
          </el-input>
        </el-form-item>
      </el-form>
      <el-dialog
        :visible.sync="dialogVisibleAfterImg"
        width="30%"
        :modal=true
        center>
        <img :src="imgUrl" alt="" style="display: flex;justify-content: center;align-content: center">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    data() {
      return {
        totalReducePrice: '',
        easyForm: {
          orderId: '',//订单id
          orderAftersalesVoucherList: [],
          tableData: [],
          comment: '',
          refundPrice: '',//退款金额
          order: {
            memberId: '',
            memberName: '',
            paymentPrice: '',//所有商品加的应付总额
            totalPrice: '',//总金额
            orderNumber: '',
            sellerName: '',
            createTime: '',
            orderDetail: {
              contacts: '',
              address: '',
              mobile: ''
            },
            orderItemList: [{
              itemId: '',//订单项id
              goodsSkuNumber: '',//商品编号
              goodsTitle: '',//商品名
              goodsSku: '',//规格
              goodsSkuUnit: '',
              catName: '',
              catId: '',
              number: '',
              subtotal: '',//小计
              putPrice: '',//价格
              reducePrice: '',//优惠
              combination: '',//编号和名称组合
              goodsSkuId: '',//规格id
            }],
          }
        },
        feedbackStatus: [
          {
            id: 1,
            name: '未关闭售后'
          },
          {
            id: 2,
            name: '已关闭售后'
          }
        ],//状态
        dialogVisibleAfterImg: false,//img放大
        imgUrl: '',
      }
    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    components: {
      ElInput,
      ElButton,
      'uploadoneimg': require('../../components/uploadoneimg'),
    },
    methods: {
      select(id) {//查询
        let self = this;
        let requestData = {
          orderAftersalesId: id,
        };
        self.httpApi.aftersale.selectOrderAftersalesById(requestData, function (data) {
          self.easyForm = data.data;
          self.totalReducePrice = self.easyForm.order.totalPrice - self.easyForm.order.paymentPrice;
          self.totalReducePrice = self.totalReducePrice.toFixed(2);
        });
      },
      clickAfterImg(url) {
        this.dialogVisibleAfterImg = true;
        this.imgUrl = url.replace('/w/100/h/100', '/w/500/h/500');
      },//点击图片放大
      returnOrderList() {
        this.$router.push('/aftersale/list')
      },
    }
  }
</script>
