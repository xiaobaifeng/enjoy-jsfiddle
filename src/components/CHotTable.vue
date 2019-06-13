<template>
  <hot-table
    ref='cHotTable'
    id='cHotTable'
    class='c-hot-table'
    width='100%'
    :height='height'
    :data='newInitHtData'
    :minRows='minRows'
    :minCols='minCols'
    :maxRows='maxRows'
    :maxCols='maxCols'
    :rowHeaders='true'
    :colHeaders='true'
    stretchH='last'
    :fixedRowsTop='1'
    :manualColumnResize='true'
    :manualRowResize='true'
    :contextMenu='contextMenu'
    :settings='settings'
  ></hot-table>
</template>

<script>
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable';
import {
  deepCope,
  arrayAssign2d,
  is2dArray,
  isEqual2dArray,
} from '@/utils/arrayUtils';

export default {
  name: 'c-hot-table',
  model: {
    prop: 'hotTableData',
    event: 'change',
  },
  props: {
    hotTableData: {
      type: Array,
      default: () => [[]],
      validator(value) {
        return is2dArray(value);
      },
    },
    maxRows: {
      type: Number,
      default: 100,
    },
    maxCols: {
      type: Number,
      default: 10,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    htId: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  data() {
    const $this = this;
    return {
      contextMenu: {
        items: {
          row_above: {
            name: '上方插入一行',
          },
          row_below: {
            name: '下方插入一行',
          },
          // col_left: {
          //   name: '左方插入列',
          // },
          // col_right: {
          //   name: '右方插入列',
          // },
          // 提供分隔线
          hsep1: '---------',
          remove_row: {
            name: '删除行',
          },
          // ,
          // remove_col: {
          //   name: '删除列',
          // }
        },
      },
      curHtData: null,
      newInitHtData: null,
      settings: {
        afterChange() {
          $this.hotTableDataChange(this.getData());
        },
        afterRemoveCol() {
          $this.hotTableDataChange(this.getData());
        },
        afterRemoveRow() {
          $this.hotTableDataChange(this.getData());
        },
      },
      hotInstance: null,
      minRows: 32,
      minCols: 7,
    };
  },
  computed: {
    baseSpreadsheetData() {
      return Handsontable.helper.createEmptySpreadsheetData(
        this.minRows,
        this.minCols,
      );
    },
    readOnlyColumns() {
      return Array.apply(null, { length: this.maxCols }).reduce(
        (acc, item, index) =>
          acc.concat({
            data: index,
            readOnly: this.readonly,
          }),
        [],
      );
    },
  },
  methods: {
    update(settings) {
      if (!this.hotInstance) {
        return;
      }
      this.hotInstance.updateSettings(settings);
    },
    updateColumns() {
      setTimeout(() => {
        if (this.hotInstance) {
          this.hotInstance.updateSettings({
            columns: this.readOnlyColumns,
          });
        }
      });
    },
    hotTableDataChange(htData) {
      this.curHtData = deepCope(htData);
      this.$emit('change', deepCope(htData));
    },
  },
  watch: {
    hotTableData(val) {
      if (!isEqual2dArray(val, this.curHtData) && this.hotInstance) {
        this.hotInstance.loadData(arrayAssign2d(this.baseSpreadsheetData, val));
      }
    },
    htId() {
      this.updateColumns();
    },
    readonly() {
      this.updateColumns();
    },
  },
  created() {
    this.newInitHtData = arrayAssign2d(
      this.baseSpreadsheetData,
      this.hotTableData,
    );
  },
  mounted() {
    this.$nextTick(() => {
      this.hotInstance = this.$refs.cHotTable.hotInstance;
      this.updateColumns();
    });
  },
  destroyed() {
    this.hotInstance = null;
    this.newInitHtData = null;
    this.curHtData = null;
  },
  components: { HotTable },
};
</script>
<style src='@/../node_modules/handsontable/dist/handsontable.full.css'></style>
<style lang='less' scoped type='text/less'>
.c-hot-table-wrapper {
  height: 100%;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>
