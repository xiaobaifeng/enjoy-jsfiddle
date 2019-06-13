<template>
  <div>
    <hot-table ref='recipes' class='recipes' :settings='settings'></hot-table>
    <pre class='pre'>{{ curRecipesData }}</pre>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable';

console.log(Handsontable.helper);
const getEffective2dArray = (targetArr: Array<[string]>): Array<[string]> => {
  return targetArr.filter((row: [string]) => row.some((item: string) => Boolean(item)));
};

@Component({
  components: {
    HotTable,
  },
})
export default class Home extends Vue {
  private initSpreadsheetData: string[][] = [
    ['周', '7:00', '9.30', '12.00', '15.00', '18.00', '21.00'],
    ['周一', '1', '2', '3', '4', '5', '6'],
  ];
  private get settings(): any {
    const $this = this;
    return {
      // data: [
      //   ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
      //   ['2016', 10, 11, 12, 13],
      //   ['2017', 20, 11, 14, 13, 14],
      //   ['2018', 30, 15, 12, 13, 14, 15],
      // ],
      data: (() => {
        const baseSpreadsheetData = Handsontable.helper.createEmptySpreadsheetData(8, 10);
        return baseSpreadsheetData.map((row: [string], index: number) => {
          return index < this.initSpreadsheetData.length
            ? this.initSpreadsheetData[index].concat(row).slice(0, 10)
            : row;
        });
      })(),
      columns: [
        {
          data: 0,
          title: '食谱表',
        },
        { data: 1, renderer(instance, td, row, col, prop, value, cellProperties) {
            const $arguments: any = arguments;
            Handsontable.renderers.TextRenderer.apply(this, $arguments);
            td.style.backgroundColor = 'yellow';
          },
        },
        {
          data: 2, type: 'date', dateFormat: 'YYYY-MM-DD',
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      cell: [
        {
          row: 0,
          col: 0,
          // renderer(instance, td, row, col, prop, value, cellProperties) {
          //   const escaped = Handsontable.helper.stringify(value);
          //   const div = document.createElement('div');
          //   const options = [{
          //     text: '周',
          //     value: 'week',
          //   }, {
          //     text: '月',
          //     value: 'month',
          //   }];
          //   options.map((item) => {
          //     const input = document.createElement('input');
          //     input.setAttribute('type', 'radio');
          //     input.setAttribute('name', 'type');
          //     input.setAttribute('id', item.value);
          //     div.appendChild(input);
          //     const span = document.createElement('span');
          //     span.innerText = item.text;
          //     div.appendChild(span);
          //     const br = document.createElement('br');
          //     div.appendChild(br);
          //   });
          //   Handsontable.dom.addEvent(div, 'click', function(event) {
          //     alert(1)
          //   });
          //   Handsontable.dom.empty(td);
          //   td.appendChild(div);
          //   return td;
          // },
          // editor: false,
          type: 'dropdown',
          source: ['周', '月'],
        },
      ],
      id: 'Recipes',
      colHeaders: true,
      rowHeaders: true,
      maxCols: 10,
      maxRows: 32,
      width: 300,
      stretchH: 'last',
      fixedRowsTop: 1,
      manualColumnResize: true,
      manualRowResize: true,
      // contextMenu: true,
      // 自定义右键菜单，可汉化，默认布尔值
      contextMenu: {
        items: {
          row_above: {
            name: '上方插入一行',
          },
          row_below: {
            name: '下方插入一行',
          },
          col_left: {
            name: '左方插入列',
          },
          col_right: {
            name: '右方插入列',
          },
          // 提供分隔线
          hsep1: '---------',
          remove_row: {
            name:  '删除行',
          },
          remove_col: {
            name:  '删除列',
          },
        },
      },
      afterModifyTransformEnd() {
        console.log('afterModifyTransformEnd', arguments);
      },
      // 数据改变时触发此方法
      afterChange(changes, source) {
        console.log(this.getData());
        $this.curRecipesData = getEffective2dArray(this.getData()).map((row) => {
          return row.map((item: string) => item ? item : '-').join();
        });
      },
    };
  }
  private recipesDom: any = {};
  private curRecipesData: string[] = [];
}
// node_modules/handsontable/dist/handsontable.full.css
</script>
<style scope src='./style/handsontable.full.css'></style>
<style scope lang='scss' type='text/scss'>
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
