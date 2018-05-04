<template>
  <el-container style="height: 100%">
    <!--header-->
    <el-header>
      <div class="header-left-div">
        <div class="header-left-logo-div">
          <img src="../assets/images/cloud.png?1" alt=""/>
        </div>
      </div>
      <div class="header-left-div">
        <div class="header-left-homepage-div">
          <router-link to="/index" style="color:white;">
            <i class="iconfont icon-homepage"></i>
            <span>首页</span>
          </router-link>
        </div>
      </div>
      <div class="header-right-div">
        <div class="avater-div">
          <el-button type="text" @click.native="logout" style="color: #fff;width: 60px;">注销</el-button>
          <!--<el-dropdown>-->
          <!--<span class="el-dropdown-link">-->
          <!--<i class="el-icon-circle-check" style="width: 50px;"></i>-->
          <!--</span>-->
          <!--<el-dropdown-menu slot="dropdown">-->
          <!--&lt;!&ndash;<el-dropdown-item>个人信息</el-dropdown-item>&ndash;&gt;-->
          <!--<el-dropdown-item @click.native="logout">注销</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
        </div>

        <!--<div class="header-right-help-div">-->
        <!--<i class="iconfont icon-feedback" style="font-size: 20px;"></i>-->
        <!--</div>-->
        <!--<div class="header-right-avatar-div">-->
        <!--<div class="avater-div">-->
        <!--<el-dropdown style="width: 100%;height: 100%">-->
        <!--&lt;!&ndash;<img v-lazy="userinfo.avatar" alt=""/>&ndash;&gt;-->
        <!--<el-dropdown-menu slot="dropdown">-->
        <!--<el-dropdown-item @click.native="personCenter">个人信息</el-dropdown-item>-->
        <!--<el-dropdown-item @click.native="logout">注销</el-dropdown-item>-->
        <!--&lt;!&ndash;<el-dropdown-item>删除</el-dropdown-item>&ndash;&gt;-->
        <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->

        <!--</div>-->
        <!--</div>-->
      </div>
    </el-header>


    <!--nav and content-->
    <el-container style="height: 100%">

      <!--收缩时的菜单-->
      <el-aside width="50px" class="left-aside" v-if="isCollapse">
        <i class="iconfont icon-enter"
           v-if="!rightMenuVisible && leftClick"
           @click="changeRightMenuVisible"
           id="icon-left">
        </i>

        <div class="index-left-small-menu">
          <div class="index-logo" @click="collapseMenu">
            <i class="iconfont icon-other" style="font-size:26px;line-height: 30px;"></i>
          </div>
          <div class="menu-item-div">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @select="handleOpen"
              background-color="#333745"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="1" style="padding:0;">
                <i class="iconfont icon-order"></i>
              </el-menu-item>
              <el-menu-item index="2" style="padding:0;">
                <i class="iconfont icon-shangpin"></i>
              </el-menu-item>
              <el-menu-item index="5" style="padding:0;">
                <i class="iconfont icon-addressbook"></i>
                <!--<span slot="title" style="margin-left: 3px;">品牌商管理</span>-->
              </el-menu-item>
              <el-menu-item index="6" style="padding:0;">
                <i class="iconfont icon-group"></i>
                <!--<span slot="title" style="margin-left: 3px;">客户管理</span>-->
              </el-menu-item>
              <el-menu-item index="11" style="padding:0;">
                <i class="iconfont icon-shangpin"></i>
              </el-menu-item>
              <el-menu-item index="4" style="padding:0;">
              <i class="iconfont icon-dynamic" @click="iconClick"></i>
              </el-menu-item>


              <el-menu-item index="12" style="padding:0;">
                <i class="iconfont icon-group" @click="iconClick"></i>
                <!--<span slot="title" style="margin-left: 3px;">客户管理</span>-->
              </el-menu-item>
              <el-menu-item index="7" style="padding:0;">
                <i class="iconfont icon-group"></i>
                <!--<span slot="title" style="margin-left: 3px;">客户管理</span>-->
              </el-menu-item>
              <el-menu-item index="8" style="padding:0;">
                <i class="iconfont icon-group"></i>
                <!--<span slot="title" style="margin-left: 3px;">客户管理</span>-->
              </el-menu-item>
            </el-menu>
            <!--<div v-for="(l,index) in menuList"-->
            <!--@click="clickMenu('leftsmallmenu'+l.permissionId,l.children,l.name)"-->
            <!--:id="'leftsmallmenu'+l.permissionId"-->
            <!--:class="{'left-hover':index===leftHover}"-->
            <!--@mouseenter="mousein(index)"-->
            <!--@mouseleave="mouseout">-->
            <!--<i :class="l.icon" v-if="l.pid == 0"></i>-->
            <!--</div>-->
          </div>
        </div>
      </el-aside>


      <!--展开时的菜单-->
      <el-aside width="160px" class="left-aside" v-if="!isCollapse">
        <i class="iconfont icon-enter"
           v-if="!rightMenuVisible && leftClick"
           @click="changeRightMenuVisible"
           id="icon-left">
        </i>


        <div class="index-left-menu">
          <div class="index-logo" @click="collapseMenu">
            <i class="iconfont icon-other" style="font-size:26px;line-height: 30px;"></i>
          </div>
          <div class="menu-item-div">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @select="handleOpen"
              background-color="#333745"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="2" style="padding:0">
                <i class="iconfont icon-shangpin" style="color: #878d99"></i>
                <span slot="title" style="margin-left: 3px;">商品管理</span>
              </el-menu-item>
              <el-menu-item index="1" style="padding:0;">
                <i class="iconfont icon-order"></i>
                <span slot="title" style="margin-left: 3px;">订单管理</span>
              </el-menu-item>

              <el-menu-item index="5" style="padding:0;">
                <i class="iconfont icon-addressbook"></i>
                <span slot="title" style="margin-left: 3px;">品牌管理</span>
              </el-menu-item>
              <el-menu-item index="6" style="padding:0;">
                <i class="iconfont icon-group"></i>
                <span slot="title" style="margin-left: 3px;">客户管理</span>
              </el-menu-item>
              <el-menu-item index="11" style="padding:0;">
                <i class="iconfont icon-group"></i>
                <span slot="title" style="margin-left: 3px;">售后管理</span>
              </el-menu-item>
              <el-submenu index="4">
                <template slot="title">
                  <i class="iconfont icon-dynamic" style="margin-left:10px;"></i>
                  <span slot="title" style="margin-left: 3px">业务表维护</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1" style="margin:0;padding:0;margin-left: 60px;min-width: 0px">商品分类
                  </el-menu-item>
                  <el-menu-item index="4-2" style="margin:0;padding:0;margin-left: 60px;min-width: 0px">计量单位
                  </el-menu-item>
                  <el-menu-item index="4-3" style="margin:0;padding:0;margin-left: 60px;min-width: 0px">为你推荐
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="12">
                <template slot="title">
                  <i class="iconfont icon-dynamic" style="margin-left:10px;"></i>
                  <span slot="title" style="margin-left: 3px">优惠券管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="12-1" style="margin:0;padding:0;margin-left: 60px;min-width: 0px">优惠券列表
                  </el-menu-item>
                  <el-menu-item index="12-2" style="margin:0;padding:0;margin-left: 60px;min-width: 0px">自动发放
                  </el-menu-item>
                  <!--<el-menu-item index="12-3" style="margin:0;padding:0;margin-left: 60px;min-width: 0px">已发放列表-->
                  <!--</el-menu-item>-->
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="7" style="padding:0;">
                <i class="iconfont icon-group"></i>
                <span slot="title" style="margin-left: 3px;">用户意见反馈</span>
              </el-menu-item>
              <el-menu-item index="8" style="padding:0;">
                <i class="iconfont icon-group"></i>
                <span slot="title" style="margin-left: 3px;">临时商品管理</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-aside>
      <transition name="custom-classes-transition"
                  enter-active-class="animated slideInLeft"
                  leave-active-class="animated slideOutLeft"
      >
        <el-aside width="180px" class="right-aside" v-if="rightMenuVisible" id="right-menu-aside">
          <i class="iconfont icon-return"
             v-if="rightMenuVisible"
             @click="changeRightMenuVisible"
             id="icon-right">
          </i>

          <div class="index-right-menu">
            <div class="right-menu-title">
              {{rightMenuTitle}}
            </div>
            <ul class="right-menu-item-div">
              <li class="items"
                  v-for="(r,index) in rightMenuList"
                  :id="'rightmenu' + r.permissionId"
                  :class="{'right-hover':index===rightHover}"
                  @mouseenter="rightMouseIn(index)"
                  @mouseleave="rightMouseOut">
                <router-link :to="r.url" active-class="router-class">
                  {{r.name}}
                </router-link>
              </li>
            </ul>
          </div>
        </el-aside>
      </transition>
      <el-main>
        <!--<keep-alive>-->
        <!--<router-view></router-view>-->
        <!--</keep-alive>-->

        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    data() {
      return {
        menuList: [],
        itemNumber: '',
        isCollapse: false,
        rightMenuVisible: false,
        rightMenuTitle: '',
        rightMenuList: [],
        leftClick: '',
        rightHover: '',
        leftHover: ''
      }
    },
    computed: {
//      'userinfo'
//        :
//        function () {
//          return JSON.parse(localStorage.getItem('userinfo'));
//        }
    },
    mounted() {
//
//      let self = this;
//      self.getMenu(function (data) {
//        self.menuList = data;
//        localStorage.setItem('menu', JSON.stringify(data));
//        let collapseStatus = localStorage.getItem('collapseStatus');
//        let rightMenuVisible = localStorage.getItem('rightMenuVisible');
//        if (collapseStatus === 'true') {
//          self.isCollapse = true;
//        }
//        for (let i = 0; i < data.length; i++) {
//          for (let j = 0; j < data[i].children.length; j++) {
//            if (data[i].children[j].url === self.$router.currentRoute.path) {
//              let parentId = data[i].permissionId;
//              let selfId = data[i].children[j].permissionId;
//              let leftMenus = document.getElementsByClassName('menu-item-div')[0].childNodes;
//              for (let t = 0; t < leftMenus.length; t++) {
//                leftMenus[t].style.backgroundColor = "#333745";
//              }
//              self.$nextTick(function () {
//                if (document.getElementById('leftbigmenu' + parentId)) {
//                  document.getElementById('leftbigmenu' + parentId).style.backgroundColor = "#00c1e1";
//                } else {
//                  document.getElementById('leftsmallmenu' + parentId).style.backgroundColor = "#00c1e1";
//                }
//              })
//            }
//          }
//        }
//      });
    }
    ,
    components: {
      ElButton,
//      'menu-tree'
//        :
//        require('../components/Menu')
    }
    ,
    methods: {
      iconClick() {
        this.isCollapse = false;
      },
      handleOpen(key, keyPath) {
        switch (key) {
          case '1':
            this.$router.push('/order/saleorder/list');
            break;
          case '2':
            this.$router.push('/goods/goodslist');
            break;
          case '3':
            this.$router.push('/combination/list');
            break;
          case '4-1':
            this.$router.push('/dictionary/dictionaryclassify');
            break;
          case '4-2':
            this.$router.push('/dictionary/measurementunit');
            break;
          case '4-3':
            this.$router.push('/dictionary/recommended');
            break;
          case '5':
            this.$router.push('/brand/list');
            break;
          case '6':
            this.$router.push('/client/clientmanagement');
            break;
          case '7':
            this.$router.push('/feedback/list');
            break;
          case '8':
            this.$router.push('/temporary/list');
            break;
          case '11':
            this.$router.push('/aftersale/list');
            break;
          case '12-1':
            this.$router.push('/coupon/list');
            break;
          case '12-2':
            this.$router.push('/coupon/listout');
            break;
          // case '12-3':
          //   this.$router.push('/coupon/outlist');
          //   break;
        }
      },
      collapseMenu() {
        this.isCollapse = !this.isCollapse;
        localStorage.setItem('collapseStatus', this.isCollapse)
      }
      ,
      getMenu(callback) {//获取菜单
        let self = this;
        let requestData = {};
        self.httpApi.index.menus(requestData, function (data) {
          callback(data.data);
        });
      }
      ,
      changeRightMenuVisible() {
        this.rightMenuVisible = !this.rightMenuVisible;
        localStorage.setItem('rightMenuVisible', this.rightMenuVisible)
      },
//      clickMenu(id, children, name)
//      {//点击菜单
//        if (children) {
//          this.leftClick = id;
//          //localStorage.setItem('leftClick',JSON.stringify({id:id,children:children,name:name}));
//          let leftMenus = document.getElementsByClassName('menu-item-div')[0].childNodes;
//          for (let i = 0; i < leftMenus.length; i++) {
//            leftMenus[i].style.backgroundColor = "#333745";
//          }
//          document.getElementById(id).style.backgroundColor = "#00c1e1";
//          this.rightMenuVisible = true;
//          this.rightMenuTitle = name;
//          this.rightMenuList = children;
//        }
//      }
//      ,
      rightMouseIn(index) {
        this.rightHover = index;
      }
      ,
      rightMouseOut() {
        this.rightHover = '';
      }
      ,
      mousein(index) {
        this.leftHover = index;
      }
      ,
      mouseout() {
        this.leftHover = '';
      }
      ,
      handleIconClick() {//头部搜索

      }
      ,
      personCenter() {//跳转个人中心
        this.$router.push('/personal/user/myinfo');
      }
      ,
      logout() {//注销
        let self = this;
//        let requestData = {};
//        self.httpApi.user.logout(requestData, function (data) {
        localStorage.removeItem('token');
        self.$router.push('/login');
//        });
      }
    }
  }
</script>
<style scoped>
  .el-menu-item-group__title {
    padding: 0px;
  }

  .el-header, .el-footer {
    background-color: #373d41;
    color: white;
    text-align: center;
    line-height: 50px;
    height: 50px !important;
    padding: 0;
    overflow: hidden;
  }

  .el-aside {
    color: white;
    height: 100%;
  }

  #menu-animate {
    /*animate-duration: .1s !important;*/
  }

  .router-class {
    background-color: #606368 !important;
  }

  .left-aside {
    background-color: #333745 !important;
    position: relative;
    height: 100%;
    z-index: 100;
  }

  .right-aside {
    background-color: #4f5257 !important;
    position: relative;
    height: 100%;
    z-index: 50;
  }

  .left-hover {
    /*background-color: #00c1e1 !important;*/
  }

  .right-hover {
    background-color: #606368 !important;
  }

  body > .el-container {
    height: 500px;
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  #icon-left {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0px;
    z-index: 999;
  }

  #icon-right {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 999;
  }
</style>
