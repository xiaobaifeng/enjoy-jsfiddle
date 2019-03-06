<template>
  <div>
    <hot-table ref="recipes" class="recipes" :settings="settings"></hot-table>
    <button class="btn" @click="getCurRecipesData">getData</button>
    <pre class="pre">{{ curRecipesData }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { HotTable } from '@handsontable/vue';
import { helper as htHelper } from 'handsontable';

console.log(htHelper);
const getEffective2dArray = (targetArr: Array<[string]>): Array<[string]> => {
  return targetArr.filter((row: [string]) => row.some((item: string) => Boolean(item)));
};

@Component({
  components: {
    HotTable,
  },
})
export default class Home extends Vue {
  private settings: any = {
    // data: [
    //   ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
    //   ['2016', 10, 11, 12, 13],
    //   ['2017', 20, 11, 14, 13],
    //   ['2018', 30, 15, 12, 13],
    // ],
    data: htHelper.createEmptySpreadsheetData(31, 7),
    // data: htHelper.createSpreadsheetData(31, 7),
    id: 'Recipes',
    colHeaders: ['食谱表', '7:00', '9.30', '12.00', '15.00', '18.00', '21.00'],
    rowHeaders: true,
    colWidths: 100,
    rowHeights: 100,
    manualColumnResize: true,
    manualRowResize: true,
  };
  private recipesDom: any = {};
  private curRecipesData: string[] = [''];
  private getCurRecipesData(): any {
    this.curRecipesData = this.recipesDom.hotInstance && this.recipesDom.hotInstance.getData
      ? getEffective2dArray(this.recipesDom.hotInstance.getData()).map((row) => {
        return row.map((item: string) => item ? item : '-').join();
      }) : ['获取失败'];
  }
  private mounted() {
    this.recipesDom = this.$refs.recipes || {} ;
  }
}
// node_modules/handsontable/dist/handsontable.full.css
</script>
<style scope src="./style/handsontable.full.css"></style>
<style scope lang="scss" type="text/scss">
  .recipes{
    width: 750px;
    height: 300px;
    margin: 1rem auto 1rem;
    overflow: hidden;
  }
  .btn{
    width: 100px;
    height: 40px;
    color: #1f0cec;
  }
  .pre{
    margin-left: 100px;
    text-align: left;
  }
</style>
