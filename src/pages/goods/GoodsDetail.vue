<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品详情</h3>
      <div class="goods-detail-top">
        <div class="goods-detail-top-left">
          <div class="goods-detail-big-img">
            <img v-if="goodsDetail.skus[0].img == undefined && bigImg == null" src="/static/img/error.dff75d4.jpg">
            <img v-else v-lazy="goodsDetail.skus[0].img">
          </div>
          <div class="goods-detail-small-img">
            <img v-if="bigImg == undefined && bigImg == null" src="/static/img/error.dff75d4.jpg">
            <img v-else v-lazy="g.url" v-for="g in goodsDetail.goodsExtend.imgs">
          </div>
        </div>

        <div class="goods-detail-top-right">
          <p class="goods-detail-p">
            <span>{{goodsDetail.name}}</span>
          </p>
          <p class="goods-detail-p" style="color:#bbb">
            <span>分类:{{goodsDetail.catName}}</span>
            <span>品牌:{{goodsDetail.brandName}}</span>
            <span>编码:{{goodsDetail.skus[0].number}}</span>
            <span>条形码:{{goodsDetail.skus[0].barCode}}</span>
          </p>
          <p class="goods-detail-p">
            <span>市场价:{{goodsDetail.skus[0].marketPrice}}</span>
            <span>成本价:{{goodsDetail.skus[0].price}}</span>
          </p>
          <p class="goods-detail-p">
            <span>计量单位:{{goodsDetail.unit}}</span>
            <span>库存:{{goodsDetail.skus[0].count}}</span>
            <!--<span>预购:{{goodsDetail.skus[0].price}}</span>-->
          </p>
        </div>
      </div>


      <!--<el-tabs v-model="activeName">-->
      <!--<el-tab-pane label="商品介绍" name="first">-->
      <!---->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="商品附件" name="second">-->

      <!--</el-tab-pane>-->
      <!--</el-tabs>-->


    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        bigImg: '',
//        bigImgNull:'/static/img/error.dff75d4.jpg',
        goodsDetail: {
          brandName: '',
          catName: '',
          unit: '',
          skus: [
            {
              barCode: '',
              number: '',
              price: '',
              marketPrice: '',
              count:'',
              img:'',
            }
          ],
          goodsExtend: {
            imgs: [
              {
                url: ''
              }
            ]
          },
        },
        activeName: 'first'
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    methods: {
      select(skuId){
        let self = this;
        let requestData = {skuId: skuId};
        self.httpApi.goods.goodsDetail(requestData, function (data) {
          self.goodsDetail = data.data;

//          self.form = self.formPass(self.form, data.data);
//          self.form.spec = JSON.parse(self.form.spec);
//          self.form.brand = JSON.parse(self.form.brand);
//          let cat = JSON.parse(self.form.cat);
//          cat.res = cat;
//          self.totalCategories = [cat];
//          self.form.cat = [cat];
//          self.form.goodsExtend.annex = JSON.parse(self.form.goodsExtend.annex);
          self.goodsDetail.goodsExtend.imgs = JSON.parse(self.goodsDetail.goodsExtend.imgs);
          self.bigImg = self.goodsDetail.goodsExtend.imgs[0];
          self.goodsDetail.skus = JSON.parse(self.goodsDetail.skus);
          //self.goodsDetail.skus[0].sku = JSON.parse(self.goodsDetail.skus[0].sku);
          console.log('skus',self.goodsDetail.skus[0].img)
          console.log('all',self.goodsDetail)
        });
      },
//      clickSmallImg(img){
//        this.bigImg = img;
//      }
    }
  }
</script>

<style>
  .goods-detail-top {
    overflow: hidden;
    /*width: 1000px;*/
  }

  .goods-detail-top-left {
    float: left;
  }

  .goods-detail-top-right {
    /*float: left;*/
    /*margin: 30px;*/
  }

  .goods-detail-p {
    margin-top: 20px;
  }

  .goods-detail-p span {
    margin-left: 20px;
  }

  .goods-detail-big-img {
    width: 460px;
    margin-bottom: 10px;
  }

  .goods-detail-big-img img {
    width: 460px;
    height: 460px;
  }

  .goods-detail-small-img {
    overflow: hidden;
    width: 460px;
  }

  .goods-detail-small-img img {
    float: left;
    width: 80px;
    height: 80px;
    margin-left: 15px;
    cursor: pointer;
  }

  .goods-detail-small-img img:first-child {
    margin-left: 0px;
  }
</style>
