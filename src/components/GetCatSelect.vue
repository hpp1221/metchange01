<template>
  <el-cascader
    :options="totalCatList"
    v-if="totalCatList.length > 0"
    v-model="cat"
    @active-item-change="getCatList"
    :show-all-levels="showAllLevels"
    @change="getCat"
    :props="props"
    :disabled="disabled"
    :clearable="clearable"
  >
  </el-cascader>
  <!--@click.native="getCatListClick"-->

</template>
<script>
  export default{
    data(){
      return {
        cat: [],
        totalCatList: [],
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
      }
    },
    created(){
      if (this.outCat) {
        this.totalCatList = [{res: this.outCat, name: this.outCat.name}];
        this.cat = [this.outCat];
      }
      this.getCatList();
    },
    props: {
      showAllLevels: {
        type: Boolean,
        default: false//默认不展开所有层级
      },
      disabled: {
        type: Boolean,
        default: false
      },
      outCat: '',
    },
    methods: {
      fetchData(){
        let self = this;
        self.getCatList(function (data) {
          self.totalCatList = data.list;
        });//获取分类列表
      },
      getCatListClick(){
        this.getCatList();
      },
      getCat(cat){
        let nowCat = cat[cat.length - 1];
        this.$emit('getCatSelect', {cat: [nowCat], catName: nowCat.name, catId: nowCat.id});
      },
      getCatList(val){
        let self = this;
        let requestData;
        if (val === undefined) {
          requestData = {catId:-1};
        } else {
          requestData = {catId: val[val.length - 1].id};
        }

        self.httpApi.goods.catList(requestData, function (data) {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].res = JSON.parse(data.data[i].res);
            if (parseInt(data.data[i].hasChild) > 0) {
              data.data[i].children = [];
            }
          }
          if (val === undefined) {
            self.totalCatList = data.data;
          } else {
            self.insertCat(self.totalCatList, val, data.data, 0);
          }
        });
      },
      insertCat(arr, val, data, level){//val:所有父级的数组,data:当前获取到的数据
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === val[level].id) {
            if (val.length === level + 1) {
              arr[i].children = data;
            } else {
              level++;
              this.insertCat(arr[i].children, val, data, level);
            }
          }
        }
      },
    }
  }
</script>
